
import React, { Component } from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import categoryService from '../../services/categoryService';

class Categories extends Component {
  render() {
    return (
      <EntityListBaseComponent service={categoryService} entityName={'categories'}/>
    )
  }
}

export default Categories;