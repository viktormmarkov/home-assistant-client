import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import Multiselect from "../common/Multiselect";
import productService from "../../services/productService";
import localeService from "../../services/localeService";
import { Dropdown } from "../common";
import { useGetCategoriesQuery } from "../../stores/CategoryQuery";

export const ProductModal = () => {
  const dispatch = useDispatch();
  const { data: categories = [], isLoading: loading } = useGetCategoriesQuery();
  const [locales, setLocales] = useState([]);
  const [product, setProduct] = useState({});
  const [language, setLanguage] = useState('');
  const [translation, setTranslation] = useState('');

  const confirm = () => {
    productService
      .addItem([product])
      .then(([item]) => {
        dialogClose();
        productLoaded(item);
      })
      .messages({ ok: "Yep", error: "Nope" });
    localeService
      .addTranslationKey(language, { [product.name]: translation })
      .messages({ ok: "Added Locale", error: "Failed to add locale" });
  };

  const dialogClose = () => {
    dispatch({ type: "DIALOG_CLOSE" });
  }

  const productLoaded = (item) => {
    dispatch({ type: "ITEM_SAVED", payload: item, entityType: "product" });
  }

  const updateField = (prop, value) => {
    setProduct({...product, [prop]: value})
  }

  useEffect(() => {
    localeService.query().then((locales) => {
      setLocales(locales);
    });
  }, []);

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
                onChange={(event) =>
                  updateField("name", event.target.value)
                }
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
                onChange={(selected) =>
                  updateField(
                    "categories",
                    _.map(selected, (s) => s.value)
                  )
                }
              ></Multiselect>
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
                onChange={(selectedItem) => {
                  setLanguage(selectedItem._id);
                }}
                placeholder="Select language"
                value={language}
              ></Dropdown>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label htmlFor="key">Key</Label>
              <Input id="key" type="Text" value={product.name} disabled />
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
                onChange={(event) =>
                  setTranslation(event.target.value)
                }
              />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={dialogClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={confirm}>
          Add
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
};