import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@components/Navbar";

import "@styles/AccountForm.css";

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

const LoginForm = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const login = (event) => {
        event.preventDefault();
        const form = document.querySelector("form");
        const loginData = new FormData(form);
        fetch("/login", {
            method: "POST",
            body: loginData,
            credentials: "include",
        }).then(response => {
            if (response.ok) {
                setLoggedIn(true);
                navigate("/dashboard");
                return null;
            } else {
                return response.json();
            }
        }).then(error => {
            if (error)
                alert(error.message);
        }).catch(error => {
            console.log(error);
        });
    };

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
                    <button type = "submit" onClick = {login}>Login</button>
                </div>

                <div className = "wrong-account-page">
                    <a href = "/register"><strong>New user?</strong> Register here.</a>
                </div>
            </form>
        </div>
    );
}

const Login = ({ setLoggedIn })  => {
    return (
        <div>
            <Navbar></Navbar>
            <div className = "account-body-wrapper">
                <div className = "left-half"></div>
                <div className = "right-half"><LoginForm setLoggedIn = {setLoggedIn} /></div>
            </div>
        </div>
    );
}

const Logout = ({ loggedIn, setLoggedIn }) => {
    if (loggedIn) {
        setLoggedIn(false);
        fetch("/logout", {
            method: "POST",
            credentials: "include",
        });
    }
    
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login");
    })
}

export { FormField, Logout };
export default Login;