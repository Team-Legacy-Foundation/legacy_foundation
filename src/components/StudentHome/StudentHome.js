import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class StudentHome extends Component {
  render() {
    return <div>
      <h1>Hello there {this.props.user.email}, you are a(n) {this.props.user.role}!</h1>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(StudentHome));
