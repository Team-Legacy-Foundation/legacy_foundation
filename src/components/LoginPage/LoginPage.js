import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from "../../images/image.png";

import {
  Grid,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    toggle: false,
    toggle2: false,
    error: false,
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }

    this.props.history.push("/home"); //this makes it so whenever a user logs in, they go straight to homepage
  }; // end login

  handleReset = (event) => {
    event.preventDefault();

    if (this.state.username === "") {
      this.setState({
        error: true,
      });

      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      return;
    }

    this.props.dispatch({
      type: "FORGOT_PASSWORD",
      payload: {
        username: this.state.username,
      },
    });
    Swal.fire({
      icon: "info",
      title: "Password Reset",
      text: `Password Reset email sent, please check your email.`,
    });
  };

  handleResetAdmin = (event) => {
    event.preventDefault();
    if (this.state.username === "") {
      this.setState({
        error: true,
      });

      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      return;
    }
    this.props.dispatch({
      type: "FORGOT_PASSWORD_ADMIN",
      payload: {
        username: this.state.username,
      },
    });
    Swal.fire({
      icon: "info",
      title: "Password Reset",
      text: `Password Reset email sent, please check your email.`,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
  };

  render() {
    return (
      <Grid container style={{}}>
        {/* <div style={{border:'1px solid black', display:'inline', float:'left', maxWidth:'50%'}}>
          <img src='https://legacychildrensfoundation.com/wp-content/uploads/2020/03/shapes-bg-color.png' width='100%'/>
        </div> */}

        {/* <div style={{border:'1px solid black', display:'inline', float:'right', width:'50%', padding:0, margin:0, minHeight:'100% !important'}}> */}
        <Grid item xs={12} sm={12} md={5} style={{ display: "block" }}>
          <center>
            {this.state.error === true && (
              <Alert className="error" style={{}} severity="error">
                Please provide your email address
              </Alert>
            )}
            <br />
            <br />
            {this.state.toggle === false ? (
              <>
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
                    <button onClick={this.toggle} className="log-in">
                      Forgot Password
                    </button>
                  </div>
                  {this.props.errors.loginMessage && (
                    <Alert className="loginError" style={{}} severity="error">
                      {this.props.errors.loginMessage}
                    </Alert>
                  )}
                </form>
              </>
            ) : (
              <div>
                {this.state.toggle2 === false ? (
                  <div className="reglogin">
                    <form onSubmit={this.handleReset}>
                      <h1>Student Reset Password</h1>
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
                        <input
                          className="log-in"
                          type="submit"
                          name="submit"
                          value="Reset"
                        />
                      </div>
                      {this.props.errors.loginMessage && (
                        <Alert
                          className="loginError"
                          style={{}}
                          severity="error"
                        >
                          {this.props.errors.loginMessage}
                        </Alert>
                      )}
                    </form>
                    <button onClick={this.toggle} className="log-in">
                      Back To Login
                    </button>
                    <button onClick={this.toggle2} className="log-in">
                      Switch to Admin
                    </button>
                  </div>
                ) : (
                  <div className="reglogin">
                    <form onSubmit={this.handleResetAdmin}>
                      <h1>Admin Reset Password</h1>
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
                        <input
                          className="log-in"
                          type="submit"
                          name="submit"
                          value="Reset"
                        />
                      </div>
                      {this.props.errors.loginMessage && (
                        <Alert
                          className="loginError"
                          style={{}}
                          severity="error"
                        >
                          {this.props.errors.loginMessage}
                        </Alert>
                      )}
                    </form>
                    <button onClick={this.toggle} className="log-in">
                      Back To Login
                    </button>
                    <button onClick={this.toggle2} className="log-in">
                      Switch to Student
                    </button>
                  </div>
                )}
              </div>
            )}
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
