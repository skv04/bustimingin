import './styles/header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="header-container">
        <a href="/" className="brand">BusTiming.in</a>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/busroutes" onClick={() => setMenuOpen(false)}>Routes</Link></li>            
            <li><Link to="/drivers" onClick={() => setMenuOpen(false)}>Drivers</Link></li>
            <li><Link to="/buscompany" onClick={() => setMenuOpen(false)}>Bus company</Link></li>
            <li><Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
            <li><Link to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
          </ul>
        </nav>
        <ul className="navi nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/busroutes">Routes</Link></li>          
          <li><Link to="/drivers">Drivers</Link></li>
          <li><Link to="/buscompany">BusCompany</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
