import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";


class MakeEntry extends Component {
  render() {
    return <div>
      <h1>This is where students will answer those list of questions</h1>
    </div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(MakeEntry));