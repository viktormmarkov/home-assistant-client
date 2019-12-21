import React, { Component } from 'react';

import {
  Row,
  FormGroup,
  Label,
  Card,
  CardBody,
  Col,
  Input,
  Button
} from 'reactstrap';
import Select from 'react-select';

import EntityMenu from '../common/EntityMenu';

import productService from '../../services/productService';
import shoppingListService from "../../services/shoppingListService";

class Product extends Component {
  constructor(context) {
    super(context);
    this.state = {
      productId: this.props.match.params.id,
      product: {},
      isNewEntity: false,
      loading: false,
      shoppingList: {}
    };
  }
  componentDidMount() {
    const { productId } = this.state;
    if (productId === 'new') {
      this.setState({isNewEntity: true});
    } else {
      this.getProduct();
      this.getShoppingList();
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

  getShoppingList() {
    shoppingListService.query().then(list => {
      this.setState({ shoppingList: list[0] });
    });
  }

  addItemToList = () => {
    const { product, shoppingList } = this.state;

    shoppingListService.addProductToList(shoppingList._id, product);
  };

  render() {
    const { product } = this.state
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Product {product.name}</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={product} {...this.props}>
            <Button
                onClick={this.addItemToList}
                className="btn-sm entity-menu-button"
                color="primary"
              >
              Add Item To List
            </Button>  
          </EntityMenu>
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
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="category">Categories</Label>
                  <Select options={[
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'strawberry', label: 'Strawberry' },
                    { value: 'vanilla', label: 'Vanilla' }
                  ]}></Select>
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
