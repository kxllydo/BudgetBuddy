import { FaUser } from "react-icons/fa6";

import Navbar from "./Navbar";
import { FormField } from "./Login";
import "../styles/ForgotPassword.css";

const ForgotPasswordForm = () => {
    return (
        <div class = "account-form-wrapper forgot-password-form-wrapper">
            <h1>Forgot Your Password?</h1>
            <p>Enter your username, and we'll send you an email for a one-time access link to login. You can reset your password in the settings once you're logged in.</p>

            <form>
                <FormField type = "text" id = "username" name = "username" placeholder = "Enter your username">
                    <FaUser class = "account-form-icon" />
                </FormField>

                <div class = "form-button">
                    <button>&gt;</button>
                </div>

                <div class = "wrong-account-page">
                    <a href = "/register"><strong>New user?</strong> Register here.</a><br />
                    <a href = "/login"><strong>Remember your password?</strong> Sign in.</a>
                </div>
            </form>
        </div>
    )
}

const ForgotPassword = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div class = "account-body-wrapper forgot-password-body-wrapper">
                <div class = "left-half"></div>
                <div class = "right-half"><ForgotPasswordForm /></div>
            </div>
        </div>
    )
}

export default ForgotPassword;