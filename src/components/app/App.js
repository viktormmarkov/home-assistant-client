import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../login/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>

        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
      </Router>
    );
  }
}

export default App;
