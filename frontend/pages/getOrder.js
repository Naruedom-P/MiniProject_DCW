import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'

import { useState, useEffect } from 'react'


import useSWR, { mutate } from 'swr';

import withAuth from '../components/withAuth'

import axios from 'axios';
const URL = `http://localhost/api/cars`

const GetOrder = () => {

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
                        <div className={styles.buttonContainer}>
                            <button className={`${styles.button} ${styles.btnGet}`}
                                onClick={() => getCar(item.id)} >
                                Get
                    </button>
                            <button className={`${styles.button} ${styles.btnUpdate}`}
                                onClick={() => updateCar(item.id)} >
                                Update
                    </button>
                            <button className={`${styles.button} ${styles.btnDelete}`}
                                onClick={() => deleteCar(item.id)}>
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
        <div>
           <div><Navbar /></div> 
            <div className={styles.container}>
                <h1 className={styles.title}>Your Car</h1>

            Selected Car: mobel:{car.mobel}, Electric:{car.electric}, Price:{car.price}
                <h2>Add Car</h2>
            mobel:<input type="text" onChange={(e) => setMobel(e.target.value)}></input>
            electric:<input type="text" onChange={(e) => setElectric(e.target.value)}></input>
            price:<input type="number" onChange={(e) => setPrice(e.target.value)}></input>
                <br></br>
                <button onClick={() => addCar(mobel, electric, price)}>Add Car</button>
                <h1>Our Car</h1>
                <ul className={styles.list}>{printCars()}</ul>
            </div>
        </div>

    )


    return (<Layout>
        <Head>
            <title>Order</title>
        </Head>
        <Navbar />
        <div className={styles.container}>
            
            <h2> Get Configuration from ../config/config.js </h2>
            <b>Config: </b> {JSON.stringify(config)}
            <ul>
                <li>npm run dev  (for development mode)</li>
                <li>npm run build; npm run start  (for production mode)</li>
            </ul>
        </div>

    </Layout>)
}

export default GetOrder

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}