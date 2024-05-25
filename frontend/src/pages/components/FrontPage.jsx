import { Link, Outlet } from "react-router-dom";

import { PATHS } from "@/App";

import "@styles/components/FrontPage.scss";

const Navbar = () => {
    // TODO: actual logo
    // TODO: fix button hovers

    return (
        <nav className = "navbar">
            <Link className = "logo" to = {PATHS.HomePage}>Expenses</Link>

            <ul>
                <li><Link className = "primary-btn" to = {PATHS.AboutPage}>About</Link></li>
                <li><Link className = "primary-btn" to = {PATHS.LoginPage}>Login</Link></li>
            </ul>
        </nav>
    )
}

const Footer = () => {
    // TODO: actual footer

    return (
        <footer className = "footer">
            <div>footer here!</div>
        </footer>
    )
}

const FPLayout = ({ excludeNav, excludeFt }) => {
    excludeNav = (!excludeNav || excludeNav.toLowerCase() == "false") ? false : true;
    excludeFt = (!excludeFt || excludeFt.toLowerCase() == "false") ? false : true;
    
    const layoutClassName = "front-page-layout" + (excludeNav ? " no-nav" : "") + (excludeFt ? " no-footer" : "");

    return (
        <div className = {layoutClassName}>
            {excludeNav ? null : <Navbar />}
            <div className = "front-page-body">
                <Outlet />
            </div>
            {excludeFt ? null : <Footer />}
        </div>
    )
}

export { Navbar, Footer };
export default FPLayout;