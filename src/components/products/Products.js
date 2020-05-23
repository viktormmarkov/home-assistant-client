
import React from 'react';
import * as _ from 'lodash';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import { Table, Button, Input, Row, Col } from 'reactstrap';
import productService from '../../services/productService';
import categoryService from "../../services/categoryService";
import { Dropdown } from "../common";
import { Link } from 'react-router-dom';

class Products extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.service = productService; 
    this.entityName = 'products';
    this.state = {
      ...this.state,
      search: {
        filter: ''
      }
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getCategories()
  }

  getItems() {
    this.setState({loading: true});
    this.service.query({personal: false})
      .then(items => {
        this.setState({items, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  getCategories() {
    categoryService.query().then(categories => {
      this.setState({
        categories
      });
    })
  }

  addItems = () => {
    this.props.history.push(`/${this.entityName}/add`);
  }

  updateSearch = (name, value) => {
    const { search } = this.state;
    search[name] = value;
    this.setState({search});
  }

  render() {
    const {items} = this.state
    const filtered = items.filter(i => {
      const {category, filter} = this.state.search;
      return (!filter || i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) &&
        (!category || i.categories.indexOf(category) !== -1); 
    });
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 className="inline">{_.capitalize(this.entityName)}</h3>
            <Button onClick={this.addItem} className="fright btn-sm entity-menu-button" color="primary">Add</Button>
            <Button onClick={this.addItems} className="fright btn-sm entity-menu-button" color="primary">Add Items</Button>
          </div>
          <Row>
            <Col sm="3">
              <Input
                id="filter"
                type="filter"
                placeholder="Search"
                value={this.state.search.filter}
                onChange={event => this.updateSearch('filter', event.target.value)}
              />  
            </Col>
            <Dropdown
              items={this.state.categories}
              valueField="_id"
              text="name"
              valueKey="_id"
              allOption={true}
              onChange={selectedItem => {
                  this.updateSearch("category", selectedItem._id)
                }
              }
              placeholder="Select Category"
              value={this.state.search.category}
            ></Dropdown>
          </Row>
          <hr></hr>
          <Table responsive hover>
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Date Created</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
                { filtered.map((item, index) => {
                     const entityName = this.entityName;
                     return (
                       <tr key={item._id}>
                         <td><Link to={`/${entityName}/${item._id}`}>{item.name}</Link></td>
                         <td>{item.createdAt}</td>
                         <td>{item.mainCategoryName}</td>
                       </tr>
                     )
                  }) 
                }
              </tbody>
          </Table>
      </div>
    );
  }
}

export default Products;