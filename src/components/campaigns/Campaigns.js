import React from "react";
import { Link } from 'react-router-dom';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import campaignService from '../../services/campaignService';

class Campaigns extends EntityListBaseComponent {
  constructor(props){
    super(props);
    this.entityName = 'campaigns';
    this.service = campaignService;
  }
  getListItem = (item, index) => {
    const shops = this.props.shops || [];
    const shop = shops.find(i => i._id === item.shop);
    const shopName = shop && shop.name || 'Shop Name';
    return ( <tr key={item._id}>
      <td>
        <Link to={`/${this.entityName}/${item._id}`}>{`${shopName} - ${item.startDate} to ${item.endDate}`}</Link>
      </td>
      <td>{item.createdAt}</td>
      <td>{item._id}</td>
    </tr>)
  }
}

export default Campaigns;