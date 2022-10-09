import React from "react";
import { Link } from "react-router-dom";
import EntityListBaseComponent from "../common/EntityListBaseComponent";
import PeriodFormat from "../common/PeriodFormat";
import { capitalize } from "lodash";
import { Table, Button } from "reactstrap";

import campaignService from "../../services/campaignService";
import shopService from "../../services/shopService";

class Campaigns extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.entityName = "campaigns";
    this.service = campaignService;
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.getShops();
  };

  getShops = () => {
    shopService.query().then((list) => {
      this.setState({ shops: list });
    });
  };

  getListItem = (item, index) => {
    const shops = this.state.shops || [];
    const shop = shops.find((i) => i._id === item.shop);
    const shopName = (shop && shop.name) || "Shop Name";
    return (
      <tr key={item._id}>
        <td>
          <Link to={`/${this.entityName}/${item._id}`}>
            {shopName} -
            <PeriodFormat start={item.startDate} end={item.endDate} />
          </Link>
        </td>
        <td>{item.createdAt}</td>
        <td>{item.draft ? "Draft" : "Published"}</td>
        <td>{shopName}</td>
        <td>{item._id}</td>
      </tr>
    );
  };

  render() {
    const items = this.getListItems();
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">
            {capitalize(this.displayName || this.entityName)}
          </h3>
          <Button
            onClick={this.addItem}
            className="fright btn-sm"
            color="primary"
          >
            Add
          </Button>
        </div>
        <Table responsive hover>
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Date Created</th>
              <th>Status</th>
              <th>Shop</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => this.getListItem(item, index))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Campaigns;
