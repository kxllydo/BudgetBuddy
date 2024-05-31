import { useState, useEffect } from "react";
import { PieChart, BarChart, LineChart, ResponsiveContainer, Line,  Bar, XAxis, YAxis, CartesianGrid, Pie, Cell, Tooltip, Legend } from "recharts";

import DisplayHolder from "@components/DisplayHolder";

import "@styles/Dashboard.scss";

const lineData = [
    { name: 'Jan', uv: 400 },
    { name: 'Feb', uv: 300 },
    { name: 'Mar', uv: 200 },
    { name: 'Apr', uv: 278 },
    { name: 'May', uv: 189 },
    { name: 'Jun', uv: 239 },
  ];
  
  const SimpleLineChart = () => {
    return (
        <ResponsiveContainer width = "100%" height = "100%">
            <LineChart width={550} height={240} data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>

    );
  };

const barData = [
    { name: 'Jan', uv: 400 },
    { name: 'Feb', uv: 300 },
    { name: 'Mar', uv: 200 },
    { name: 'Apr', uv: 278 },
    { name: 'May', uv: 189 },
    { name: 'Jun', uv: 239 },
  ];
  
const SimpleBarChart = () => {
    return (
        <ResponsiveContainer width = "100%" height = "100%">
        <BarChart width={600} height={240} data={barData} margin={{ top: 45, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#71b571" />
        </BarChart>
        </ResponsiveContainer>
    );
};
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieChartComponent = ({ data }) => {
    let pieData = [];
    if (data) {
        pieData = data.map(row => {return {"name": row[0], "value": row[1]}});
    }

    return (
        <ResponsiveContainer width = "100%" height = "100%">
            <PieChart width = "100%">
                <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                </Pie> 
            
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle"/>
            </PieChart>
        </ResponsiveContainer>
    );
};

const Dashbo2ard = () => {
    return(
        <div className = "dashboard-body">
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
    );
}

const fetchPieData = (setData) => {
    fetch("/get-category-spending", {
        method: "GET",
        credentials: "include",
    }).then(async response => {
        if (!response.ok)
            throw new Error("Error fetching data!");
        setData(await response.json());
    }).catch(error => console.log(error));
}

const Dashboard = () => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        fetchPieData(setPieData);
    }, []);

    return (
        <div className = "dashboard-page">
            <DisplayHolder id = "weekly-bar-chart">
            
            </DisplayHolder>

            <DisplayHolder id = "category-pie-chart">
                <PieChartComponent data = {pieData} />
            </DisplayHolder>

            <DisplayHolder id = "spent-most-chart">

            </DisplayHolder>

            <DisplayHolder id = "spent-least-chart">

            </DisplayHolder>

            <DisplayHolder id = "monthly-line-chart">
                <button onClick = {() =>
                    fetch("/get-monthly-spending", {method: "GET", credentials: "include",}).then(async response => console.log(await response.json()))
                }>Click Me!</button>
            </DisplayHolder>
        </div>
    )
}
 
export {PieChartComponent, SimpleBarChart, SimpleLineChart};
export default Dashboard;