import React from 'react';
import * as _ from 'lodash';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import promotionService from '../../services/promotionService';
import { Table, Button, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from '../common';

class Promotions extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.service = promotionService;
    this.entityName = 'promotions';

    this.state = {
      ...this.state,
      search: {
        filter: '',
        status: 'active'
      }
    };
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
    const {items, search} = this.state;
    const {filter, status} = search;

    const filtered = items.filter(i => {
      return (!filter || i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) &&
        (!status || i.status === status)
      });

    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 className="inline">{_.capitalize(this.entityName)}</h3>
            <Button onClick={this.addItem} className="fright btn-sm entity-menu-button" color="primary">Add</Button>
            <Button onClick={this.addItems} className="fright btn-sm entity-menu-button" color="primary">Add Items</Button>
          </div>
          <Row>
            <Col>
              <Dropdown 
                items={[{
                    value: 'active',
                    text: 'Active'  
                  }, {
                    value: 'expired',
                    text: 'Expired'
                  }, {
                    value: 'pending',
                    text: 'Pending'
                  }
                ]}
                valueField="value"
                text="text"
                allOption
                valueKey="value"
                onChange={selectedItem => this.updateSearch("status", selectedItem.value)}
                placeholder="Select Status"
                value={this.state.search.status}>
            </Dropdown>
            </Col>
          </Row>
          <hr></hr>
          <Table responsive hover>
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
                { filtered.map((item, index) => {
                     const entityName = this.entityName;
                     return (
                       <tr key={item._id}>
                         <td><Link to={`/${entityName}/${item._id}`}>{item.name || 'Missing name'}</Link></td>
                         <td>{item.createdAt}</td>
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

export default Promotions;
