import React, { Component } from 'react';
import shoppingListService from '../../services/shoppingListService';

import {
  Row,
  CardBody,
  Col,
} from 'reactstrap';

import EntityMenu from '../common/EntityMenu';

function ShoppingItem(props) {
  const item = props.item;
  return (
    <div>
      <span>{item.name}</span>
      <span>{item.price}</span>    
      <span>{item.quantity}</span> 
      <span onClick={() => props.removeItem(item)}>X</span>   
    </div>
  )
}

function ShoppingListItems(props) {
  const items = props.items;
  return (
    <section>
      {items.map((p, i) => <ShoppingItem item={p} key={p._id} {...props}/>)}
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
      items: []
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
        this.getShoppingItems();
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  getShoppingItems() {
    const { shoppingListId } = this.state;
    shoppingListService.getShoppingItems(shoppingListId).then(items => { 
      this.setState({items})
    });
  }

  updateField = (name, value) => {
    const { shoppingList } = this.state;
    shoppingList[name] = value;
    this.setState({ shoppingList });
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

  removeItem = (item) => {
    const { shoppingListId } = this.state;
    console.log(item);
    shoppingListService.removeShoppingItem(shoppingListId, item._id)
      .then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
      .then(() => {
        this.getShoppingItems();
      });
  }

  render() {
    const { shoppingList } = this.state
    /* Add all of the properties, labels and loading state*/
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Shopping List {shoppingList.name}</h3>
          <EntityMenu
            saveItem={this.saveItem}
            deleteItem={this.deleteItem}
            entity={shoppingList}
            {...this.props}
          />
        </div>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <ShoppingListItems
                  items={this.state.items} removeItem={this.removeItem}
                ></ShoppingListItems>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ShoppingList;
