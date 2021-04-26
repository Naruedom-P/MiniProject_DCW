const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let income = 0
let users = db.users

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            console.log("Body:", req.body);
            if (req.body.remember == true) {
                exp = "7d";
            } else exp = "1d";
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: exp,
            });
            var decoded = jwt.decode(token);
            let time = new Date(decoded.exp * 1000);
            console.log(new Date(decoded.exp * 1000));
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

let cars = {
    list: [
        { id: 1, mobel: "BMW i3", electric: "Full-Electric", price: 3730005 },
        { id: 2, mobel: "BMW i8", electric: "Plug-in Hybrid", price: 12999000 }
    ]

}
router.route('/cars')
    .get((req, res) => {
        res.send(cars);
    })

    .post((req, res) => {
        let id = (cars.list.length) ? cars.list[cars.list.length - 1].id + 1 : 1
        let mobel = req.body.mobel
        let electric = req.body.electric
        let price = req.body.price
        cars.list = [...cars.list, { id, mobel, electric, price }]
        res.json(cars);
    })

router.route('/cars/:cr_id')
    .get((req, res) => {
        let id = cars.list.findIndex((item) => (item.id === +req.params.cr_id))
        res.json(cars.list[id]);
    })

    .put((req, res) => {
        let id = cars.list.findIndex((item) => (item.id === +req.params.cr_id))
        cars.list[id].mobel = req.body.mobel
        cars.list[id].electric = req.body.electric
        cars.list[id].price = req.body.price
        res.json(cars)
    })

    .delete((req, res) => {
        cars.list = cars.list.filter((item) => item.id !== +req.params.cr_id)
        res.json(cars);
    })
router.route('/income')
    .get((req, res) => res.json(income))

router.get('/car',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send('car')
    });


let customer = {
    list: [
        { id: 1, name: "poom i3", email: "poom@gmail.com" },
        { id: 2, name: "dew i8", email: "dew@gmail.com" }
    ]

}
router.route('/customer')
    .get((req, res) => {
        res.send(customer);
    })

    .post((req, res) => {
        let id = (customer.list.length) ? customer.list[customer.list.length - 1].id + 1 : 1
        let name = req.body.name
        let email = req.body.email

        customer.list = [...customer.list, { id, name, email }]
        res.json(customer);
    })

router.route('/customer/:cus_id')
    .get((req, res) => {
        let id = customer.list.findIndex((item) => (item.id === +req.params.cus_id))
        res.json(customer.list[id]);
        income += Number(cars.list[id].id)
    })

    .put((req, res) => {
        let id = customer.list.findIndex((item) => (item.id === +req.params.cus_id))
        customer.list[id].name = req.body.name
        customer.list[id].email = req.body.email
        res.json(customer)
    })

    .delete((req, res) => {
        customer.list = customer.list.filter((item) => item.id !== +req.params.cus_id)
        res.json(customer);
    })


router.get('/customers',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send('customers')
    });



// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

