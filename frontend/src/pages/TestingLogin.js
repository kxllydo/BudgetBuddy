import "../styles/TestingLogin.css";

import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";



const TestingLogin = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    const tlogin = (event) => {
        event.preventDefault();
        const form = document.querySelector("#tlogin");
    
        const loginData = new FormData(form);
        fetch("http://127.0.0.1:5000/login", {
            method: 'POST',
            body: loginData
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                setLoggedIn(true);
                console.log('working');
            } else {
                console.error('Login failed');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
    };
    
    const tsignup = (event) => {
        event.preventDefault();
        const form = document.querySelector("#tsignup");
    
        const loginData = new FormData(form);
        fetch ("http://127.0.0.1:5000/register", {
            method: 'POST',
            body: loginData
        });
    }

    
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