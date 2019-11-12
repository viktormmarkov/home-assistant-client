import React, { Component } from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import promotionService from '../../services/promotionService';

class Promotions extends Component {
  render() {
    return (
      <EntityListBaseComponent service={promotionService} entityName={'promotions'} {...this.props}/>
    )
  }
}

export default Promotions;
