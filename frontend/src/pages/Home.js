import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
import "../styles/Home.css"
import Navbar from "./Navbar"
import "../styles/Navbar.css"

const Home = () => {
    return(
        <body>
        <Navbar />
        <div className = "home-container">
            <div className = "slogan">
                <h1>Track your spending, master your finances</h1>
                <p>With an easy interface, categorized expenses, and more, keeping record of your expenses never felt so easy</p>
                <br></br>
                <div className = "start">
                    <Link to = "/dashboard"> Get Started</Link>
                </div>
            </div>

            <div className = "demo">
                <img src="https://i.ibb.co/g44hqGF/Untitled-design-removebg-preview.png" height = "120%" alt = "dashboard"></img>
            </div>
        </div>
        </body>
    );
}
 
export default Home;