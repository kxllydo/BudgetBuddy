import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
const Dashboard = () => {
    return(
        <div className = "dash-container">
            <Sidebar />
            <div className = 'dashboard-body'>
                <div className = "graph">
                    <h1>hi</h1>
                    <h2>h iihir</h2>
                    <h2>h iihir</h2>
                    <h2>h iihir</h2>
                    <h2>h iihir</h2>

                </div>
                <div className = "pie-chart">

                </div>

                <div className = "spent">
                    <div className = "category1">
                        <p className = "category">Spent the most in food this month</p>
                        <h1 className = "cost">
                            $15.11
                        </h1>
                    </div>
                    <div className = "category2">
                        <p className = "category">Spent the most in food this month</p>
                        <h1 className = "cost">
                            $705.11
                        </h1>
                    </div>

                </div>


            </div>
        </div>
    );
}
 
export default Dashboard;