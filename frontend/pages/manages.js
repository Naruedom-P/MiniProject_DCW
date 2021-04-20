import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import useSWR, { mutate } from 'swr';
// import styles from '../styles/Student.module.css'
import withAuth from '../components/withAuth'
import config from '../config/config'
import axios from 'axios';
const URL = `http://localhost/api/stocks`
// const fetcher = url => axios.get(url).then(res => res.data);

const admin = ({ token }) => {

    const [stocks, setStocks] = useState({})
    const [stock, setStock] = useState({});
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        getStocks();
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


    const getStocks = async () => {
        let stock = await axios.get(URL)
        setStocks(stock.data)

    }
    const getStock = async (id) => {
        let stock = await axios.get(`${URL}/${id}`);
        setStock(stock.data)
    }
    const addStock = async (name, type, price) => {
        let stock = await axios.post(URL, { name, type, price })
        console.log(stock.data);
        getStocks();

    }
    const updateStock = async (id) => {
        let stock = await axios.put(`${URL}/${id}`, { name, type, price })
        setStocks(stock.data)
        getStocks();
    }

    const deleteStock = async (id) => {
        let stock = await axios.delete(`${URL}/${id}`, { name, type, price })
        getStocks();
    }

    const printStocks = () => {
        if (stocks.list && stocks.list.length) {
            return stocks.list.map((item, index) => {
                return (
                    <div className={styles.listItem} key={index}>
                        {index + 1}
                        <div><b>Name:</b> {item.name}</div><br />
                        <div> <b>Type:</b> {item.type} </div><br />
                        <div><b>Price:</b> {item.price}</div>
                        <div >
                            <button onClick={() => getStock(item.id)} >
                                Get
                    </button>
                            <button onClick={() => updateStock(item.id)} >
                                Update
                    </button>
                            <button onClick={() => deleteStock(item.id)}>
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
            <h1>Your Student</h1>

            Selected Stock: name:{stock.name}, type:{stock.type}, price:{stock.price}
            <h2>Add </h2>
            Name:<input type="text" onChange={(e) => setName(e.target.value)}></input>
            Type:<input type="text" onChange={(e) => setType(e.target.value)}></input>
            Price:<input type="number" onChange={(e) => setPrice(e.target.value)}></input>
            <br></br>
            <button onClick={() => addStock(name, type, price)}>Add Stock</button>
            <h3>Our </h3>
            <ul>{printStocks()}</ul>
        </div>

    )


};


export default withAuth(admin)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


