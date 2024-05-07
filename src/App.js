import './styles/App.css';
import Navbar from './Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import About from'./pages/About';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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