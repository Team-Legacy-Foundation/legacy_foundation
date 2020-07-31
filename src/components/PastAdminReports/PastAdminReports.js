import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";


class PastAdminReports extends Component {
  render() {
    return <div>
      <h1>This will show all the past reports on a table for the admin to see</h1>
    </div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(PastAdminReports));