import { BrowserRouter, Routes, Route } from "react-router-dom";

import FPLayout from "@components/FrontPage";
import Home from "@pages/Home";
import About from "@pages/About";
import { LoginPage as Login, RegistrationPage as Register, ForgotPasswordPage as ForgotPassword } from "@pages/AccountForm";

import BPLayout from "@components/BackPage";
import Dashboard from "@pages/Dashboard";
import Activity from "@pages/Activity";
import Budget from "@pages/Budget";
import Settings from "@pages/Settings";

import "@/App.scss"; 

const PATHS = {
    HomePath : "/",
    AboutPath : "/about",
    LoginPath : "/login",
    RegisterPath : "/register",
    ForgotPasswordPath : "/forgot-password",
    DashboardPath : "/dashboard",
    ActivityPath : "/activity",
    BudgetPath : "/budget",
    SettingsPath : "/settings",
    SignoutPath : "/signout"
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<FPLayout />}>
                    <Route path = {PATHS.HomePath} element = {<Home />} />
                    <Route path = {PATHS.AboutPath} element = {<About />} />
                    <Route path = "*" /> {/* TODO: Create a Error 404 page */}
                </Route>
                <Route element = {<FPLayout excludeFt />}>
                    <Route path = {PATHS.LoginPath} element = {<Login />} />
                    <Route path = {PATHS.RegisterPath} element = {<Register />} />
                    <Route path = {PATHS.ForgotPasswordPath} element = {<ForgotPassword />} />
                </Route>
                <Route element = {<BPLayout />}>
                    <Route path = {PATHS.DashboardPath} element = {<Dashboard />} />
                    <Route path = {PATHS.ActivityPath} element = {<Activity />} />
                    <Route path = {PATHS.BudgetPath} element = {<Budget />} />
                    <Route path = {PATHS.SettingsPath} element = {<Settings />} />
                    <Route path = {PATHS.SignoutPath} /> {/* TODO: Create a signout component */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export { PATHS };
export default App;