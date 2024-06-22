import './NavBar.css'
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <span style={{padding: '8px'}}><Link to={'/'} className={({ isActive }) => (isActive ? 'active' : "")}>Home</Link></span>
            <span style={{padding: '8px'}}><Link to={'/products'} className={({ isActive }) => (isActive ? 'active' : "")}>Produtos</Link></span>
        </div>
    )
}

export default NavBar