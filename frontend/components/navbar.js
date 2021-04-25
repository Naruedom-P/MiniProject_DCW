import Link from 'next/link'
import styles from '../styles/Link.module.css'

const Navbar = () => (
    <div className = { styles.item1 } >
        <Link href="/"><a className = { styles.L } > Home </a></Link> 
        <Link href="/register"><a className = { styles.L }> Register </a></Link>  
        <Link href="/login"><a className = { styles.L }> Login </a></Link> 
        <Link href="/profile"><a className = { styles.L }> Profile </a></Link> 
        <Link href="/getOrder"><a className = { styles.L }> Order </a></Link> 
 
        <Link href="/manageCar"><a className = { styles.L }>Manage Car</a></Link> 
        <Link href="/logout"><a className = { styles.L }> Logout </a></Link>
        
    </div>
)

export default Navbar