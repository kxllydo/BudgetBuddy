import { Link } from 'react-router-dom';

import '@styles/components/Navbar.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className ="title-link">
          <Link to ="/">Expenses</Link>
        </div>
        <div className="links">
            <Link to ="/about">About</Link>
            <Link to ="/login">Log in</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;