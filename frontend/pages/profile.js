import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const URL_INCOME = `http://localhost/api/income`

const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})
    const [income, setIncome] = useState(0)

    useEffect(() => {
        profileUser()
    }, [])

    const getIncome = async () => {
        const result = await axios.get(URL_INCOME)
        setIncome(result.data)
    }

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
            <div className={styles.imgcontainer}>
                    <img src="user.png" alt="Avatar" class="avatar"></img>
                </div>
                
                <h1>User profile</h1>
                <div>
                    <b>Token:</b> {token.substring(0, 15)}... 
                    <br />
                    <h1>Order information Customer purchase</h1>
                    <h2>Customer:{JSON.stringify(user.username)}</h2> 
                    <h2>Order quantity: {income}</h2>
                   
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
