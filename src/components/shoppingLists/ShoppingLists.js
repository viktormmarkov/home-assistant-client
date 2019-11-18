import React, { Component } from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import shoppingListService from '../../services/shoppingListService';

class ShoppingLists extends Component {
  render() {
    return (
      <EntityListBaseComponent service={shoppingListService} entityName={'shoppingLists'} {...this.props}/>
    )
  }
}

export default ShoppingLists;