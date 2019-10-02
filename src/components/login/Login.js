import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import authentication from '../../services/authentication';
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  login() {
    const sampleData = {
      email: 'email2@email.com',
      password: 'sample'
    };
    authentication.login(sampleData)
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
              autoComplete="username"
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
