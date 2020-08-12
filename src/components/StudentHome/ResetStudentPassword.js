import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

class ResetStudentPassword extends Component {
  state = {
    lcf_id: this.props.user.lcf_id,
    //email: this.props.user.email,
    password: "",
    retype_password: "",
  };

  //This function dispatched our newly added admin to the database from state
  //We first validate the inputs to make sure we are not sending empty inputs to the server
  resetStudentPassword = (event) => {
    event.preventDefault();

    console.log(
      "we are about to send the state to change the student password",
      this.state
    );
    console.log("this is the user", this.props.user);

    if (
      this.state.lcf_id &&
      this.state.password &&
      this.state.retype_password &&
      this.state.password === this.state.retype_password
    ) {
      //send the new student to the server through a redux saga
      this.props.dispatch({
        type: "RESET_STUDENT_PASSWORD",
        payload: {
          lcf_id: this.state.lcf_id,
          //email: this.state.email,
          password: this.state.password,
        },
      });

      this.setState({
        lcf_id: this.props.user.lcf_id,
        //email: this.props.user.email,
        password: "",
        retype_password: "",
      });
    } else {
      this.props.dispatch({ type: "RESET_STUDENT_PASSWORD_ERROR" });
    }
  }; // end resetStudentPassword

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {" "}
        <br />
        <center>
          <h1>Reset Student Password</h1>
        </center>
        <Paper
          elevation={5}
          border="info"
          style={{ width: "70%", margin: "3% auto", padding: "2%" }}
        >
          <Form className="addstudent">
            <Row>
              {/* <Col>
                <Form.Label>Student Email</Form.Label>
                <Form.Control
                  placeholder="Student Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </Col> */}
              <Col>
                <center>
                  <Form.Label>New Student Password</Form.Label>
                  <Form.Control
                    placeholder="New Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor("password")}
                    style={{ width: "60%" }}
                  />
                </center>
              </Col>
              <Col>
                <center>
                  <Form.Label>Re-type New Password</Form.Label>
                  <Form.Control
                    placeholder="Re-type Password"
                    type="password"
                    name="password"
                    value={this.state.retype_password}
                    onChange={this.handleInputChangeFor("retype_password")}
                    style={{ width: "60%" }}
                  />
                </center>
              </Col>
            </Row>
            <center>
              <Link to="/home">
                <Button
                  onClick={(event) => this.resetStudentPassword(event)}
                  variant="success"
                  type="submit"
                  style={{ width: "20%", margin: "1%" }}
                >
                  Update Password
                </Button>
              </Link>
            </center>
          </Form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ResetStudentPassword);
