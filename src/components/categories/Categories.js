
import categoryService from "../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import {categorySlice, listSelector} from '../../stores/CategoryStore'
import React, { useEffect, useState} from "react";
import { Table, Button } from 'reactstrap';
import ItemRow from '../common/ItemRow';
import { capitalize } from 'lodash';
import { useHistory } from "react-router-dom";
import { useGetCategoriesQuery } from "../../stores/CategoryQuery";

const entityName = "categories";

export const Categories = () => {
  const history = useHistory();

  const {data: items = [], isLoading: loading} = useGetCategoriesQuery()

  const addItem = () => {
    history.push(`/${entityName}/add`);
  };

  const getListItem = (item, index) => {
    return <ItemRow key={index} item={item} entityName={entityName} />;
  };

  return (
    <div className="animated fadeIn">
      <div className="section-header">
        <h3 className="inline">
          {capitalize(entityName)}
        </h3>
        <Button
          onClick={addItem}
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
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => getListItem(item, index))}
        </tbody>
      </Table>
    </div>
  );
};

export default Categories;
