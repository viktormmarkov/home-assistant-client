
import React, { Component } from 'react';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import preferenceService from '../../services/preferenceService';

class Preferences extends Component {
  render() {
    return (
      <EntityListBaseComponent service={preferenceService} entityName={'preferences'} {...this.props}/>
    )
  }
}

export default Preferences;