import React from "react";
import {EntityBase} from '../common';
import categoryService from "../../services/categoryService";

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
class Category extends EntityBase {
  constructor(props) {
    super(props);
    this.entityService = categoryService;
  }
  render () {
    const {item: category} = this.state;
    return (
      <div className="animated fadeIn">
      <div className="section-header">
        <h3 className="inline">Category {category.name}</h3>
        <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={category} {...this.props}/>
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
                  value={category.name}
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

export default Category;
