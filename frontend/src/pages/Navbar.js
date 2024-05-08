import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import '../styles/Navbar.css';
import About from'./About';


const Navbar = () => {
    return (
      <nav className="navbar">
        <div className ="title-link">
          <Link to ="/">Expenses</Link>
        </div>
        <div className="links">
            <Link to ="/about.html">About</Link>
            <Link to ="/login.html">Log in</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;