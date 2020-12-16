import React, { Component } from 'react';

import userService from '../../services/userService';
import { Button } from 'reactstrap';

class User extends Component {
  constructor(context) {
    super(context);
    this.state = {
      userId: this.props.match.params.id,
      user: {},
      loading: false,
      selectedFile: null
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
  uploadImage = () => {
    const formData = new FormData;
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
    return userService.saveProfilePicture(formData).then(data => {
      console.log(data);
    })
  }
  fileSelectedChanged = () => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  render() {
    const {user} = this.state
    return (
      <div className="animated fadeIn">
          <h1>User {user.name}</h1>
          <img src={user.profilePicture}>
          </img>
          <input type="file" accept="image/*" onChange={this.fileSelectedChanged}></input>
         
          <Button onClick={this.uploadImage} className="btn-sm" color="primary">
            Upload
          </Button>
      </div>
    );
  }
}

export default User;
