import './styles/App.css';
import Navbar from './Navbar';
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
    // <div className="App">
    //    <Navbar></Navbar>
    //    <Home></Home>
    //   {/* <div className="content">
    //     <h1>App Component</h1>
    //   </div> */}
    // </div>

  );
}

export default App;