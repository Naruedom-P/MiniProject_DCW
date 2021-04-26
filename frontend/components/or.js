import Link from 'next/link'
import styles from '../styles/Link.module.css'

const Navbar = () => (
    <div className = { styles.item1 } >
        <Link href="/getOrder"><a className = { styles.L }> Order a car </a></Link>

    </div>
)

export default Navbar