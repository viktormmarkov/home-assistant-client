import React from "react";
import * as _ from "lodash";

class EntityBase extends React.Component {
  constructor(context) {
    super(context);
    this.entityService = context.entityService;
    this.state = {
      id: this.props.match.params.id,
      item: {},
      isNewEntity: false,
      loading: false,
    };
  }
  componentDidMount() {
    this.getStateItem();
  }
  getStateItem() {
    const { id } = this.state;
    if (id === "new") {
      this.setState({ isNewEntity: true, item: this.defaultItemData || {}});
    } else {
      this.getItem();
    }
  }
  getItem() {
    const { id } = this.state;
    this.setState({ loading: true });
    this.entityService
      .getItem(id)
      .then(res => {
        this.setState({ item: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  updateField = (name, value) => {
    const { item } = this.state;
    const updated = _.set(item, name, value);
    this.setState({ item: updated });
  };

  saveItem = () => {
    const { id, item } = this.state;
    let savePromise;
    if (id === "new") {
      savePromise = this.entityService.addItem([item]);
    } else {
      savePromise = this.entityService.updateItem(id, item);
    }
    savePromise.then(
      res => {
        this.props.history.goBack();
      },
      err => alert(err)
    );
  };

  deleteItem = () => {
    const { id } = this.state;
    const { history } = this.props;
    this.entityService.deleteItem(id).then(
      res => {
        history.goBack();
      },
      err => alert(err)
    );
  };
}

export default EntityBase;
