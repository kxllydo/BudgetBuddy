import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { PATHS } from "@/App";

import "@styles/components/FrontPage.scss";

const Navbar = () => {
    // TODO: actual logo

    return (
        <nav className = "navbar">
            <Link className = "logo" to = {PATHS.HomePath}>Expenses</Link>

            <ul>
                <li><Link className = "primary-btn" to = {PATHS.AboutPath}>About</Link></li>
                <li><Link className = "primary-btn" to = {PATHS.LoginPath}>Login</Link></li>
            </ul>
        </nav>
    )
}

const Footer = () => {
    return (
        <footer className = "footer">
            <div className = "columns">
                <div className = "column logo-column">
                    <Link className = "logo" to = {PATHS.HomePath}>Expenses</Link>
                </div>

                <div className = "column info-column">
                    <h1>Company Info</h1>

                    <ul>
                        <li><Link to = {PATHS.AboutPath}>About Us</Link></li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                <div className = "column resource-column">
                    <h1>Resources</h1>

                    <ul>
                        <li>Help Center</li>
                        <li>Contact Us</li>
                        <li><Link to = {PATHS.LoginPath}>Login</Link></li>
                        <li><Link to = {PATHS.RegisterPath}>Sign Up</Link></li>
                        <li><Link to = {PATHS.ForgotPasswordPath}>Reset Password</Link></li>
                    </ul>
                </div>
            </div>

            <div className = "copyright-line">copyright part</div>
        </footer>
    )
}

const FPLayout = ({ excludeNav, excludeFt }) => {
    const layoutClassName = "front-page-layout" + 
        (excludeNav ? " no-nav" : "") + 
        (excludeFt ? " no-footer" : "");

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