import React, { Component } from "react";
import {
  Row,
  FormGroup,
  Label,
  Card,
  CardBody,
  Col,
  Input,
  CardFooter,
  Button
} from 'reactstrap';
import shoppingListService from "../../services/shoppingListService";

class Permissions extends Component {
  constructor(context) {
    super(context);
    this.state = {
      shoppingListId: this.props.match.params.id,
      shoppingList: {}
    };
  }
  updateEmail = email => {
    this.setState({ email });
  };

  inviteUser = () => {
    const { shoppingListId, email } = this.state;
    shoppingListService.inviteUser(shoppingListId, email).then(res => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="email">Invite a buddy</Label>
                  <Input
                    id="email"
                    type="email"
                    value={this.state.email}
                    onChange={event => this.updateEmail(event.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <div className="fright">
              <Button onClick={this.inviteUser} color="primary">
                Invite
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Permissions;
