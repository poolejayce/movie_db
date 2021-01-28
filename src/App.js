import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar/Navbar.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <div>
            <Route exact path='/'/>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
