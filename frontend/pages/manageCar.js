import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import useSWR, { mutate } from 'swr';

import withAuth from '../components/withAuth'
import config from '../config/config'
import axios from 'axios';
const URL = `http://localhost/api/cars`


const admin = ({ token }) => {


    const [cars, setCars] = useState({})
    const [car, setCar] = useState({});
    const [mobel, setMobel] = useState('');
    const [electric, setElectric] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        getCars();
        profileUser();
    }, []);
    const profileUser = async () => {
        try {

            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(users.data);
        } catch (e) {
            console.log(e);
        }
    };


    const getCars = async () => {
        let car = await axios.get(URL)
        setCars(car.data)

    }
    const getCar = async (id) => {
        let car = await axios.get(`${URL}/${id}`);
        setCar(car.data)
    }
    const addCar = async (mobel, electric, price) => {
        let car = await axios.post(URL, { mobel, electric, price })
        console.log(car.data);
        getCars();

    }
    const updateCar = async (id) => {
        let car = await axios.put(`${URL}/${id}`, { mobel, electric, price })
        setCars(car.data)
        getCars();
    }

    const deleteCar = async (id) => {
        let car = await axios.delete(`${URL}/${id}`, { mobel, electric, price })
        getCars();
    }

    const printCars = () => {
        if (cars.list && cars.list.length) {
            return cars.list.map((item, index) => {
                return (
                    <div className={styles.listItem} key={index}>
                        {index + 1}
                        <b> mobel:</b> {item.mobel} <br />
                        <b>electric:</b> {item.electric} <br />
                        <b>price:</b> {item.price}
                        <div >
                            <button onClick={() => getCar(item.id)} >
                                Get
                    </button>
                            <button onClick={() => updateCar(item.id)} >
                                Update
                    </button>
                            <button onClick={() => deleteCar(item.id)}>
                                Delete
                    </button>
                        </div>
                        <br></br>
                    </div>
                );
            });
        } else {
            return <p>Loading...</p>;
        }
    };


    return (
        <div className={styles.container}>
            <Navbar />
            <h1>Your Car</h1>

            Selected Car: mobel:{car.mobel}, electric:{car.electric}, price:{car.price}
            <h2>Add Car</h2>
            mobel:<input type="text" onChange={(e) => setMobel(e.target.value)}></input>
            electric:<input type="text" onChange={(e) => setElectric(e.target.value)}></input>
            price:<input type="number" onChange={(e) => setPrice(e.target.value)}></input>
            <br></br>
            <button onClick={() => addCar(mobel, electric, price)}>Add Car</button>
            <h3>Our Car</h3>
            <ul>{printCars()}</ul>
        </div>

    )


};


export default withAuth(admin)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


