import { useState } from "react";

import "../styles/Popup.css";

const Popup = ({children}) => {
    const [show, setShow] = useState(true);

    return (
        <>
            <div className = "popup-background" onClick = {() => {setShow(!show);}} style = {{"display": show && "flex" || "none"}}>
                <div className = "popup">
                    <h1>HELLO</h1>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Popup;