import AuthLayout from "../../containers/AuthLayout";
import Login from "./Login";
import React, { Component } from "react";

class LoginScreen extends Component {
  render() {
    return (
      <AuthLayout>
        <Login />
      </AuthLayout>
    );
  }
}

export default LoginScreen;
