import './styles/App.css';
import Navbar from './Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import About from'./pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;