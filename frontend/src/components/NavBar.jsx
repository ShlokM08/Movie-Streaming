// src/components/NavBar.jsx
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Brand → always goes home */}
        <div className="navbar-brand">
          <Link to="/" aria-label="FlickPick home">FlickPick</Link>
        </div>

        {/* Primary nav */}
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            Favorites
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
