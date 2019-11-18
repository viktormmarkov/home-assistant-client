import React from "react";
import { Button } from "reactstrap";

export default class EntityMenu extends React.Component {
    render() {
        const {saveItem, deleteItem, entity} = this.props;
        return (
          <div className="entity-menu fright">
             {entity._id && <Button onClick={deleteItem} className="btn-sm entity-menu-button" color="danger">
              Delete
            </Button> }
            <Button onClick={saveItem} className="btn-sm entity-menu-button" color="primary">
              {entity._id ? 'Update' : 'Save'}
            </Button>
            {this.props.children}
          </div>
        );
    };
}
