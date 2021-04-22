import Link from 'next/link'

const Navbar = () => (
    <div className = { styles.item1 } >
        <Link href="/"><a className = { styles.L } > Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> | 
        <Link href="/getConfig"><a> Config </a></Link> | 
        <Link href="/car"><a>Car</a></Link>|
        <Link href="/managestudent"><a>Manage Car</a></Link>|
        <Link href="/logout"><a> Logout </a></Link>
        
    </div>
)

export default Navbar