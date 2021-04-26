const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const PORT = 90;

let cars = {
    list: [
        { id: 1, mobel: "BMW i3", electric: "Full-Electric", price: 3730001 },
        { id: 2, mobel: "BMW i8", electric: "Plug-in Hybrid", price: 12999000 }
    ]

}
app.use(cors());
app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false }), router);


router.route('/cars')
    .get((req, res) => {
        res.json(cars);
    })

    .post((req, res) => {
        let id = (cars.list.length) ? cars.list[cars.list.length - 1].id + 1 : 1
        let mobel = req.body.mobel
        let electric = req.body.electric
        let price = req.body.price
        cars.list = [...cars.list, { id, mobel, electric, price }]
        res.json(cars);
    })


router.route('/cars/:std_id')
    .get((req, res) => {
        let id = cars.list.findIndex((item) => (item.id === +req.params.std_id))
        res.json(cars.list[id]);

    })

    .put((req, res) => {
        let id = cars.list.findIndex((item) => (item.id === +req.params.std_id))
        cars.list[id].mobel = req.body.mobel
        cars.list[id].electric = req.body.electric
        cars.list[id].price = req.body.price
        res.json(cars)
    })

    .delete((req, res) => {
        cars.list = cars.list.filter((item) => item.id !== +req.params.std_id)
        res.json(cars);
    })


app.listen(PORT, () => console.log('Server running on  ', PORT))