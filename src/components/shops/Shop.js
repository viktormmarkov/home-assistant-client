import React, { useEffect, useState } from "react";
import shopService from "../../services/shopService";
import EntityMenu from "../common/EntityMenu";
import { useHistory } from "react-router-dom";
import { Row, FormGroup, Label, Card, CardBody, Col, Input } from "reactstrap";

const useFetchItemEffect = (id, service, defaultData) => {
  const [item, setItem] = useState(defaultData);
  const handleItemReceived = (response) => {
    setItem(response.data);
  };
  useEffect(() => {
    if (id === "new") return;
    service.getItem(id).then(handleItemReceived);
  }, [id]);
  return [item, setItem];
};

const saveItemHook = (id, item, entityService) => {
  const history = useHistory();
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

const deleteItemHook = (id, entityService) => {
  const history = useHistory();
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

export const Shop = (props) => {
  const defaultData = {
    name: "",
  };
  const id = props.match.params.id;
  const [item, setItem] = useFetchItemEffect(id, shopService, defaultData);
  const deleteItem = deleteItemHook(id, shopService);
  const saveItem = saveItemHook(id, item, shopService);

  return (
    <div>
      <h1>Functional component</h1>
      <div className="section-header">
        <h3 className="inline">Shop {item.name}</h3>
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
                  value={item.name}
                  onChange={(e) => {
                    setItem({ ...item, name: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};