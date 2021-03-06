import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Or from '../components/or'
import styles from '../styles/Homepage.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
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
              <Or />
            </div>
            <p>THE FIRST BMW iX: PIONEER OF A NEW AGE.</p>
            <p className={styles.tex}>BMW iX ถือกำเนิดจากวิสัยทัศน์ ออกแบบเพื่อขับเคลื่อนด้วยไฟฟ้า ด้วยเทคโนโลยี BMW eDrive ที่เปี่ยมประสิทธิภาพและระบบขับเคลื่อนด้วยไฟฟ้าสี่ล้อ รถยนต์ BMW iX จึงขับขี่ได้ระยะทางไกลและมีอัตราเร่งออกตัวจากหยุดนิ่งที่เหนือชั้น รูปลักษณ์ที่ล้ำสมัยสะกดได้ทุกสายตาด้วยสไตล์การออกแบบที่เน้นความขึงขัง ห้องโดยสารสุดหรูหราด้วยวัสดุพรีเมียมคุณภาพสูงที่อัดแน่นไปด้วยเทคโนโลยีล้ำยุค และที่นั่งกว้างขวางสำหรับห้าคน จะทำให้คุณเดินทางได้อย่างสะดวกสบายเหนือระดับ สัมผัสกับมุมผ่อนคลายที่พาคุณเดินทางไปได้ทุกที่ พร้อมทั้งระบบปฏิบัติการอัจฉริยะ BMW Operating System 8</p>
          </div>

          <div className={styles.card}>
            <h1>THE i4</h1>
            <h3>THE FIRST-EVER PURELY ELECTRIC GRAN COUPE</h3>
            <div className={styles.fakeimg} > <img src="ci4.jpg" alt="ci4" width="100%" height="auto"></img>
              <Or />
            </div>
            <p>Some text..</p>
            <p className={styles.tex}>Gran Coupé รุ่นแรกที่ออกแบบด้วยการขับเคลื่อนด้วยไฟฟ้า จะทำให้คุณเดินทางได้อย่างสะดวกสบายเหนือระดับอย่างเต็มที่ด้วยระยะทางไกลถึง 600 กิโลเมตร* รถสี่ประตูที่ให้กำลังแรงสูงสุดถึง 390 กิโลวัตต์ / 530 แรงม้า มีอัตราเร่งออกตัวจากหยุดนิ่งที่เหนือชั้นจึงขับขี่ได้ระยะทางไกล</p>
          </div>

          <div className={styles.card}>
            <h2>Example of product image</h2>
            <div className={styles.pagination}>
              <a href="#">&laquo;</a>
              <a href="ci4.jpg">1</a>
              <a href="cix.jpg" >2</a>
              <a href="ci3.jpg">3</a>
              <a href="ci8.jpg">4</a>
              <a href="Back_Home.jpg">5</a>
              <a href="#">&raquo;</a>
            </div>
          </div>

        </div>

        <div className={styles.footer}>
          <h2>Footer</h2>.
          <h4> อ่างอิงข้อมูลจาก : https://www.bmw.co.th/th/home.html</h4>
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
