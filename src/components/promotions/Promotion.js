import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import promotionService from '../../services/promotionService';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

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

  updateField(name, event) {
    const value = event.target.value;
    const { promotion } = this.state;
    promotion[name] = value;
    this.setState({promotion});
  }

  saveItem = () => {
    const { promotionId, promotion} = this.state;
    let savePromise;
    if (promotionId === 'new') {
      savePromise = promotionService.addItem([promotion])
    } else {
      savePromise = promotionService.updateItem(promotionId, promotion);
    }
    savePromise.then(res => console.log(res), err => alert(err));
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
    const {promotion, loading} = this.state
          /* Add all of the properties, labels and loading state*/

    return (
      <div className="animated fadeIn">
          <h1>Promotion {promotion.name}</h1>
          <Button color="danger" onClick={this.deleteItem}> Delete </Button>
          <Card>
            <CardBody>
              <Input
                type="Text"
                value={promotion.name}
                onChange={this.updateField.bind(this, 'name')}
              />
                <Button onClick={this.saveItem}>
                  Save
                </Button>
            </CardBody>
          </Card>
         
      </div>
    );
  }
}

export default Promotion;
