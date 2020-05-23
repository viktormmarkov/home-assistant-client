
import React, { Component } from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import categoryService from '../../services/categoryService';

class Categories extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.entityName = 'categories';
    this.service = categoryService;
  }
}

export default Categories;