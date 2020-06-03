
import React from "react";
import {EntityBase} from '../common';
import campaignService from '../../services/campaignService';

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
class Campaign extends EntityBase {
  constructor(context) {
    super(context);
    this.entityService = campaignService;
  }
  render () {
    const {item: campaign} = this.state;
    return (
      <div className="animated fadeIn">
      <div className="section-header">
        <h3 className="inline">Campaign {campaign.name}</h3>
        <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={campaign} {...this.props}/>
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
                  value={campaign.name}
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

export default Campaign;
