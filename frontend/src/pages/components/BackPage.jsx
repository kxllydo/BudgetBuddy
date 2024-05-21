import Sidebar from "@components/Sidebar";

import "@styles/components/BackPage.css";

const Layout = ({ cols, rows, children }) => {
    if (!cols || cols < 1)
        cols = 1;
    if (!rows || rows < 1)
        rows = 1;

    return (
        <>
        
        </>
    )
}
/*
import "@styles/components/SidebarPage.css";

const DisplayHolder = ({children, className}) => {
    if (className)
        className = " " + className;
    else
        className = "";

    return (
        <div className = {"display-container" + className}>
            {children}
        </div>
    )
}

export default DisplayHolder;
*/