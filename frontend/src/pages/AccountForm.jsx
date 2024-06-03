import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

import Layout from "@components/FrontPage";
import { PATHS } from "@/App";

import "@styles/AccountForm.scss";

/* Minor Components */
const FormField = ({ id, name, type, placeholder, required, children }) => {
    if (!id || !name || !type || !placeholder)
        return null;

    return (
        <div className = "account-form-field-wrapper">
            <input
                type = { type }
                id = { id }
                name = { name }
                placeholder = { placeholder }
                required = { required ? true : false }
            />
            { children }
        </div>
    )
}

const UsernameField = () => {
    return (
        <FormField type = "text" id = "username" name = "username" placeholder = "Enter your username" required>
            <FaUser className = "account-form-icon" />
        </FormField>
    )
}

const PasswordField = () => {
    return (
        <FormField type = "password" id = "password" name = "password" placeholder = "Enter your password" required>
            <RiLockPasswordFill className = "account-form-icon" />
        </FormField>
    ) 
}

const EmailField = () => {
    return (
        <FormField type = "email" id = "email" name = "email" placeholder = "Enter your email" required>
            <MdEmail className = "account-form-icon" />
        </FormField>
    )
}

/* Larger Components */

const LoginForm = () => {
    const outletContext = useOutletContext();
    const setLoggedIn = outletContext["setLoggedIn"];
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        const form = document.querySelector("#login-form");
        const loginData = new FormData(form);

        fetch("/login", {
            method: "POST",
            body: loginData,
            credentials: "include",
        }).then(response => {
            if (!response.ok)
                throw new Error("Failed to verify login credentials.");

            setLoggedIn(true);
            navigate(PATHS.DashboardPath, {"replace": true});
        }).catch(error => {
            alert(error);
        })
    };

    return (
        <div className = "account-form-wrapper">
            <h1>Sign In</h1>

            <form id = "login-form" onSubmit = {login}>
                <UsernameField />
                <PasswordField />

                <div className = "forgot-password">
                    <Link to = {PATHS.ForgotPasswordPath}><strong>Forgot Password?</strong></Link>
                </div>

                <div className = "form-button">
                    <button type = "submit">Login</button>
                </div>

                <div className = "wrong-account-page">
                    <Link to = {PATHS.RegisterPath}><strong>New user?</strong> Register here.</Link>
                </div>
            </form>
        </div>
    );
}

const RegistrationForm = () => {
    const outletContext = useOutletContext();
    const setLoggedIn = outletContext["setLoggedIn"];
    const navigate = useNavigate();

    const register = (event) => {
        event.preventDefault();
        const form = document.querySelector("#register-form");
        const loginData = new FormData(form);

        fetch("/register", {
            method: "POST",
            body: loginData,
            credentials: "include",
        }).then(response => {
            if (!response.ok) 
                throw new Error("Failed to verify registration credentials.");

            setLoggedIn(true);
            navigate(PATHS.DashboardPath, {"replace": true});
        }).catch(error => {
            alert(error);
        })
    };

    return (
        <div className = "account-form-wrapper">
            <h1>Create an Account</h1>

            <form id = "register-form" onSubmit = {register}>
                <UsernameField />
                <EmailField />
                <PasswordField />
                <FormField type = "password" id = "password2" name = "password2" placeholder = "Confirm your password" required>
                    
                </FormField>

                <div className = "form-button">
                    <button tyoe = "submit">Register</button>
                </div>

                <div className = "wrong-account-page">
                    <Link to = {PATHS.LoginPath}><strong>Already have an account?</strong> Sign in.</Link>
                </div>
            </form>
        </div>
    );
}

const ForgotPasswordForm = () => {
    const outletContext = useOutletContext();
    const setLoggedIn = outletContext["setLoggedIn"];
    const navigate = useNavigate();
    const [useEmail, setUseEmail] = useState(false);

    const sendLink = (event) => {
        event.preventDefault();
        const form = document.querySelector("#forgot-password-form");
        const fpData = new FormData(form);

        fetch("/send-forgot-password-link", {
            method: "POST",
            body: fpData,
            credentials: "include",
        }).then(response => {
            if (!response.ok)
                throw new Error("Failed to send link.");
            
            setLoggedIn(true);
            navigate(PATHS.DashboardPath, {"replace": true});
        }).catch(error => alert(error));
    }
    
    return (
        <div className = "account-form-wrapper forgot-password-form-wrapper">
            <h1>Forgot Your Password?</h1>
            <p>Enter your {useEmail ? "email" : "username"}, and we'll send you an email for a one-time link to reset your password.</p>

            <form id = "forgot-password-form" onSubmit = {sendLink}>
                {useEmail ? <EmailField /> : <UsernameField />}
                <span> Use <a onClick = {() => {setUseEmail(!useEmail)}}> {useEmail ? "username" : "email"} </a> instead.</span>

                <div className = "form-button">
                    <button type = "submit">&gt;</button>
                </div>

                <div className = "wrong-account-page">
                    <Link to = {PATHS.RegisterPath}><strong>New user?</strong> Register here.</Link><br />
                    <Link to = {PATHS.LoginPath}><strong>Remember your password?</strong> Sign in here.</Link>
                </div>
            </form>
        </div>
    );
}

/* Pages */

const PageLayout = ({ children }) => {
    return (
        <div className = "account-body-wrapper">
            <div className = "left-half"></div>
            <div className = "right-half">{ children }</div>
        </div>
    )
}

const LoginPage = () => {
    return (<PageLayout><LoginForm /></PageLayout>);
}

const RegistrationPage = () => {
    return (<PageLayout><RegistrationForm /></PageLayout>);
}

const ForgotPasswordPage = () => {
    return (<PageLayout><ForgotPasswordForm /></PageLayout>);
}

export { LoginPage, RegistrationPage, ForgotPasswordPage };