import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from "../../images/image.png";

import {
  Grid,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }

    this.props.history.push("/home"); //this makes it so whenever a user logs in, they go straight to homepage
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <Grid container style={{}}>
        {/* <div style={{border:'1px solid black', display:'inline', float:'left', maxWidth:'50%'}}>
          <img src='https://legacychildrensfoundation.com/wp-content/uploads/2020/03/shapes-bg-color.png' width='100%'/>
        </div> */}

        {/* <div style={{border:'1px solid black', display:'inline', float:'right', width:'50%', padding:0, margin:0, minHeight:'100% !important'}}> */}
        <Grid item xs={12} sm={12} md={5} style={{ display: "block" }}>
          <center>
            <br />
            <br />
            <form onSubmit={this.login} className="reglogin">
              <h1>Login</h1>
              <br />
              <div>
                <label htmlFor="username">
                  Email: &nbsp; &nbsp; &nbsp;{" "}
                  {/*Creates a blank space, used for lining things up */}
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChangeFor("username")}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  Password: &nbsp;
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor("password")}
                  />
                </label>
              </div>
              <div>
                <input
                  className="log-in"
                  type="submit"
                  name="submit"
                  value="Log In"
                />
              </div>
              {this.props.errors.loginMessage && (
                <Alert className="loginError"
                  style={{
                 
                  }}
                  severity="error"
                >
                  {this.props.errors.loginMessage}
                </Alert>
              )}
            </form>
          </center>
          {/* <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center> */}
        </Grid>
        <Grid item xs={12} sm={12} md={7} style={{ display: "block" }}>
          <img
            id="shapes"
            src="https://legacychildrensfoundation.com/wp-content/uploads/2020/03/shapes-bg-color.png"
          />
        </Grid>
        {/* </div> */}
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
