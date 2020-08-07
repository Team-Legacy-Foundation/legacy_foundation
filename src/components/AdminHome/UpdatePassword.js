import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import moment from "moment";

class UpdatePassword extends Component {
  state = {
    password: "",
    lcf_id: this.props.students[0] && this.props.students[0].lcf_id,
  };

  componentDidMount() {
    this.props.dispatch({
      type: "GET_STUDENTS",
    });

    this.props.dispatch({
      type: "FETCH_ENTRIES_FOR_ADMIN",
    });
  }

  updatePassword = (event) => {
    event.preventDefault();
    console.log("we are about to send the state", this.state);

    if (this.state.password && this.state.lcf_id) {
      //send the updated student to the server through a redux saga
      this.props.dispatch({
        type: "UPDATE_PASSWORD",
        payload: {
          password: this.state.password,
          lcf_id: this.state.lcf_id,
        },
      });
      this.props.history.push("/home");
    } else {
      this.props.dispatch({ type: "UPDATE_STUDENT_ERROR" });
    }
  }; // end updateStudent

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1 style={{ width: "50%", margin: "2% 40%" }}>
            {JSON.stringify(this.state)}
          Update Student Password
        </h1>
        <Form>
          <Row>
            <Col>
              <Form.Label>Student Password</Form.Label>
              <Form.Control
                placeholder="Student Password"
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </Col>
          </Row>
          <Button
            onClick={(event) => this.updatePassword(event)}
            variant="success"
            type="submit"
            style={{ width: "40%", margin: "7% 30% 2%" }}
          >
            Update Student Password
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
});

export default connect(mapStateToProps)(UpdatePassword);
