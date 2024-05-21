import { useState } from "react";
import React from "react";

import "@styles/components/Popup.css";

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
                    {children}
                </div>
            </div>
        </>
    )
}

export default Popup;