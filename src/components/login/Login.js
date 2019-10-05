import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import authenticationService from '../../services/authenticationService';
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }
  login() {
    const {email, password} = this.state;
    const user = {email, password};
    authenticationService.login(user)
      .then(res => {
        const {status} = res;
        if (status === 302 || status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }) 
      .catch(err => {
        console.log('err:', err);
      }) 
  }

  updateField(name, event) {
    const value = event.target.value;
    this.setState({[name]: value});
  }

  render() {
    return (
      <Card className="p-4">
        <CardBody>
        <Form>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="Username"
              autoComplete="email"
              value={this.state.email}
              onChange={this.updateField.bind(this, 'email')}
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
              placeholder="Password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.updateField.bind(this, 'password')}
            />
          </InputGroup>
          <Row>
            <Col xs="3">
              <Button color="primary" className="px-4" onClick={this.login}>
                Login
              </Button>
            </Col>
            <Col xs="9" className="text-right">
              <Link to="/register">
                <Button color="link" className="px-0">
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

export default Login;
