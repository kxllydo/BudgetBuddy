import { FaUser } from "react-icons/fa6";

import Navbar from "@components/Navbar";
import { FormField } from "@pages/Login";

import "@styles/ForgotPassword.css";

const ForgotPasswordForm = () => {
    return (
        <div className = "account-form-wrapper forgot-password-form-wrapper">
            <h1>Forgot Your Password?</h1>
            <p>Enter your username, and we'll send you an email for a one-time access link to login. You can reset your password in the settings once you're logged in.</p>

            <form>
                <FormField type = "text" id = "username" name = "username" placeholder = "Enter your username">
                    <FaUser className = "account-form-icon" />
                </FormField>

                <div className = "form-button">
                    <button>&gt;</button>
                </div>

                <div className = "wrong-account-page">
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
            <div className = "account-body-wrapper forgot-password-body-wrapper">
                <div className = "left-half"></div>
                <div className = "right-half"><ForgotPasswordForm /></div>
            </div>
        </div>
    )
}

export default ForgotPassword;