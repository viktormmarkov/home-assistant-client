import React, { Component } from 'react';
import promotionService from '../../services/promotionService';
import {
  Row,
  FormGroup,
  Label,
  Card,
  CardBody,
  Col,
  Input,
} from 'reactstrap';

import EntityMenu from '../entityMenu/EntityMenu';

class Promotion extends Component {
  constructor(context) {
    super(context);
    this.state = {
      promotionId: this.props.match.params.id,
      promotion: {},
      isNewEntity: false,
      loading: false
    };
  }
  componentDidMount() {
    const { promotionId } = this.state;
    if (promotionId === 'new') {
      this.setState({isNewEntity: true});
    } else {
      this.getPromotion();
    }
  }
  getPromotion() {
    const { promotionId } = this.state;
    this.setState({loading: true});
    promotionService.getItem(promotionId)
      .then(res => {
        this.setState({promotion: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  updateField = (name, value) => {
    const { promotion } = this.state;
    promotion[name] = value;
    this.setState({promotion});
  }

  saveItem = () => {
    const { promotionId, promotion} = this.state;
    let savePromise;
    if (promotionId === 'new') {
      savePromise = promotionService.addItem([promotion]);
    } else {
      savePromise = promotionService.updateItem(promotionId, promotion);
    }
    savePromise.then(res => {
      this.props.history.pop();
    }, err => alert(err));
  }

  deleteItem = () => {
    const { promotionId } = this.state;
    promotionService.deleteItem(promotionId)
      .then(res => console.log(res), err => alert(err))
      .then(res => {
        this.props.history.push('/promotions')
      });
  }

  render() {
    const { promotion } = this.state
    /* Add all of the properties, labels and loading state*/
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Promotion {promotion.name}</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={promotion} {...this.props}/>
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
                    onChange={(event) => this.updateField("name", event.target.value)}
                  />
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
