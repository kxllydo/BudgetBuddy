import './styles/App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import About from'./pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;