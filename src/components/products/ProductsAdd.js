
import * as _ from 'lodash';
import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import Multiselect from "../common/Multiselect";
import categoryService from '../../services/categoryService';
import productService from '../../services/productService';

class ProductRow extends React.Component {
  updateField = (name, value) => {
    const { product } = this.props;
    product[name] = value;
    this.setState({product});
  }
 
  render () {
    const {product, categories} = this.props;
   
    return (
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="Text"
          value={product.name}
          placeholder={'Product name'}
          onChange={(event) => this.updateField('name', event.target.value)}
        />
        <Label htmlFor="category">Categories</Label>
        <Multiselect
          options={categories}
          value={product.categories}
          onChange={(selected) => {
            this.updateField('categories', selected.map(s => s.value))
          }}
        >
        </Multiselect>
      </FormGroup>
    );
  }
}

class ProductsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{
        name: '',
        categories: []
      }]
    }
  }

  componentDidMount() {
    this.getCategories();
  }

  addItems = () => {
    const {products} = this.state;
    return productService.addItem(products);
  }


  addItem = () => {
    const lastProduct = _.last(this.state.products);
    const products = [...this.state.products, {name: '', categories: [...lastProduct.categories]}];
    this.setState({
      products
    })
  }

  getCategories = () => {
    categoryService.query().then(list => {
      this.setState({ categories: list})
    })
  }

  render() {
    const {products, categories} = this.state;
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 className="inline">Add Products</h3>
            <Button onClick={this.addItems} className="fright btn-sm" color="primary">Add All</Button>
          </div>
          {products.map((p, i) => <ProductRow key={i} product={p} categories={categories}></ProductRow>)}
          <Button onClick={this.addItem} className="btn-sm" color="primary">Add Item</Button>

      </div>
    );
  }
}

export default ProductsAdd;