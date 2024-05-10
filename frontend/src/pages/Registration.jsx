import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

import { FormField } from "./Login";
import Navbar from "./Navbar";

import "../styles/AccountForm.css";

const RegisterForm = () => {
    return (
        <div class = "account-form-wrapper">
            <h1>Create an Account</h1>

            <form>
                <FormField type = "text" id = "username" name = "username" placeholder = "Enter a username" required>
                    <FaUser class = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password" name = "password" placeholder = "Enter a password" required>
                    <RiLockPasswordFill class = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password2" name = "password2" placeholder = "Confirm your password" required>
                    
                </FormField>

                <div class = "form-button">
                    <button>Register</button>
                </div>

                <div class = "wrong-account-page">
                    <a href = "/login"><strong>Already have an account?</strong> Sign in.</a>
                </div>
            </form>
        </div>
    );
}

const Register = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div class = "account-body-wrapper">
                <div class = "left-half"></div>
                <div class = "right-half"><RegisterForm /></div>
            </div>       
        </div>
    );
}

export default Register;