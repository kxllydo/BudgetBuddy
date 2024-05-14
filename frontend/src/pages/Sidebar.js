import "../styles/Sidebar.css";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return(
        <nav className="sidebar">
            <div className = "top-options">
                <div className="option">
                    <div className="sidebar-icons">
                        <img src="https://i.ibb.co/wwXCKnB/image-removebg-preview.png" alt="dashboard" />
                    </div>
                    <Link to ="/dashboard">Dashboard</Link>
                </div>
                <div className="option">
                    <div className="sidebar-icons">
                            <img src="https://i.ibb.co/MfzpqJZ/image-removebg-preview-1.png" alt="activity" />
                        </div>
                    <Link to ="/activity">Activity</Link>
                </div>
                <div className="option">
                    <div className="sidebar-icons">
                        <img src="https://i.ibb.co/QX8T7qn/image-removebg-preview-2.png" alt="report" />
                    </div>
                    <Link to ="/reports">Reports</Link>
                </div>
                <div className="option">
                    <Link to = "/budget">Budget</Link>
                </div>
            </div>

            <div className = "bottom-options">
                <div className="option">
                    <div className="sidebar-icons">
                        <img src="https://i.ibb.co/1mywcVC/image-removebg-preview-3.png" alt="settings" />
                    </div>
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