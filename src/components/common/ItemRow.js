import React from "react";
import { Link } from 'react-router-dom';

export default class ItemRow extends React.Component {
    render() {
        const {item, entityName} = this.props;
        return (
          <tr key={item._id}>
            <td><Link to={`/${entityName}/${item._id}`}>{item.name}</Link></td>
            <td>{item.createdAt}</td>
            <td>{item._id}</td>
          </tr>
        )
    };
}
