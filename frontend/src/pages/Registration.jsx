import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FormField } from "./Login";
import Navbar from "./Navbar";

import "../styles/AccountForm.css";

const RegisterForm = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const register = (event) => {
        event.preventDefault();
        const form = document.querySelector("form");
        const loginData = new FormData(form);
        fetch("/register", {
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
            alert(error);
        })
    }

    return (
        <div className = "account-form-wrapper">
            <h1>Create an Account</h1>

            <form>
                <FormField type = "text" id = "username" name = "username" placeholder = "Enter a username" required>
                    <FaUser className = "account-form-icon" />
                </FormField>
                <FormField type = "email" id = "email" name = "email" placeholder = "Enter a email" required>
                    <RiLockPasswordFill className = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password" name = "password" placeholder = "Enter a password" required>
                    <RiLockPasswordFill className = "account-form-icon" />
                </FormField>
                <FormField type = "password" id = "password2" name = "password2" placeholder = "Confirm your password" required>
                    
                </FormField>

                <div className = "form-button">
                    <button type = "submit" onClick = {register} >Register</button>
                </div>

                <div className = "wrong-account-page">
                    <a href = "/login"><strong>Already have an account?</strong> Sign in.</a>
                </div>
            </form>
        </div>
    );
}

const Register = ({ setLoggedIn }) => {
    return (
        <div>
            <Navbar></Navbar>
            <div className = "account-body-wrapper">
                <div className = "left-half"></div>
                <div className = "right-half"><RegisterForm setLoggedIn = {setLoggedIn} /></div>
            </div>       
        </div>
    );
}

export default Register;