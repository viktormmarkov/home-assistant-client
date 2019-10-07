import React, { Component } from "react";
import Protected from './Protected'
import Application from './Application';

class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <Protected {...this.props}>
          <Application {...this.props}></Application>
        </Protected>
      </div>
    );
  }
}

export default DefaultLayout;
