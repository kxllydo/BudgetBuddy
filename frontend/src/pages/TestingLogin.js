import "../styles/TestingLogin.css";
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


import Navbar from "./Navbar";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('/is_logged_in')
            .then(response => {
                setIsLoggedIn(response.data.logged_in);
            })
            .catch(error => {
                console.error("There was an error checking the login status!", error);
            });
    }, []);

    const login = (username, password) => {
        return axios.post('/login', { username, password })
            .then(response => {
                setIsLoggedIn(true);
                return response;
            });
    };

    const logout = () => {
        return axios.post('/logout')
            .then(response => {
                setIsLoggedIn(false);
                return response;
            });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const tlogin = (event) => {
    event.preventDefault();
    const form = document.querySelector("#tlogin");

    const loginData = new FormData(form);
    fetch ("http://127.0.0.1:5000/login", {
        method: 'POST',
        body: loginData
    });
}

const tsignup = (event) => {
    event.preventDefault();
    const form = document.querySelector("#tsignup");

    const loginData = new FormData(form);
    fetch ("http://127.0.0.1:5000/register", {
        method: 'POST',
        body: loginData
    });
}

const TestingLogin = () => {
    return (
        <>
            <Navbar />
            <div className = "bodyody">
                <form id = "tlogin">
                    <h1>login</h1>

                    <label htmlFor = "username">enter username</label>
                    <input required type = "text" name = "username" id = "username" placeholder = "enter username"/>
                    <br />
                    <label htmlFor = "password">enter password</label>
                    <input required type = "password" name = "password" id = "password" placeholder = "enter password" />
                
                    <button type = "submit" onClick = {tlogin}>login</button>
                </form>

                <hr />

                <form id = "tsignup">
                    <h1>signup</h1>

                    <label htmlFor = "username2">enter username</label>
                    <input required type = "text" name = "username2" id = "username2" placeholder = "enter username"/>
                    <br />
                    <label htmlFor = "email2">enter email</label>
                    <input required type = "email" name = "email2" id = "email2" placeholder = "enter username"/>
                    <br />
                    <label htmlFor = "password2">enter password</label>
                    <input required type = "password" name = "password2" id = "password2" placeholder = "enter password" />

                    <button type = "submit" onClick={tsignup}>register</button>
                </form>
            </div>
        </>
    )
}

export default TestingLogin;