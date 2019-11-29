import React from "react";

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
      this.setState({ isNewEntity: true });
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
    item[name] = value;
    this.setState({ item });
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
        this.props.history.pop();
      },
      err => alert(err)
    );
  };

  deleteItem = () => {
    const { id } = this.state;
    this.entityService.deleteItem(id).then(
      res => console.log(res),
      err => alert(err)
    );
  };
}

export default EntityBase;
