import AuthLayout from "../../containers/AuthLayout";
import Login from "./Login";
import React, { Component } from "react";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <AuthLayout>
        <Login {...this.props} />
      </AuthLayout>
    );
  }
}

export default LoginScreen;
