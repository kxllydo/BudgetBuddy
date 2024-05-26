import { Link, Outlet } from "react-router-dom";

import { PATHS } from "@/App";

import "@styles/components/BackPage.scss";

const Option = ({title, link, image}) => {
    return (
        <div className = "option">
            <div className = "sidebar-icons">
                <img src = {image} />
            </div>
            <Link to = {link}>{title}</Link>
        </div>
    );
}

const Sidebar = () => {
    return (
        <nav className = "sidebar">
            <div className = "top-options">
                <Option title = "Dashboard" link = {PATHS.DashboardPath} image = {require("@images/sidebar/dashboard.png")} />
                <Option title = "Activity" link = {PATHS.ActivityPath} image = {require("@images/sidebar/activity.png")} />
                <Option title = "Reports" link = {"/reports"} image = {require("@images/sidebar/reports.png")} />
                <Option title = "Budget" link = {PATHS.BudgetPath} image = {require("@images/sidebar/budget.png")} />
            </div>

            <div className = "bottom-options">
                <Option title = "Settings" link = {PATHS.SettingsPath} image = {require("@images/sidebar/settings2.png")} />
                <Option title = "Sign out" link = {PATHS.SignoutPath} image = {require("@images/sidebar/logout.png")} />
            </div>
        </nav>
    )
}

const BPLayout = ({}) => {
    return (
        <div className = "back-page-layout">
            <Sidebar />
            <div className = "back-page-body">
                <Outlet />
            </div>
        </div>
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
export default BPLayout;