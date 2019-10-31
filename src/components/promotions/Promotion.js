import React, { Component } from 'react';

import promotionService from '../../services/promotionService';

class Promotion extends Component {
  constructor(context) {
    super(context);
    this.state = {
      promotionId: this.props.match.params.id,
      promotion: {},
      isNewEntity: false,
      loading: false
    };
  }
  componentDidMount() {
    const { promotionId } = this.state;
    if (promotionId === 'new') {
      this.setState({isNewEntity: true});
    } else {
      this.getPromotion();
    }
  }
  getPromotion() {
    const { promotionId } = this.state;
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
          <h1>Promotion {promotion.name}</h1>
      </div>
    );
  }
}

export default Promotion;
