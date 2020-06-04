
import React from "react";
import {EntityBase} from '../common';
import shopService from '../../services/shopService';

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
class Shop extends EntityBase {
  constructor(context) {
    super(context);
    this.entityService = shopService;
  }
  render () {
    const {item: shop} = this.state;
    return (
      <div className="animated fadeIn">
      <div className="section-header">
        <h3 className="inline">Shop {shop.name}</h3>
        <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={shop} {...this.props}/>
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
                  value={shop.name}
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

export default Shop;
