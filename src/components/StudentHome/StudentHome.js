import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class StudentHome extends Component {
  render() {
    return <div>
      <div style={{border:'1px solid black'}}><h1>Hello there {this.props.user.email}, you are a(n) {this.props.user.role}!</h1></div>
      <div style={{border:'1px solid black', float:'left'}}>STRETCH GOAL: This could be a GPA graph</div>
      <div style={{border:'1px solid black', float:'right', width:'20%'}}><h3>Notification Portal</h3>
        Lorem ipsum lorem ipsum lorem ipsum < br/>
         Lorem ipsum lorem ipsum lorem ipsum<br/>
          Lorem ipsum lorem ipsum lorem ipsum<br/>
           Lorem ipsum lorem ipsum lorem ipsum<br/>
            Lorem ipsum lorem ipsum lorem ipsum<br/>
        </div><br/><br/>
        
      <div style={{border:'1px solid black', float:'right', margin: ' 18% -18% 0 0'}}>
        <h3>Payment Information</h3><br/>
        Last Paycheck: AMOUNT<br/>
        Balance to Pay: AMOUNT<br/>
        Total Savings to Date: AMOUNT
      </div>
      <button>Make entry for the week</button>
      <button>Reset Password STRETCH?</button>
    </div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(StudentHome));
