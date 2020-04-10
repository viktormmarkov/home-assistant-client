import React, { Component } from 'react';

import userService from '../../services/userService';

class User extends Component {
  constructor(context) {
    super(context);
    this.state = {
      userId: this.props.match.params.id,
      user: {},
      loading: false
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    const {userId} = this.state;
    this.setState({loading: true});
    userService.getItem(userId)
      .then(res => {
        this.setState({user: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }
  render() {
    const {user} = this.state
    return (
      <div className="animated fadeIn">
          <h1>User {user.name}</h1>
      </div>
    );
  }
}

export default User;
