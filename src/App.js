import './App.css';
import React from 'react';
import Products from './components/Pages/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Population from './components/Pages/Population';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/products' element={<Products />} />
            <Route path='/population' element={<Population />} />
          </Routes>
        </Router>
      </div>
    );
  }
}


export default App;
