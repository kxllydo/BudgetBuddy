import './styles/App.css';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import About from'./pages/About';
import Login from "./pages/Login";
import Register from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;