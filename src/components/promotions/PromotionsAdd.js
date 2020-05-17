
import * as _ from 'lodash';
import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Card,
  CardBody,
  Form,
  Col,
} from 'reactstrap';
import categoryService from '../../services/categoryService';
import promotionService from '../../services/promotionService';
import productService from "../../services/productService";
import { Dropdown, DatePeriodPicker} from "../common";
import Multiselect from "../common/Multiselect";

// brand 
// old price 
// shop

class PromotionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      addProduct: false
    }
  }
  updateField = (name, value) => {
    const { promotion } = this.props;
    promotion[name] = value;
    this.setState({promotion});
  }
 
  render () {
    const {promotion, products, categories} = this.props;
    const {product} = this.state;
    return (
      <Form className={this.props.className}>
        <FormGroup row>
          <Label sm={3} htmlFor="product">Product</Label>
          <Col sm={9}>
            <Dropdown
              items={products}
              id="product"
              valueField="_id"
              text="name"
              valueKey="_id"
              onChange={selectedItem => {
                  this.updateField("product", selectedItem._id)
                }
              }
              placeholder="Select Main Product"
              value={promotion.product}
            ></Dropdown>
          </Col>
          <Button close onClick={this.props.removeItem} className="fixed-close"></Button>
        </FormGroup>
          <FormGroup row>
            <Label sm={3} htmlFor="price">Price</Label>
            <Col sm={9}>
              <Input
                id="price"
                type="number"
                value={promotion.price}
                placeholder={'0.00$'}
                onChange={(event) => this.updateField('price', event.target.value)}
              />
            </Col>
          </FormGroup>
      </Form>
    );
  }
}

class PromotionsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [{
        name: '',
      }],
      products: [],
      promotion: {}
    }
  }
  
  componentDidMount() {
    this.getCategories();
    this.updateStateProducts();
  }

  updateField = (name, value) => {
    const { promotion } = this.state;
    promotion[name] = value;
    this.setState({promotion});
  }

  addItems = () => {
    const {promotions, promotion} = this.state;
    const promotionsExtended = promotions.map(p => ({...p, ...promotion}));
    return promotionService.addItem(promotionsExtended);
  }

  updateStateProducts() {
    productService.query().then(products => {
      this.setState({
        products
      });
    });
  }

  addItem = () => {
    const promotions = [...this.state.promotions, {name: ''}];
    this.setState({
      promotions
    })
  }

  getCategories = () => {
    categoryService.query().then(list => {
      this.setState({ categories: list})
    })
  }

  removeItem = (i) => {
    this.setState({
      promotions: this.state.promotions.filter((v, k) => k !== i)
    })
  }

  render() {
    const {promotions, products, promotion} = this.state;
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 className="inline">Add Promotions</h3>
            <Button onClick={this.addItems} className="fright btn-sm" color="primary">Add All</Button>
          </div>
          <hr></hr>
          <FormGroup>
            <div>
              <DatePeriodPicker
                fromLabel={'Active from'}
                startDate={promotion.startDate}
                endDate={promotion.endDate}
                onStartChange={selectedDate =>
                  this.updateField("startDate", selectedDate)
                }
                onEndChange={selectedDate =>
                  this.updateField("endDate", selectedDate)
                }
              ></DatePeriodPicker>
            </div>
          </FormGroup>
          <hr></hr>
          <Row>
          {promotions.map((p, i) => 
            <PromotionRow className="col-sm-4" key={i} promotion={p} products={products} removeItem={this.removeItem.bind(this, i)}></PromotionRow>
          )}
          <FormGroup className="col-sm-4">
            <Button onClick={this.addItem} size="lg" outline color="primary">Add Item</Button>
          </FormGroup>
          </Row>
      </div>
    );
  }
}

export default PromotionsAdd;