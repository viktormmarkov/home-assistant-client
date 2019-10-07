import React from 'react';
import {Redirect} from 'react-router-dom';
import authenticationService from '../../services/authenticationService';
class Protected extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount() {
    authenticationService.checkToken()
      .then(res => {
        this.setState({...this.state, isLoggedIn: true});
      })
      .catch(err => {
        // alert(`error: ${err}`);
      });
  }

  render() {
    const props = this.props;
    if (this.state.isLoggedIn) {
      return props.children
    } else {
      return null
    }
  }
}

export default Protected;