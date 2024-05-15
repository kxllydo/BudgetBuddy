import Sidebar from "./Sidebar";
import "../styles/Settings.css";
import React, { useState } from 'react';



const ChangeEmail = () => {
    var oldDiv = document.getElementById("change-email-button");
    var email = document.getElementById("email-form");
    if (oldDiv.style.display = 'block'){
        oldDiv.style.display = 'none';
        email.style.display = 'block';
    }


}



const EmailForm = () => {
    return (
        <div className="settings-form" id = "email-form">
            <div className="settings-input">
                <div className = "settings-pair">
                    <label htmlFor="oldEmail" className = "settings-label">Old Email:</label>
                    <input type="email" id="oldEmail" className="settings-email-input" />
                </div>
            </div>

            <div className="settings-input">
                <div className = "settings-pair">
                    <label htmlFor="newEmail" className = "settings-label">New Email:</label>
                    <input type="email" id="newEmail" className="settings-email-input" />
                </div>
            </div>
            {/* <button type="submit"  */}
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
                    {/* <div className = "settings-input" id = "settings-email"> */}
                    <button className="settings-button" onClick={ChangeEmail} id = "change-email-button">Change Email</button>
                        <EmailForm />
                    {/* </div> */}
                </div>

                <div className="settings-option" id="email-div">
                    <div className = "settings-option-pair">
                        <h3>Password</h3>
                        <p className="subtext">Change your password</p>
                    </div>
                    <div className = "settings-input" id = "settings-password">
                        <button className="settings-button">Change Password</button>
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

export {EmailForm};
export default Settings;