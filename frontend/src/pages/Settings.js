import Sidebar from "./Sidebar";
import "../styles/Settings.css";
import React, { useState } from 'react';



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


const TypeForm = ({type}) => {
    const formID = `${type}-form`;
    return (
        <div className="settings-form" id = {formID}>
            <div className="settings-input">
                <div className = "settings-pair">
                    <label htmlFor="oldEmail" className = "settings-label">Old {type}:</label>
                    <input type="email" id="oldEmail" className="settings-email-input" />
                </div>
            </div>

            <div className="settings-input">
                <div className = "settings-pair">
                    <label htmlFor="newEmail" className = "settings-label">New {type}:</label>
                    <input type="email" id="newEmail" className="settings-email-input" />
                </div>
                <button type = "submit" className="settings-submit-btn">Submit</button>
            </div>
        </div>
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