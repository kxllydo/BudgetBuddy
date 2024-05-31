import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { FPLayout, AFLayout } from "@components/FrontPage";
import Home from "@pages/Home";
import About from "@pages/About";
import { LoginPage as Login, RegistrationPage as Register, ForgotPasswordPage as ForgotPassword } from "@pages/AccountForm";
import Error404 from "@pages/Error404";

import BPLayout from "@components/BackPage";
import Dashboard from "@pages/Dashboard";
import Activity from "@pages/Activity";
import Budget from "@pages/Budget";
import Settings from "@pages/Settings";
import Signout from "@pages/Signout";

import "@/App.scss";

const PATHS = {
    HomePath : "/",
    AboutPath : "/about",
    LoginPath : "/login",
    RegisterPath : "/register",
    ForgotPasswordPath : "/forgot-password",
    Error404Path : "/error-404",
    DashboardPath : "/dashboard",
    ActivityPath : "/activity",
    BudgetPath : "/budget",
    SettingsPath : "/settings",
    SignoutPath : "/signout"
};

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<FPLayout />}>
                    <Route path = {PATHS.HomePath} element = {<Home />} />
                    <Route path = {PATHS.AboutPath} element = {<About />} />
                    <Route path = {PATHS.Error404Path} element = {<Error404 />} />
                    <Route path = "*" element = {<Navigate to = {PATHS.Error404Path} replace/>}/>
                </Route>
                <Route element = {<AFLayout loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} />}>
                    <Route path = {PATHS.LoginPath} element = {<Login />} />
                    <Route path = {PATHS.RegisterPath} element = {<Register />} />
                    <Route path = {PATHS.ForgotPasswordPath} element = {<ForgotPassword />} />
                </Route>
                <Route element = {<BPLayout loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} />}>
                    <Route path = {PATHS.DashboardPath} element = {<Dashboard />} />
                    <Route path = {PATHS.ActivityPath} element = {<Activity />} />
                    <Route path = {PATHS.BudgetPath} element = {<Budget />} />
                    <Route path = {PATHS.SettingsPath} element = {<Settings />} />
                    <Route path = {PATHS.SignoutPath} element = {<Signout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export { PATHS };
export default App;