import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
       <Navbar></Navbar>
      <div className="content">
        <h1>App Component</h1>
      </div>
    </div>

  );
}

export default App;