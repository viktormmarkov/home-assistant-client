
import React, { Component } from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import productListService from '../../services/productListService';

class ProductLists extends Component {
  render() {
    return (
      <EntityListBaseComponent service={productListService} entityName={'productLists'} {...this.props}/>
    )
  }
}

export default ProductLists;