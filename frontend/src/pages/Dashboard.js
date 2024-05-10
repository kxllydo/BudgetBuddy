import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import PieChartComponent from "./Piechart";
import SimpleBarChart from "./Barchart";
import SimpleLineChart from "./Linechart";

const Dashboard = () => {
    return(
        <div className = "dash-container">
            <Sidebar />
            <div className = 'dashboard-body'>
                <div className = "graph">
                    <SimpleBarChart />
                </div>

                <div className = "pie-chart">
                    <p className = "pie-header">Categorized Spending</p>
                    <PieChartComponent />
                </div>

                <div className="line-graph">
                    <SimpleLineChart />
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