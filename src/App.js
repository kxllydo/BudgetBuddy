import './styles/App.css';
import Navbar from './Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
       <Navbar></Navbar>
       <Home></Home>
      {/* <div className="content">
        <h1>App Component</h1>
      </div> */}
    </div>

  );
}

export default App;