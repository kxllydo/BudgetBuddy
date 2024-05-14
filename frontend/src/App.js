import './styles/App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import About from'./pages/About';
import Login from "./pages/Login";
import Register from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import Activity from "./pages/Activity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/forgot-password" element = {<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path = "/reports" element = {<Home />} />
          <Route path = "/activity" element = {<Activity />} />
          <Route path = "*" element = {<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;