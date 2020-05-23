
import React from "react";
import {Dropdown, EntityBase} from '../common';
import preferenceService from '../../services/preferenceService';
import productService from "../../services/productService";

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
  constructor(props) {
    super(props);
    this.entityService = preferenceService;
  }

  updateStateProducts() {
    productService.query().then(products => {
      this.setState({
        products
      });
    });
  }
  componentDidMount() {
    super.componentDidMount();
    this.updateStateProducts();
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
              <FormGroup>
                  <Label htmlFor="product">Product</Label>
                  <Dropdown
                    items={this.state.products}
                    valueField="_id"
                    text="name"
                    onChange={selectedItem =>
                      this.updateField("product", selectedItem._id)
                    }
                    placeholder="Select Product"
                    value={preference.product}
                  ></Dropdown>
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
