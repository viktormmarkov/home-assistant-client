import _ from 'lodash';
import React from 'react';
import { Button, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  FormGroup, 
  Label, 
  Row, 
  Col, 
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import Multiselect from "../common/Multiselect";
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: 'Product Name'
      },
      categories: []
    }
  }
  componentDidMount = () => {
    categoryService.query().then(categories => this.setState({categories}));
  }
  updateField = (key, value) => {
    this.setState({product: {...this.state.product, [key]: value}});
  }
  confirm = () => {
    const {product} = this.state;
    productService.addItem([product])
      .then(([item]) => {
        this.props.dialogClose();
        this.props.productLoaded(item);
      })
      .messages({ok: 'Yep', error: 'Nope'})
  }
  render () {
    const {dialogClose} = this.props;
    const {product, categories} = this.state;
    return (
      <React.Fragment>
        <ModalHeader>Add Product</ModalHeader>
        <ModalBody>
          <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="Text"
                    value={product.name}
                    onChange={(event) => this.updateField('name', event.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="category">Categories</Label>
                  <Multiselect
                    options={categories}
                    value={product.categories}
                    onChange={(selected) => this.updateField('categories', _.map(selected, s => s.value))}
                  >
                  </Multiselect>
                </FormGroup>
              </Col>
            </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={dialogClose}>Cancel</Button>
          <Button color="primary" onClick={this.confirm}>Add</Button>
        </ModalFooter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  params: state.dialog.params,
})

const mapDispatchToProps = dispatch => ({
  dialogClose: () => {dispatch({type: 'DIALOG_CLOSE'})},
  productLoaded: (item) => {dispatch({type: 'ITEM_SAVED', payload: item, entityType: 'product'})}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);