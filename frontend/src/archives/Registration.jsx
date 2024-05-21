import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

import { FormField } from "@pages/Login";
import Navbar from "@components/Navbar";

import "@styles/AccountForm.css";

const RegisterForm = () => {
    return (
        <div className = "account-form-wrapper">
            <h1>Create an Account</h1>

            <form>
                <FormField type = "text" id = "username" name = "username" placeholder = "Enter a username" required>
                    <FaUser className = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password" name = "password" placeholder = "Enter a password" required>
                    <RiLockPasswordFill className = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password2" name = "password2" placeholder = "Confirm your password" required>
                    
                </FormField>

                <div className = "form-button">
                    <button>Register</button>
                </div>

                <div className = "wrong-account-page">
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
            <div className = "account-body-wrapper">
                <div className = "left-half"></div>
                <div className = "right-half"><RegisterForm /></div>
            </div>       
        </div>
    );
}

export default Register;