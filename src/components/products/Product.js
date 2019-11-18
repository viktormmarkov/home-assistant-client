import React, { Component } from 'react';
import productService from '../../services/productService';

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

class Product extends Component {
  constructor(context) {
    super(context);
    this.state = {
      productId: this.props.match.params.id,
      product: {},
      isNewEntity: false,
      loading: false
    };
  }
  componentDidMount() {
    const { productId } = this.state;
    if (productId === 'new') {
      this.setState({isNewEntity: true});
    } else {
      this.getProduct();
    }
  }
  getProduct() {
    const { productId } = this.state;
    this.setState({loading: true});
    productService.getItem(productId)
      .then(res => {
        this.setState({product: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  updateField = (name, value) => {
    const { product } = this.state;
    product[name] = value;
    this.setState({product});
  }

  saveItem = () => {
    const { productId, product} = this.state;
    let savePromise;
    if (productId === 'new') {
      savePromise = productService.addItem([product]);
    } else {
      savePromise = productService.updateItem(productId, product);
    }
    savePromise.then(res => {
      this.props.history.pop();
    }, err => alert(err));
  }

  deleteItem = () => {
    const { productId } = this.state;
    productService.deleteItem(productId)
      .then(res => console.log(res), err => alert(err));
  }

  render() {
    const { product } = this.state
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Product {product.name}</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={product} {...this.props}/>
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
                    value={product.name}
                    onChange={(event) => this.updateField("name", event.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Product;
