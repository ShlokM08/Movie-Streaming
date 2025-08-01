import { Link } from "react-router-dom";
import "../css/Navbar.css"
function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to ="/"> FlickPick</Link>
        </div>
        <div className="navbar-links">
            <Link to ="/favorites" className="nav-link">Favorites</Link>
            <Link to ="/" className="nav-link">Home</Link>
        </div>
    </nav>
}
export default NavBar