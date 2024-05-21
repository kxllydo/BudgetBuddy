import { Link } from 'react-router-dom';

import "@styles/Sidebar.css";
import "@styles/SidebarPage.css";

const Option = ({title, link, image}) => {
    return (
        <div className = "option">
            <div className = "sidebar-icons"><img src = {image} /></div>
            <Link to = {link}>{title}</Link>
        </div>
    )
}

const Sidebar = () => {
    return(
        <nav className="sidebar">
            <div className = "top-options">
                <Option title = "Dashboard" link = "/dashboard" image = {require("../images/sidebar/dashboard.png")} />
                <Option title = "Activity" link = "/activity" image = {require("../images/sidebar/activity.png")} />
                <Option title = "Reports" link = "/reports" image = {require("../images/sidebar/reports.png")} />
                <Option title = "Budget" link = "/budget" image = {require("../images/sidebar/budget.png")} />
            </div>

            <div className = "bottom-options">
                <Option title = "Settings" link = "/settings" image = {require("../images/sidebar/settings2.png")} />
                <Option title = "Sign out" link = "/" image = {require("../images/sidebar/logout.png")} />
            </div>
        </nav>
    );
}

export default Sidebar;