import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import RegisterScreen from "./components/register/RegisterScreen";
import DefaultLayout from "./containers/DefaultLayout";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" render={props => <LoginScreen {...props} />} />
          <Route exact path="/register" render={props => <RegisterScreen {...props} />} />
          <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
