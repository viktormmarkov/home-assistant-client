import React from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import promotionService from '../../services/promotionService';
import { Table, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

class Promotions extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.service = promotionService;
    this.entityName = 'promotions';

    this.state = {
      ...this.state,
      search: {
        filter: ''
      }
    };
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
              </tr>
            </thead>
            <tbody>
                { items.map((item, index) => {
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
