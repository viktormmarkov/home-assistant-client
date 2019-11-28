import React from "react";
import { Table, Button } from 'reactstrap';
import ItemRow from './ItemRow';

export default class EntityListBaseComponent extends React.Component {
  constructor(props) {
    super(props);
    const {service, entityName} = props;
    this.service = service;
    this.entityName = entityName;
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
    this.service.query()
      .then(items => {
        this.setState({items, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  addItem = () => {
    this.props.history.push(`/${this.entityName}/new`);
  }

  render() {
    const {items} = this.state
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 className="inline">{this.entityName}</h3>
            <Button onClick={this.addItem} className="fright btn-sm" color="primary">Add</Button>
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
