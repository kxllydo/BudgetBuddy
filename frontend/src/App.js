import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "@pages/Home";
import About from "@pages/About";
import { LoginPage as Login, RegistrationPage as Register, ForgotPasswordPage as ForgotPassword } from "@pages/AccountForm";

import Dashboard from "@pages/Dashboard";
import Activity from "@pages/Activity";
import Budget from "@pages/Budget";
import Settings from "@pages/Settings";

import "@/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path ="/" element = {<Home />} />
          <Route path ="/home" element = {<Home />} />
          <Route path ="/about" element = {<About />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/forgot-password" element = {<ForgotPassword />} />
          <Route path ="/dashboard" element = {<Dashboard/>} />
          <Route path = "/activity" element = {<Activity />} />
          <Route path ="/budget" element = {<Budget/>} />
          <Route path = "/settings" element = {<Settings />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;