import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

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
        <div class = "account-form-field-wrapper">
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
        <div class = "account-form-wrapper">
            <h1>Sign In</h1>

            <form>
                <FormField type = "text" id = "username" name = "username" placeholder = "Enter a username" required>
                    <FaUser class = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password" name = "password" placeholder = "Enter a password" required>
                    <RiLockPasswordFill class = "account-form-icon" />
                </FormField>

                <div class = "forgot-password">
                    <a href = "/"><strong>Forgot Password?</strong></a>
                </div>

                <div class = "form-button">
                    <button>Login</button>
                </div>

                <div class = "wrong-account-page">
                    <a href = "/register.html"><strong>New user?</strong> Register here.</a>
                </div>
            </form>
        </div>
    );
}

const Login = ()  => {
    return (
        <div class = "account-body-wrapper">
            <div class = "left-half"></div>
            <div class = "right-half"><LoginForm /></div>
        </div>
    );
}

export { FormField };
export default Login;