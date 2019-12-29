import _ from 'lodash';
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

import EntityMenu from '../common/EntityMenu';
import Multiselect from "../common/Multiselect";
import productService from '../../services/productService';
import shoppingListService from "../../services/shoppingListService";
import categoryService from '../../services/categoryService';

class Product extends Component {
  constructor(context) {
    super(context);
    this.state = {
      productId: this.props.match.params.id,
      product: {},
      isNewEntity: false,
      loading: false,
      shoppingList: {},
      categories: []
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
    this.getCategories();
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

  getShoppingList = () => {
    shoppingListService.query().then(list => {
      this.setState({ shoppingList: list[0] });
    });
  }

  getCategories = () => {
    categoryService.query().then(list => {
      this.setState({ categories: list})
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

  addItemToList = () => {
    const { product, shoppingList } = this.state;

    shoppingListService.addProductToList(shoppingList._id, product);
  };

  render() {
    const { product, categories } = this.state
    console.log(product.categories);
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
                  <Multiselect
                    options={categories}
                    value={product.categories}
                    onChange={(selected) => {
                      this.updateField('categories', _.map(selected, s => s.value))
                    }}
                  >
                  </Multiselect>
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
