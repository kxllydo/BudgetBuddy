import { Link, Outlet, Navigate } from "react-router-dom";

import { PATHS } from "@/App";

import "@styles/components/BackPage.scss";

const Option = ({title, link, image}) => {
    return (
        <Link to = {link}>
            <div className = "option">
                <img src = {image} />
                <span className = "a">{title}</span>
            </div>
        </Link>
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
                <Option title = "Exit" link = {PATHS.HomePath} image = {require("@images/sidebar/logout.png")} />
                <Option title = "Sign out" link = {PATHS.SignoutPath} image = {require("@images/sidebar/logout.png")} />
            </div>
        </nav>
    )
}

const BPLayout = ({ loggedIn, setLoggedIn }) => {
    if (!loggedIn) {
        return (<Navigate to = {PATHS.LoginPath} replace />);
    }

    return (
        <div className = "back-page-layout">
            <Sidebar />
            <div className = "back-page-body">
                <Outlet context = {{"setLoggedIn": setLoggedIn}} />
            </div>
        </div>
    )
}

export default BPLayout;