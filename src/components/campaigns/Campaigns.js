import React from "react";
import { Link } from 'react-router-dom';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import PeriodFormat from '../common/PeriodFormat';

import campaignService from '../../services/campaignService';
import shopService from '../../services/shopService';

class Campaigns extends EntityListBaseComponent {
  constructor(props){
    super(props);
    this.entityName = 'campaigns';
    this.service = campaignService;
  }
  componentDidMount = () => {
    super.componentDidMount();
    this.getShops();
  }
  getShops = () => {
    shopService.query().then(list => {
      this.setState({ shops: list});
    })
  }
  getListItem = (item, index) => {
    const shops = this.state.shops || [];
    const shop = shops.find(i => i._id === item.shop);
    const shopName = shop && shop.name || 'Shop Name';
    return ( <tr key={item._id}>
      <td>
        <Link to={`/${this.entityName}/${item._id}`}>
          {shopName} - 
          <PeriodFormat 
            start={item.startDate} 
            end={item.end}
          />
        </Link>
      </td>
      <td>{item.createdAt}</td>
      <td>{item._id}</td>
    </tr>)
  }
}

export default Campaigns;