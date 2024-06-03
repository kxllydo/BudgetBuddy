import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { PATHS } from "@/App";

import "@styles/Home.scss";

const DemoSection = ({ demoSection, switchDemoSection }) => {
    const demoSections = ["dashboard", "activity", "budget"];
    const descriptions = [
        "Explore our widgets to simplify your financial data",
        "View all your finances by month",
        "Set up budgets to reach your financial goals"
    ];

    return (
        <div className = "wrapper">
            <div className = "left">
                <ul>
                    <li onClick = {() => {switchDemoSection(0)}} className = {demoSections[demoSection] == "dashboard" && "active"}>Dashboard</li>
                    <li onClick = {() => {switchDemoSection(1)}} className = {demoSections[demoSection] == "activity" && "active"}>Activity</li>
                    <li onClick = {() => {switchDemoSection(2)}} className = {demoSections[demoSection] == "budget" && "active"}>Budget</li>
                </ul>
            </div>

            <div className = "right">
                <div className = "description">
                    {descriptions[demoSection]}
                </div>

                <img src = {require(`@images/${demoSections[demoSection]}-demo.jpeg`)} />
            </div>
        </div>
    );
}

const Home = () => {
    const [demoSection, switchDemoSection] = useState(0);

    return (
        <div className = "home-container">
            <section className = "hero-section">
                <div className = "left">
                    <h1><span>Track Your Spending,</span>Master Your Finances</h1>
                    <p>With easy interfaces, categorized expenses, and more, keeping record of your expenses has never been easier.</p>
                    <Link className = "primary-btn" to = {PATHS.DashboardPath}>Get Started</Link>
                </div>

                <div className = "right">
                    <img src={require("@images/home-hero2.png")} alt="dashboard" />
                </div>
            </section>

            <section className = "demo-section">
                <h1>A One-Stop Shop for All Your Financial Needs</h1>

                <DemoSection demoSection = {demoSection} switchDemoSection = {switchDemoSection} />
            </section>
        </div>
    )
}
 
export default Home;