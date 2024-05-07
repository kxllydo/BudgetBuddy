import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
import "../styles/Home.css"

const Home = () => {
    return(
        <BrowserRouter>
        <div className = "home-container">
            <div className = "slogan">
                <p>Track your spending, master your finances</p>
                <div className = "start">
                    <Link to = "/"> Get Started</Link>
                </div>
            </div>
            
            <div className = "dashboard">
                <img src="https://i.ibb.co/sJmFfMK/image.png" alt = "dashboard"></img>
            </div>
        </div>
        </BrowserRouter>
    );
}
 
export default Home;