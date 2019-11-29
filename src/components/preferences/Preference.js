
import React from "react";
import {EntityBase} from '../common';
import preferenceService from '../../services/preferenceService';

import {
  Row,
  FormGroup,
  Label,
  Card,
  CardBody,
  Col,
  Input,
} from 'reactstrap';

import EntityMenu from '../common/EntityMenu';
class Preference extends EntityBase {
  constructor(context) {
    super(context);
    this.entityService = preferenceService;
  }
  render () {
    const {item: preference} = this.state;
    return (
      <div className="animated fadeIn">
      <div className="section-header">
        <h3 className="inline">Preference {preference.name}</h3>
        <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={preference} {...this.props}/>
      </div>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="Text"
                  value={preference.name}
                  onChange={(event) => this.updateField("name", event.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default Preference;
