
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ItemRow from '../common/ItemRow'

import productService from '../../services/productService';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      loading: false
    };
  }
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    this.setState({loading: true});
    productService.query()
      .then(res => {
        this.setState({items: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  addItem = () => {
    this.props.history.push("/products/new");
  }

  render() {
    const {items} = this.state
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 class="inline">Products</h3>
            <Button onClick={this.addItem} className="fright btn-sm">Add</Button>
          </div>

          <Table responsive hover>
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Date Created</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
                { items.map((item, index) => 
                    <ItemRow key={index} item={item} entityName={'products'}/>) 
                }
              </tbody>
          </Table>
      </div>
    );
  }
}

export default Products;