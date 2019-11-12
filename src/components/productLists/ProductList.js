import React, { Component } from 'react';
import productListService from '../../services/productListService';

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

class ProductList extends Component {
  constructor(context) {
    super(context);
    this.state = {
      productListId: this.props.match.params.id,
      productList: {},
      isNewEntity: false,
      loading: false
    };
  }
  componentDidMount() {
    const { productListId } = this.state;
    if (productListId === 'new') {
      this.setState({isNewEntity: true});
    } else {
      this.getProductList();
    }
  }
  getProductList() {
    const { productListId } = this.state;
    this.setState({loading: true});
    productListService.getItem(productListId)
      .then(res => {
        this.setState({productList: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  updateField = (name, value) => {
    const { productList } = this.state;
    productList[name] = value;
    this.setState({productList});
  }

  saveItem = () => {
    const { productListId, productList} = this.state;
    let savePromise;
    if (productListId === 'new') {
      savePromise = productListService.addItem([productList]);
    } else {
      savePromise = productListService.updateItem(productListId, productList);
    }
    savePromise.then(res => {
      this.props.history.pop();
    }, err => alert(err));
  }

  deleteItem = () => {
    const { productListId } = this.state;
    productListService.deleteItem(productListId)
      .then(res => console.log(res), err => alert(err))
  }

  render() {
    const { productList } = this.state
    /* Add all of the properties, labels and loading state*/
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Product List {productList.name}</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={productList} {...this.props}/>
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
                    value={productList.name}
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

export default ProductList;
