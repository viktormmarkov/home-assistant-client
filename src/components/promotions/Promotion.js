import React, { Component } from 'react';

import promotionService from '../../services/promotionService';

class Promotion extends Component {
  constructor(context) {
    super(context);
    this.state = {
      promotionId: this.props.match.params.id,
      promotion: {},
      loading: false
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    const {promotionId} = this.state;
    this.setState({loading: true});
    promotionService.getItem(promotionId)
      .then(res => {
        this.setState({promotion: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }
  render() {
    const {promotion, loading} = this.state
    return (
      <div className="animated fadeIn">
          <h1>User {promotion.name}</h1>
      </div>
    );
  }
}

export default Promotion;
