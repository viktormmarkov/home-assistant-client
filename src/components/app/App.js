import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';


import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <h3> Page content goes here</h3>

          <hr/>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
