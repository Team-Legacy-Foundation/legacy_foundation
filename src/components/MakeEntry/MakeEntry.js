import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";


class MakeEntry extends Component {

  state = {

  };

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };

  submitInfo = (event) => {
    event.preventDefault();
    //DO DISPATCH HERE
    this.props.history.push("/home");
  };

  render() {


    return <div>
      <h3>This entry is for the week of: PAY PERIOD HERE</h3>
      <form onSubmit={this.submitInfo}>

      </form>
    </div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(MakeEntry));