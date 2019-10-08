import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import RegisterScreen from "./components/register/RegisterScreen";
import DefaultLayout from "./containers/DefaultLayout";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
      </Router>
    );
  }
}

export default App;
