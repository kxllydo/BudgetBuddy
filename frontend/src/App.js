import './styles/App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from'./pages/About';
import Login from "./pages/Login";
import Register from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import Activity from "./pages/Activity";
import Budget from "./pages/Budget";
import Settings from "./pages/Settings";
import TestingLogin from "./pages/TestingLogin";
import React, { useState } from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "home" element = {<Home />} />
        <Route path = "about" element = {<About />} />
        {
          loggedIn ? (
            <>
              <Route path = "dashboard" element = {<Dashboard />} />
              <Route path = "reports" element = {<Home />} />
              <Route path = "activity" element = {<Activity />} />
              <Route path = "budget" element = {<Budget />} />
              <Route path = "settings" element = {<Settings />} />
            </>
          ) : (
            <>
              <Route path = "login" element = {<Login setLoggedIn = {setLoggedIn} />} />
              <Route path = "register" element = {<Register setLoggedIn = {setLoggedIn} />} />
              <Route path = "forgot-password" element = {<ForgotPassword />} />
              <Route path = "tl" element = {<TestingLogin setLoggedIn = {setLoggedIn} />} />

              <Route path = "dashboard" element = {<Navigate to = "/login" />} />
              <Route path = "reports" element = {<Navigate to = "/login" />} />
              <Route path = "activity" element = {<Navigate to = "/login" />} />
              <Route path = "budget" element = {<Navigate to = "/login" />} />
              <Route path = "settings" element = {<Navigate to = "/login" />} />
            </>
          )
        }
      </Routes>
    </BrowserRouter>
  )
}

function Ap2p() {

  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        {loggedIn ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Home />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tl" element={<TestingLogin />} />
          </>
        ) : (
          <>
            <Route path="/tl" element={<TestingLogin setLoggedIn={setLoggedIn} />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;