import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

class UpdatePassword extends Component {
  state = {
    password: "",
   
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

    let url_array=document.location.href.split("/");
    
let id = url_array[url_array.length-1];
    console.log("we are about to send the state",id, this.state);

    if (this.state.password) {
      //send the updated student to the server through a redux saga
      this.props.dispatch({
        type: "UPDATE_PASSWORD",
        payload: {
          password: this.state.password,
          lcf_id: id,
        },
      });
         Swal.fire({
           icon: "Success",
           title: "Activation",
           text: `Student number ${id} password has been reset`,
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
