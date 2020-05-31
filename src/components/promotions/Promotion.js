import React, { Component } from "react";
import { Dropdown, DatePeriodPicker } from "../common";
import {
  Row,
  FormGroup,
  Label,
  Card,
  CardBody,
  Col,
  Input,
  Button
} from "reactstrap";
import EntityMenu from "../common/EntityMenu";

import promotionService from "../../services/promotionService";
import shoppingListService from "../../services/shoppingListService";
import productService from "../../services/productService";

const STATUSES = [{
    value: 'active',
    text: 'Active'  
  }, {
    value: 'expired',
    text: 'Expired'
  }, {
    value: 'pending',
    text: 'Pending'
  }
];
class Promotion extends Component {
  constructor(context) {
    super(context);
    this.state = {
      promotionId: this.props.match.params.id,
      promotion: {},
      isNewEntity: false,
      loading: false,
      shoppingList: {}
    };
  }
  componentDidMount() {
    this.updateStatePromotion();
    this.updateStateProducts();
  }
  updateStatePromotion() {
    const { promotionId } = this.state;
    if (promotionId === "new") {
      this.setState({ isNewEntity: true });
    } else {
      this.getPromotion();
      this.getShoppingList();
    }
  }
  updateStateProducts() {
    productService.query().then(products => {
      this.setState({
        products
      });
    });
  }
  getPromotion() {
    const { promotionId } = this.state;
    this.setState({ loading: true });
    promotionService
      .getItem(promotionId)
      .then(res => {
        this.setState({ promotion: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  getShoppingList() {
    shoppingListService.query().then(list => {
      this.setState({ shoppingList: list[0] });
    });
  }

  updateField = (name, value) => {
    const { promotion } = this.state;
    promotion[name] = value;
    this.setState({ promotion });
  };

  saveItem = () => {
    const { promotionId, promotion } = this.state;
    let savePromise;
    if (promotionId === "new") {
      savePromise = promotionService.addItem([promotion]);
    } else {
      savePromise = promotionService.updateItem(promotionId, promotion);
    }
    savePromise.then(
      res => {
        this.props.history.goBack();
      },
      err => alert(err)
    );
  };

  deleteItem = () => {
    const { promotionId } = this.state;
    promotionService.deleteItem(promotionId)
      .then(() => {
        this.props.history.goBack();
      })
      .messages({delete: `Successfully deleted ${promotionId}`});
  };

  addItemToList = () => {
    const { promotion, shoppingList } = this.state;

    shoppingListService.addPromotionToList(shoppingList._id, promotion);
  };

  render() {
    const { promotion } = this.state;
    /* Add all of the properties, labels and loading state*/
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Promotion {promotion.name}</h3>
          <EntityMenu
            saveItem={this.saveItem}
            deleteItem={this.deleteItem}
            entity={promotion}
            {...this.props}
          >
            <Button
              onClick={this.addItemToList}
              className="btn-sm entity-menu-button"
              color="primary"
            >
              Add Item To List
            </Button>
          </EntityMenu>
        </div>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="Text"
                    value={promotion.name}
                    onChange={event =>
                      this.updateField("name", event.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={promotion.price}
                    onChange={event =>
                      this.updateField("price", event.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="product">Product</Label>
                  <Dropdown
                    items={this.state.products}
                    valueField="_id"
                    text="name"
                    valueKey="_id"
                    onChange={selectedItem => {
                        this.updateField("product", selectedItem._id)
                      }
                    }
                    placeholder="Select Main Product"
                    value={promotion.product}
                  ></Dropdown>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="period">Period</Label>
                  <div>
                    <DatePeriodPicker
                      startDate={promotion.startDate}
                      endDate={promotion.endDate}
                      onStartChange={selectedDate =>
                        this.updateField("startDate", selectedDate)
                      }
                      onEndChange={selectedDate =>
                        this.updateField("endDate", selectedDate)
                      }
                    ></DatePeriodPicker>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label>Status</Label>
                  <Dropdown
                    items={STATUSES}
                    valueField="value"
                    valueKey="value"
                    text="text"
                    onChange={selectedItem =>
                      this.updateField("status", selectedItem.value)
                    }
                    placeholder="Select Status"
                    value={promotion.status}
                  ></Dropdown>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Promotion;
