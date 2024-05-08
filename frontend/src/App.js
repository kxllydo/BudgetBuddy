import './styles/App.css';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import About from'./pages/About';
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path = "/login.html" element = {<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;