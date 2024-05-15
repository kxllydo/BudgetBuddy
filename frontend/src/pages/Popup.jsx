import "../styles/Popup.css";
import { useState } from "react";
import React from "react";

const Popup = ({children, className, open, setOpen}) => {
    if (className)
        className = " " + className;
    else
        className = "";

    return (
        <>
            <div
                className = {"popup-background" + className + (open && " show" || " wasd")}
                onClick = {() => {setOpen(false);}}>
                <div onClick = {(event) => {event.stopPropagation()}} className = "popup">
                    <h1>HELLO</h1>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Popup;