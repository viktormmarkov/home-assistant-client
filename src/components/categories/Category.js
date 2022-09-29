import React, { useEffect, useState, useCallback } from "react";
import categoryService from "../../services/categoryService";
import EntityMenu from "../common/EntityMenu";
import { useHistory } from "react-router-dom";
import { Row, FormGroup, Label, Card, CardBody, Col, Input } from "reactstrap";
import { useGetCategoryByIdQuery, useAddCategoryMutation, useEditCategoryMutation } from "../../stores/CategoryQuery";

const saveItemHook = (id, item, entityService, history) => {
  console.log(item);
  const saveItem = () => {
    let savePromise;
    if (id === "new") {
      savePromise = entityService.addItem([item]);
    } else {
      savePromise = entityService.updateItem(id, item);
    }
    return savePromise.then(
      () => {
        history.goBack();
      },
      (err) => alert(err)
    );
  };
  return saveItem;
};

const deleteItemHook = (id, entityService, history) => {
  const deleteItem = () => {
    return entityService.deleteItem(id).then(
      () => {
        history.goBack();
      },
      (err) => alert(err)
    );
  };
  return deleteItem;
};

export const Category = (props) => {
  const history = useHistory();

  const defaultData = {
    name: "",
    id: 'new'
  };
  const id = props.match.params.id;

  const { data, error, isLoading } = useGetCategoryByIdQuery(id);
  const [item, setItem] = useState(defaultData);
  const deleteItem = deleteItemHook(id, categoryService, history);

  const [triggerAdd] = useAddCategoryMutation();
  const [triggerEdit] = useEditCategoryMutation();

  useEffect(()=>{
    if (data) {
      setItem(data);
    }
  }, data)

  const saveItem = () => {
    let promise
    if (item.id === 'new') {
      promise = triggerAdd(item);
    } else {
      promise = triggerEdit(item);
    }

    promise.messages({
      ok: 'successfully updated / added'
    }).then(() => {
      history.goBack();
    })
  }

  const changeItem = (e) => {
    setItem({ ...item, name: e.target.value });
  };

  return (
    <div>
      <div className="section-header">
        <h3 className="inline">Categories {item && item.name}</h3>
        <EntityMenu
          saveItem={saveItem}
          deleteItem={deleteItem}
          entity={item}
          {...props}
        />
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
                  value={item && item.name}
                  onChange={changeItem}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
