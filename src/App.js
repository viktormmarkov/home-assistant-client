import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from "./components/login/Login";
import DefaultLayout from "./containers/DefaultLayout";

class App extends Component {
  render() {
    return (
      <Router>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>

        <Route path="/login" component={Login} />
        <Route path="/" exact component={DefaultLayout} />
      </Router>
    );
  }
}

export default App;
