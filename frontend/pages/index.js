import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr';

const URL  = `http://localhost/api/stocks`;
const fetcher = url => axios.get(url).then(res => res.data);

export default function Home({ token }) {
  
 const {data} = useSWR(URL,fetcher);
 
  const [stocks, setStocks] = useState({ })
  const [stock, setStock] = useState({});
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);

if (!data) {
      console.log(data);
      return <div><h1>Loading...</h1></div>
 }
 const getStock = async(id) =>{
  let stock = await axios.get(`${URL}/${id}`);
  setStock(stock.data)
  mutate(URL);

 }
 const getStocks = async () =>{
  let stock = await axios.get(`${URL}`);
  mutate(URL);

 }
 const printStocks = () => {
  if (data.list && data.list.length) {
    return data.list.map((item, index) => {
      return (
        <div className={styles.listItem} key={index}>
          <div><b>Name:</b> {item.name}</div>
          <div> <b>Type:</b> {item.type} </div>
          <div><b>Price:</b> {item.price}</div>
          
          <div>
          <button onClick={() => getStock(item.id)}>Get</button>
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
        <h1>This is our stocks</h1>
       <h4> Selected stocks: {stock.name}:{stock.type}:{stock.price} </h4>
        <br></br>
      <div className={styles.list}>
        {printStocks()}
      </div>
    </div>
</Layout>
  )
}

// {/* export function getServerSideProps({ req, res }) {
//   // console.log("token from cookie: ",cookie.get("token")) 
//   // console.log('req: ', req.headers)
//   return { props: { token: req.cookies.token || "" } };
// } */}
