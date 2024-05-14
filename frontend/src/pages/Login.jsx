import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

import Navbar from "./Navbar";

import "../styles/AccountForm.css";

const FormField = (props) => {
    if (!props.id)
        return null;
    if (!props.name)
        return null;
    if (!props.type)
        return null;
    if (!props.placeholder)
        return null;

    return (
        <div className = "account-form-field-wrapper">
            <input 
                type = {props.type}
                id = {"account-form-"+props.id}
                name = {props.name}
                placeholder = {props.placeholder}
                required = {props.required ? "true" : "false"}
            />
            {props.children}
        </div>
    );
}

const LoginForm = () => {
    return (
        <div className = "account-form-wrapper">
            <h1>Sign In</h1>

            <form>
                <FormField type = "text" id = "username" name = "username" placeholder = "Enter a username" required>
                    <FaUser className = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password" name = "password" placeholder = "Enter a password" required>
                    <RiLockPasswordFill className = "account-form-icon" />
                </FormField>

                <div className = "forgot-password">
                    <a href = "/forgot-password"><strong>Forgot Password?</strong></a>
                </div>

                <div className = "form-button">
                    <button>Login</button>
                </div>

                <div className = "wrong-account-page">
                    <a href = "/register"><strong>New user?</strong> Register here.</a>
                </div>
            </form>
        </div>
    );
}

const Login = ()  => {
    return (
        <div>
            <Navbar></Navbar>
            <div className = "account-body-wrapper">
                <div className = "left-half"></div>
                <div className = "right-half"><LoginForm /></div>
            </div>
        </div>
    );
}

export { FormField };
export default Login;