
import React, { Component } from 'react';
import productService from '../../services/productService';
import EntityListBaseComponent from '../common/EntityListBaseComponent';

class Products extends Component {
  render() {
    return (
      <EntityListBaseComponent service={productService} entityName={'products'}/>
    )
  }
}

export default Products;