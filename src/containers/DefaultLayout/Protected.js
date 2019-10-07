import React from 'react';
import {Redirect} from 'react-router-dom';
import authenticationService from '../../services/authenticationService';
class Protected extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loading: true
    }
  }
  componentDidMount() {
    authenticationService.checkToken()
      .then(res => {
        this.setState({...this.state, isLoggedIn: true, loading: false});
      })
      .catch(err => {
        this.setState({...this.state, isLoggedIn: false, loading: false});
        // alert(`error: ${err}`);
      });
  }

  render() {
    const props = this.props;
    if (this.state.isLoggedIn) {
      return props.children
    } else if (this.state.loading) {
      return null;
    } else {
      return (<Redirect
        to={{
          pathname: "/login",
          state: {errors: this.state.errors}
        }}
      />)
    }
  }
}

export default Protected;