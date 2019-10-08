import React, { Component } from 'react';
import { Table } from 'reactstrap';

import userService from '../../services/userService';

function UserRow(props) {
  const user = props.user

  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.createdAt}</td>
      <td>{user._id}</td>
    </tr>
  )
}
class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    this.setState({loading: true});
    userService.query()
      .then(res => {
        this.setState({users: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }
  render() {
    const {users, loading} = this.state
    return (
      <div className="animated fadeIn">
          <h1>Users</h1>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date Created</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
                { users.map((user, index) => 
                    <UserRow key={index} user={user} />) 
                }
              </tbody>
          </Table>
      </div>
    );
  }
}

export default Users;
