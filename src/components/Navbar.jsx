import React from "react";
import logo from '../images/logo.png'
import { Link,useLocation } from 'react-router-dom';
const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/">
      <img className="logo-img" src={logo} alt="carhunt" />
        </Link>
        
      </div>
      <div className="nav-links">
      {isHome ? (
          <>
            <li><a href="#home">Home</a></li>
            <li><a href="#browse">Browse</a></li>
          </>
        ) : (
          <li><Link to="/">Back to Home</Link></li>
        )}
      </div>
      
      <Link to="/wishlist">
      <button className="btn">Wishlist </button>
      </Link>
     
      <button className="btn">Contact Us</button>

    </nav>
  );
};

export default Navbar;
