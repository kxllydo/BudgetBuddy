import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from './Navbar';

/*
function App() {
  return (
    <div className="App">
       <Navbar></Navbar>
      <div className="content">
        <h1>App Component</h1>
      </div>
    </div>

  );
}
*/

import { GoPersonFill } from "react-icons/go";
import { FaUnlockAlt } from "react-icons/fa";

function App() {
  return (
    <div className = "App">
      <img src = "image.png"></img>
      <div class = "login-box">
        <form action = "" method = "get">
            <h1>Login</h1>
            <label for = "username" id = "username-label"><GoPersonFill /></label>
            <input type = "text" id = "username" name = "username" placeholder = "Username" required></input><br />
            <label for = "password" id = "password-label"><FaUnlockAlt /></label>
            <input type = "password" id = "password" name = "password" placeholder = "Password" required></input><br />

            <button>Register</button>
            <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;