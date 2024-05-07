import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import './styles/Navbar.css';
import About from'./pages/About';

const Navbar = () => {
    return (
      <BrowserRouter>
      <nav className="navbar">
        <div className ="title-link">
          <Link to ="/">Expenses</Link>
        </div>
        <div className="links">
            <Link to ="/about">About</Link>
            <Link to ="/">Log in</Link>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="about" element = {<About />} />
        </Routes>
      </main>
      </BrowserRouter>
    );
  }
   
  export default Navbar;