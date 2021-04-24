import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Homepage.module.css'
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
      <Navbar />
      <Head>
        <title>BMW Service Center</title>
        <link rel="shortcut icon" href="/bmw-logo.png" />
      </Head>

      <div className={styles.container}>
        <div className={styles.hrader}>
          <h1>BMW Service Center</h1>
          <div className={styles.card}>
            <h1>THE iX</h1>
            <h3>THE FIRST ALL ELECTRIC iX.</h3>
            <div className={styles.fakeimg} > <img src="cix.jpg" alt="ciX" width="100%" height="auto"></img>
            <button className={styles.ordercar} >Order a car</button>
            
            </div>
            <h4> Selected Car: {car.name}:{car.major}:{car.gpa} </h4>
            <p>THE FIRST BMW iX: PIONEER OF A NEW AGE.</p>
            <p className={styles.tex}>BMW iX ถือกำเนิดจากวิสัยทัศน์ ออกแบบเพื่อขับเคลื่อนด้วยไฟฟ้า ด้วยเทคโนโลยี BMW eDrive ที่เปี่ยมประสิทธิภาพและระบบขับเคลื่อนด้วยไฟฟ้าสี่ล้อ รถยนต์ BMW iX จึงขับขี่ได้ระยะทางไกลและมีอัตราเร่งออกตัวจากหยุดนิ่งที่เหนือชั้น รูปลักษณ์ที่ล้ำสมัยสะกดได้ทุกสายตาด้วยสไตล์การออกแบบที่เน้นความขึงขัง ห้องโดยสารสุดหรูหราด้วยวัสดุพรีเมียมคุณภาพสูงที่อัดแน่นไปด้วยเทคโนโลยีล้ำยุค และที่นั่งกว้างขวางสำหรับห้าคน จะทำให้คุณเดินทางได้อย่างสะดวกสบายเหนือระดับ สัมผัสกับมุมผ่อนคลายที่พาคุณเดินทางไปได้ทุกที่ พร้อมทั้งระบบปฏิบัติการอัจฉริยะ BMW Operating System 8</p>
          </div>

          <div className={styles.card}>
            <h2>This is our cars</h2>
            <h5>Title description, Sep 2, 2017</h5>
            <div className={styles.fakeimg} styles="height:200px;">Image</div>
            <p>Some text..</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          </div>

          
            <div className={styles.card}>
              <h2>About Me</h2>
              <div className={styles.fakeimg} styles="height:200px;">Image</div>
              <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
            </div>
            <div className={styles.card}>
              <h3>Popular Post</h3>
              <div className={styles.fakeimg} styles="height:200px;">Image</div>
              <div className={styles.fakeimg} styles="height:200px;">Image</div>
              <div className={styles.fakeimg} styles="height:200px;">Image</div>
            </div>


            <div className={styles.card}>
              <h3>Follow Me</h3>
              <p>Some text..</p>
            </div>
       

        </div>
        <h4> Selected Car: {car.name}:{car.major}:{car.gpa} </h4>
        <br></br>
        <div className={styles.list}>
          {printCars()}
        </div>
        <div className={styles.footer}>
          <h2>Footer</h2>
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
