import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";


class PastStudentEntries extends Component {
  render() {
    return <div>
      <h1>This will show all the past entries by a student on the table</h1>
    </div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(PastStudentEntries));