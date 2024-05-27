import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
                required = { required ? "true" : "false" }
            />
            { children }
        </div>
    )
}

const UsernameField = ({ email }) => {
    return (
        <FormField type = "text" id = "username" name = "username" placeholder = { email ? "Enter your username/email" : "Enter your username"} required = "true">
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
    return (
        <div className = "account-form-wrapper">
            <h1>Sign In</h1>

            <form>
                <UsernameField />
                <PasswordField />

                <div className = "forgot-password">
                    <Link to = {PATHS.ForgotPasswordPath}><strong>Forgot Password?</strong></Link>
                </div>

                <div className = "form-button">
                    <button>Login</button>
                </div>

                <div className = "wrong-account-page">
                    <Link to = {PATHS.RegisterPath}><strong>New user?</strong> Register here.</Link>
                </div>
            </form>
        </div>
    );
}

const RegistrationForm = () => {
    return (
        <div className = "account-form-wrapper">
            <h1>Create an Account</h1>

            <form>
                <UsernameField />
                <EmailField />
                <PasswordField />
                <FormField type = "password" id = "password2" name = "password2" placeholder = "Confirm your password" required>
                    
                </FormField>

                <div className = "form-button">
                    <button>Register</button>
                </div>

                <div className = "wrong-account-page">
                    <Link to = {PATHS.LoginPath}><strong>Already have an account?</strong> Sign in.</Link>
                </div>
            </form>
        </div>
    );
}

const ForgotPasswordForm = () => {
    return (
        <div className = "account-form-wrapper forgot-password-form-wrapper">
            <h1>Forgot Your Password?</h1>
            <p>Enter your username, and we'll send you an email for a one-time access link to login. You can reset your password in the settings once you're logged in.</p>

            <form>
                <UsernameField email = "yes" />

                <div className = "form-button">
                    <button>&gt;</button>
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