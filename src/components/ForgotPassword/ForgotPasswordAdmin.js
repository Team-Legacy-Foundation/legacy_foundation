import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

class ForgotPasswordAdmin extends Component {
  state = {
    lcf_id: "",
    email: "",
    password: "",
    retype_password: "",
  };

  //This function dispatched our newly added admin to the database from state
  //We first validate the inputs to make sure we are not sending empty inputs to the server
  resetAdminPassword = (event) => {
    event.preventDefault();

    console.log(
      "we are about to send the state to change the admin password",
      this.state
    );
    console.log("this is the user", this.props.user);

    if (
      this.state.email &&
      this.state.password &&
      this.state.retype_password &&
      this.state.password === this.state.retype_password
    ) {
      this.props.dispatch({
        type: "FORGOT_ADMIN_PASSWORD",
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });

      this.props.history.push("/home");
    } else {
      this.props.dispatch({ type: "RESET_STUDENT_PASSWORD_ERROR" });
    }
  }; // end resetAdminPassword

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="navbuttonscontainer">
          <Link to="/home">
            <Button variant="outline-primary">Home</Button>
          </Link>{" "}
        </div>

        <Card
          border="info"
          style={{ width: "95%", margin: "3% auto", padding: "2%" }}
        >
          <h1 style={{ width: "50%", margin: "5% 35%" }}>
            Reset Admin Password
          </h1>
          <Form className="addstudent">
            <Row>
              <Col>
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  placeholder="Admin Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </Col>
              <Col>
                <Form.Label>New Admin Password</Form.Label>
                <Form.Control
                  placeholder="New Admin Password"
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </Col>
              <Col>
                <Form.Label>Re-type New Admin Password</Form.Label>
                <Form.Control
                  placeholder="Re-type New Admin Password"
                  type="text"
                  name="password"
                  value={this.state.retype_password}
                  onChange={this.handleInputChangeFor("retype_password")}
                />
              </Col>
            </Row>

            <Link to="/home">
              <Button
                onClick={(event) => this.resetAdminPassword(event)}
                variant="success"
                type="submit"
                style={{ width: "40%", margin: "7% 30% 2%" }}
              >
                Submit Admin Info
              </Button>
            </Link>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ForgotPasswordAdmin);
