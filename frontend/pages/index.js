import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr';

const URL = `http://localhost/api/cars`;
const fetcher = url => axios.get(url).then(res => res.data);

export default function Home({ token }) {

  const { data } = useSWR(URL, fetcher);

  const [cars, setCars] = useState({})
  const [car, setCar] = useState({});
  const [mobel, setMobel] = useState('');
  const [electric, setElectric] = useState('');
  const [price, setPrice] = useState(0);

  if (!data) {
    console.log(data);
    return <div><h1>Loading...</h1></div>
  }
  const getCar = async (id) => {
    let car = await axios.get(`${URL}/${id}`);
    setCar(car.data)
    mutate(URL);

  }
  const getCars = async () => {
    let car = await axios.get(`${URL}`);
    mutate(URL);

  }
  
  const printCars = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>mobel:</b> {item.mobel}</div>
            <div> <b>electric:</b> {item.electric} </div>
            <div><b>price:</b> {item.price}</div>

            <div>
              <button onClick={() => getCar(item.id)}>Get</button>
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
    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <br></br>
        <h1>This is our cars</h1>
        <h4> Selected Car: {car.name}:{car.major}:{car.gpa} </h4>
        <br></br>
        <div className={styles.list}>
          {printCars()}
        </div>
      </div>
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
