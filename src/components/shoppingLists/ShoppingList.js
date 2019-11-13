import React, { Component, useState } from 'react';
import shoppingListService from '../../services/shoppingListService';
const PRODUCT_LIST_DATA = [{
  _id: 'someid',
  name: 'Chicken Wings',
  price: 10,
  quantity: 20
}]

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

function ShoppingItem(props) {
  const [product] = useState(props.product);
  return (
    <div>
      <span>{product.name}</span>
      <span>{product.price}</span>    
      <span>{product.quantity}</span>    
    </div>
  )
}

function ShoppingListItems(props) {
  const [products] = useState(props.products);
  return (
    <section>
      {products.map((p, i) => <ShoppingItem product={p} key={p._id} />)}
    </section>
  );
}

class ShoppingList extends Component {
  constructor(context) {
    super(context);
    this.state = {
      shoppingListId: this.props.match.params.id,
      shoppingList: {},
      isNewEntity: false,
      loading: false,
      products: [...PRODUCT_LIST_DATA]
    };
  }
  componentDidMount() {
    const { shoppingListId } = this.state;
    if (shoppingListId === 'new') {
      this.setState({isNewEntity: true});
    } else {
      this.getShoppingList();
    }
  }
  getShoppingList() {
    const { shoppingListId } = this.state;
    this.setState({loading: true});
    shoppingListService.getItem(shoppingListId)
      .then(res => {
        this.setState({shoppingList: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  updateField = (name, value) => {
    const { shoppingList } = this.state;
    shoppingList[name] = value;
    this.setState({shoppingList});
  }

  saveItem = () => {
    const { shoppingListId, shoppingList} = this.state;
    let savePromise;
    if (shoppingListId === 'new') {
      savePromise = shoppingListService.addItem([shoppingList]);
    } else {
      savePromise = shoppingListService.updateItem(shoppingListId, shoppingList);
    }
    savePromise.then(res => {
      this.props.history.pop();
    }, err => alert(err));
  }

  deleteItem = () => {
    const { shoppingListId } = this.state;
    shoppingListService.deleteItem(shoppingListId)
      .then(res => console.log(res), err => alert(err))
  }

  render() {
    const { shoppingList } = this.state
    /* Add all of the properties, labels and loading state*/
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Product List {shoppingList.name}</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={shoppingList} {...this.props}/>
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
                    value={this.state.shoppingList.name}
                    onChange={(event) => this.updateField("name", event.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <ShoppingListItems products={this.state.products}></ShoppingListItems>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ShoppingList;
