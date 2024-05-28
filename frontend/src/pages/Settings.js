import React, { useState } from 'react';

import Sidebar from "@components/Sidebar";

import "@styles/Settings.css";

const changeType = (type) => {
    const id = `change-${type}-button`;
    const form = `${type}-form`
    var oldDiv = document.getElementById(id);
    var email = document.getElementById(form);
    if (oldDiv.style.display = 'block'){
        oldDiv.style.display = 'none';
        email.style.display = 'block';
    }
}

const cancel = (event, type) => {
    event.preventDefault();
    const form = `${type}-form`;
    const btn = `change-${type}-button`;
    var formDiv = document.getElementById(form);
    var btnDiv = document.getElementById(btn);

    if (formDiv.style.display = 'block'){
        formDiv.style.display = 'none';
        btnDiv.style.display = 'block';
    }
}

const submit = async (event, type) => {
    event.preventDefault();
    const formID = `${type}-form`;
    console.log(formID);
    const url = `change-${type}`;
    const form = document.getElementById(formID);
    const formData = new FormData(form);
    try {
        const response = await fetch (url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })

        if (!response.ok){
            throw new Error ('Trouble changing');
        }
    } catch (error) {
        console.error(`Error editing ${type}:`, error);
        alert(`No ${type} found under that name. Try again`);
    };

    const btn = `change-${type}-button`;
    var formDiv = document.getElementById(formID);
    var btnDiv = document.getElementById(btn);
    if (formDiv.style.display = 'block'){
        formDiv.style.display = 'none';
        btnDiv.style.display = 'block';
    }
};

const TypeForm = ({type}) => {
    const formID = `${type}-form`;
    const oldType = `old-${type}`;
    const newType = `new-${type}`;
    let inputType = ''
    if (type == 'email'){
        inputType = 'email';
    }else if (type == 'password'){
        inputType = 'password';
    }else{
        inputType = 'text';
    };

    return (
        <form id = {formID} className="settings-form" onSubmit={(event) => submit(event, type)}>
            <div className="settings-input">
                <div className = "settings-pair">
                    <label htmlFor = {oldType} className = "settings-label">Old {type}:</label>
                    <input type={inputType} name = {oldType} className="settings-email-input" />
                </div>
            </div>

            <div className="settings-input">
                <div className = "settings-pair">
                    <label htmlFor={newType} className = "settings-label">New {type}:</label>
                    <input type={inputType} name={newType} className="settings-email-input" />
                </div>
                <div className = "settings-pair" style = {{marginLeft: "20%", marginRight:"20%"}}>
                    <button type = "submit" className="settings-submit-btn">Submit</button>
                    <button className="settings-cancel-btn" onClick={(event) => cancel(event, type)}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

const Settings = () => {

    return(
    <div className = "settings-page">
        <Sidebar />
        <div id = "settings-body">
            <h1>Settings</h1>
            <div id = "settings-container">
                <h2> Account </h2>
                
                <div className="settings-option">
                    <div className = "settings-option-pair">
                        <h3>Username</h3>
                        <p className="subtext">Change your username</p>
                    </div>
                    <div className = "settings-input" id = "settings-user">
                        <button className="settings-button" onClick={() => changeType("user")} id = "change-user-button">Change Username</button>
                        <TypeForm type = 'user' />
                    </div>
                </div>

                <div className="settings-option">
                    <div className = "settings-option-pair">
                        <h3>Email</h3>
                        <p className="subtext">Change your email</p>
                    </div>
                    <button className="settings-button" onClick={() => changeType("email")} id = "change-email-button">Change Email</button>
                    <TypeForm type = 'email' />
                </div>

                <div className="settings-option">
                    <div className = "settings-option-pair">
                        <h3>Password</h3>
                        <p className="subtext">Change your password</p>
                    </div>
                    <div className = "settings-input" id = "settings-password">
                        <button className="settings-button" onClick={() => changeType("password")}id = "change-password-button">Change Password</button>
                        <TypeForm type = 'password' />
                    </div>
                </div>

                <div className="settings-option">
                    <div className = "settings-option-pair">
                        <h3>Delete Account</h3>
                        <p className="subtext">Why are you leaving me?</p>
                    </div>
                    <div className = "settings-input" id = "settings-delete">
                        <button className="settings-button" style = {{backgroundColor:"rgb(229, 145, 145)"}} >Delete Account</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
};

export {TypeForm};
export default Settings;