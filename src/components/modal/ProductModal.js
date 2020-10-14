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
import localeService from '../../services/localeService';
import { Dropdown } from "../common";
import ProductModalDataProvider from "../../dataProviders/ProductModalDataProvider";

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: 'Product Name',
        categories: []
      },
      language: undefined,
      translation: undefined,
    }
    this.provider = new ProductModalDataProvider();
  }
  componentDidMount = () => {
    this.provider.load(this.props);
  }
  updateField = (key, value) => {
    this.setState({product: {...this.state.product, [key]: value}});
  }
  confirm = () => {
    const {product, language, translation} = this.state;
    productService.addItem([product])
      .then(([item]) => {
        this.props.dialogClose();
        this.props.productLoaded(item);
      })
      .messages({ok: 'Yep', error: 'Nope'});
    localeService.addTranslationKey(language, {[product.name]: translation})
      .messages({ok: 'Added Locale', error: 'Failed to add locale'});
  }
  render () {
    const {dialogClose, locales, categories} = this.props;
    const {product, language, translation} = this.state;

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
          <Row>
            <Col>
            <FormGroup>
              <Dropdown
                  items={locales}
                  id="locale"
                  valueField="_id"
                  text="language"
                  valueKey="_id"
                  onChange={selectedItem => {
                    this.setState({language: selectedItem._id})
                  }}
                  placeholder="Select language"
                  value={language}>
              </Dropdown>
            </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  type="Text"
                  value={product.name}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="Text"
                  value={translation}
                  onChange={(event) => this.setState({translation: event.target.value})}
                />
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
  locales: state.locale.list,
  categories: state.category.list
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dialogClose: () => {dispatch({type: 'DIALOG_CLOSE'})},
  productLoaded: (item) => {dispatch({type: 'ITEM_SAVED', payload: item, entityType: 'product'})},
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);