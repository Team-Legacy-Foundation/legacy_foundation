import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";


class AdminHome extends Component {
  render() {
    return (
      <div>
        <h2>LCF Student List</h2>
        <div style={{fontSize: 40,}}>Table placeholder</div>
        <button>Run report placeholder</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(AdminHome));
