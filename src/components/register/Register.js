import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import authenticationScreen from '../../services/authenticationService';

class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register() {
    const user = {};
    authenticationScreen.register(user)
      .then(res => {
        console.log(res);
      })
  }
  render() {
    return (
      <Card className="p-4">
        <CardBody>
          <Form>
            <h1>Register</h1>
            <p className="text-muted">Create your account</p>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Username"
                autoComplete="username"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Email"
                autoComplete="email"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </InputGroup>
            <Row>
              <Col xs="6">
                <Button color="primary" onClick={this.register}>Create Account</Button>
              </Col>
              <Col xs="6" className="text-right">
                <Link to="/Login">
                  <Button color="link" className="px-0">
                    Sign in
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Register;
