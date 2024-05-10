import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import PieChartComponent from "./Piechart";
// import SimpleBarChart from "./Barchart";
import SimpleLineChart from "./Linechart"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 200 },
  { name: 'Apr', uv: 278 },
  { name: 'May', uv: 189 },
  { name: 'Jun', uv: 239 },
];

const SimpleBarChart = () => {
  return (
    <BarChart width={600} height={240} data={data} margin={{ top: 45, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#71b571" />
    </BarChart>
  );
};


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