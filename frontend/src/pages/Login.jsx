import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

import "../styles/Login.css";

const LoginForm = () => {
    return (
        <div class = "login-form-wrapper">
            <h1>Sign In</h1>

            <form>
                <div class = "login-form-field-wrapper">
                    <input type = "text" id = "login-form-username" name = "username" placeholder = "Enter your username" />
                    <FaUser class = "login-form-icon" />
                </div>
                <div class = "login-form-field-wrapper">
                    <input type = "password" id = "login-form-password" name = "password" placeholder = "Enter your password" />
                    <RiLockPasswordFill class = "login-form-icon" />
                </div>

                <div class = "forgot-your-password"><a>Forgot Your Password?</a></div>
                <div class = "login-button">
                    <button>Login</button>
                </div>
                <div class = "register-here"><a>New user? Register here!</a></div>
            </form>
        </div>
    );
}

const Login = ()  => {
    return (
        <div class = "body-wrapper">
            <div class = "left-half"></div>
            <div class = "right-half"><LoginForm /></div>
        </div>
    );
}

export default Login;