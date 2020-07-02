import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Chart from "./components/Chart/Chart";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Weather Forecast</h1>
      <Route exact path="/">
            <Landing />
      </Route>
      <Route path="/chart/:city">
            <Chart />
      </Route>
      </div>
    </Router>
  
  );
}

export default App;
