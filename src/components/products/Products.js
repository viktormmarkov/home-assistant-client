
import React, { Component } from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import { Table, Button } from 'reactstrap';
import ItemRow from '../common/ItemRow';
import productService from '../../services/productService';

class Products extends EntityListBaseComponent {
  constructor(props) {
    const propsExtended = {service: productService, 
    entityName: 'products', ...props}
    super(propsExtended);

  }

  addItems = () => {
    this.props.history.push(`/${this.entityName}/add`);
  }

  render() {
    const {items} = this.state
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 className="inline">{this.entityName}</h3>
            <Button onClick={this.addItem} className="fright btn-sm entity-menu-button" color="primary">Add</Button>
            <Button onClick={this.addItems} className="fright btn-sm entity-menu-button" color="primary">Add Items</Button>
            
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
                    <ItemRow key={index} item={item} entityName={this.entityName}/>) 
                }
              </tbody>
          </Table>
      </div>
    );
  }
}

export default Products;