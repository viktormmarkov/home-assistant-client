import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import DefaultLayout from "./containers/DefaultLayout";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={DefaultLayout} />
      </Router>
    );
  }
}

export default App;
