
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label, Input, Button, Row, Card, CardBody, Form, Col, } from 'reactstrap';
import EntityMenu from '../common/EntityMenu';
import { EntityBase } from '../common';
import { Dropdown, DatePeriodPicker } from "../common";
import categoryService from '../../services/categoryService';
import promotionService from '../../services/promotionService';
import campaignService from '../../services/campaignService';
import productService from "../../services/productService";


const calculateStatus = (period) => {
  if (moment().isBetween(period.startDate, period.endDate)) {
    return 'active';
  } else if (moment().isBefore(period.startDate)) {
    return 'pending';
  } else {
    return 'expired';
  }
}
class PromotionRow extends React.Component {
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

class Campaign extends EntityBase {
  constructor(props) {
    super(props);
    this.entityService = campaignService;
    this.state = {
      ...this.state,
      promotions: [{
        name: '',
      }],
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.getCategories();
    this.getPromotions();
    this.updateStateProducts();
  }

  saveItem = () => {
    const { promotions, item, id } = this.state;
    const status = calculateStatus(item);
    const promotionsExtended = promotions.map(p => ({ ...p, ...item, status }));
    let savePromise;
    if (id === "new") {
      savePromise = this.entityService
        .addItem([{ ...item, promotions: promotionsExtended }])
        .messages({ ok: 'Added', error: 'Error' });
    } else {
      savePromise = this.entityService.updateItem(id, item);
    }
    savePromise.then(
      res => this.props.history.goBack(),
      err => alert(err)
    );
  }

  updateStateProducts() {
    productService.query().then(products => {
      this.props.productsLoaded(products);
    });
  }

  addPromotion = () => {
    const promotions = [...this.state.promotions, { name: '' }];
    this.setState({
      promotions
    })
  }

  getPromotions = () => {
    const { id } = this.state;
    promotionService.query({campaign: id}).then(res => {
      this.setState({promotions: res})
    })
  }

  getCategories = () => {
    categoryService.query().then(list => {
      this.setState({ categories: list })
    })
  }

  removeItem = (i) => {
    this.setState({
      promotions: this.state.promotions.filter((v, k) => k !== i)
    })
  }

  render() {
    const { promotions, item } = this.state;
    const { products } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Add Campaign</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={item} {...this.props}/>
          <Button onClick={this.props.openDialog} className="fright btn-sm entity-menu-button" color="primary">Add Product</Button>
        </div>
        <hr></hr>
        <FormGroup>
          <div>
            <DatePeriodPicker
              fromLabel={'Active from'}
              startDate={item.startDate}
              endDate={item.endDate}
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
          <FormGroup className="col-sm-12">
            <Button onClick={this.addPromotion} size="lg" outline color="primary">Add Item</Button>
          </FormGroup>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.list
});

const mapDispatchToProps = dispatch => ({
  productsLoaded: (items) => { dispatch({ type: 'LIST_LOADED', payload: items }) },
  openDialog: () => { dispatch({ type: 'DIALOG_OPEN', payload: { type: 'ProductModal' } }) }
})



export default connect(mapStateToProps, mapDispatchToProps)(Campaign);