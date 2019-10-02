import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class AuthLayout extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              {this.props.children}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AuthLayout;
