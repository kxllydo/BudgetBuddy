import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import { PATHS } from "@/App";

const Signout = () => {
    const outletContext = useOutletContext();
    const setLoggedIn = outletContext["setLoggedIn"];
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("/logout", {
            method: "POST",
            credentials: "include",
        }).then(response => {
            if (!response.ok)
                throw new Error("Error while logging out");
            setLoggedIn(false);
            navigate(PATHS.LoginPath, {"replace": true});
        }).catch(error => {
            if (error) {
                alert(error);
            }
        });
    });

    return (<></>)
}

export default Signout;