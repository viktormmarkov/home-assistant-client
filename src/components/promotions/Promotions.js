import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import promotionService from '../../services/promotionService';

function PromotionRow(props) {
  const promotion = props.promotion

  return (
    <tr key={promotion._id}>
      <td><Link to={`/promotions/${promotion._id}`}>{promotion.name}</Link></td>
      <td>{promotion.createdAt}</td>
      <td>{promotion._id}</td>
    </tr>
  )
}
class Promotions extends Component {
  constructor() {
    super();
    this.state = {
      promotions: [],
      loading: false
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    this.setState({loading: true});
    promotionService.query()
      .then(res => {
        this.setState({promotions: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  addItem = () => {
    this.props.history.push("/promotions/new");
  }

  render() {
    const {promotions} = this.state
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 class="inline">Promotions</h3>
            <Button onClick={this.addItem} className="fright btn-sm">Add</Button>
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Created</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
                { promotions.map((promotion, index) => 
                    <PromotionRow key={index} promotion={promotion} />) 
                }
              </tbody>
          </Table>
      </div>
    );
  }
}

export default Promotions;
