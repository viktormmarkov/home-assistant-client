import React from 'react';
import { FormGroup, Label, Input, Button, Card, CardBody, Form, Col, } from 'reactstrap';
import { Dropdown } from "../common";

export class PromotionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProduct: false
    }
  }

  updateField = (name, value) => {
    const { promotion } = this.props;
    promotion[name] = value;
    this.setState({ promotion });
  }

  render() {
    const { promotion, products } = this.props;
    return (
      <Form className={this.props.className}>
        <Card>
          <CardBody>
            <FormGroup row>
              <Label sm={3} htmlFor="product">Product</Label>
              <Col sm={9}>
                <Dropdown
                  items={products.sort((a,b) => ('' + a.name).localeCompare(b.name))}
                  id="product"
                  valueField="_id"
                  text="name"
                  valueKey="_id"
                  onChange={selectedItem => {
                    this.updateField('product', selectedItem._id);
                  }}
                  placeholder="Select Product"
                  value={promotion.product}
                ></Dropdown>
              </Col>
              <Button close onClick={this.props.removeItem} className="fixed-close"></Button>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} htmlFor="product">Name</Label>
              <Col sm={9}>
                <Input
                    id={`${promotion._id}-name`}
                    type="text"
                    value={promotion.name}
                    placeholder="Product Name"
                    onChange={(event) => this.updateField('name', event.target.value)}
                  />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} htmlFor="product">Subtitle</Label>
              <Col sm={9}>
                <Input
                    id={`${promotion._id}-subtitle`}
                    type="text"
                    value={promotion.subtitle}
                    placeholder="Product Subtitle"
                    onChange={(event) => this.updateField('subtitle', event.target.value)}
                  />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} htmlFor={`${promotion._id}-price`}>Price</Label>
              <Col sm={9}>
                <Input
                  id={`${promotion._id}-price`}
                  type="number"
                  value={promotion.price}
                  placeholder={'0.00$'}
                  onChange={(event) => this.updateField('price', event.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} htmlFor={`${promotion._id}-old-price`}>Old Price</Label>
              <Col sm={9}>
                <Input
                  id={`${promotion._id}-old-price`}
                  type="number"
                  value={promotion.oldPrice}
                  placeholder={'0.00$'}
                  onChange={(event) => this.updateField('oldPrice', event.target.value)}
                />
              </Col>
            </FormGroup>
          </CardBody>
        </Card>
      </Form>
    );
  }
}
