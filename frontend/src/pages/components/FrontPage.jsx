//import Navbar from "@components/Navbar";
import { Link } from "react-router-dom";

import "@styles/components/FrontPage.scss";

const Navbar2 = () => {
    return (
        <nav className = "navbar">
            <Link className = "logo" to = "/">Expenses</Link>

            <ul>
                <li><Link to = "about">About</Link></li>
                <li><Link to = "login">Login</Link></li>
            </ul>
        </nav>
    )
}

const Footer = () => {
    return (
        <footer>
            <h1>footer here!</h1>
        </footer>
    )
}

const Layout = ({ className, children, excludeNav, excludeFt }) => {
    console.log(typeof excludeFt);
    excludeNav = (!excludeNav || excludeNav.toLowerCase() == "false") ? false : true;
    excludeFt = (!excludeFt || excludeFt.toLowerCase() == "false") ? false : true;
    
    const layoutClassName = "front-page-layout" + (excludeNav ? " no-nav" : "") + (excludeFt ? " no-footer" : "");
    const bodyClassName = "front-page-body" + (className ? " " + className : "");

    return (
        <div className = {layoutClassName}>
            {excludeNav ? null : <Navbar2 />}
            <div className = {bodyClassName}>
                { children } 
            </div>
            {excludeFt ? null : <Footer />}
        </div>
    )
}

export default Layout;