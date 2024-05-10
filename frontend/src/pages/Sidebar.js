import "../styles/Sidebar.css";
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return(
        <nav className="sidebar">
            <div className = "top-options">
                <div className="option">
                <Link to ="/dashboard">Dashboard</Link>
                </div>
                <div className="option">
                <Link to ="/activity">Activity</Link>
                </div>
                <div className="option">
                <Link to ="/reports">Reports</Link>
                </div>
            </div>

            <div className = "bottom-options">
                <div className="option">
                    <Link to ="/settings">Settings</Link>
                </div>
                <div className="option">
                    <Link to ="/">Log Out</Link>
                </div>
            </div>
        </nav>
    );
}
 
export default Sidebar;