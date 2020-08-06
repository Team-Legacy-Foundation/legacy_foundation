import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';




class ResetStudentPassword extends Component {
  state = {
    student_id: this.props.user.student_id,
    email: this.props.user.email,
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
     console.log(
       "this is the user",
       this.props.user
     );

    if (
      this.state.student_id &&
      this.state.email &&
      this.state.password &&
      this.state.retype_password &&
      this.state.password === this.state.retype_password
    ) {
      //send the new student to the server through a redux saga
      this.props.dispatch({
        type: "RESET_STUDENT_PASSWORD",
        payload: {
          student_id: this.state.student_id,
          email: this.state.email,
          password: this.state.password,
        },
      });

      this.setState({
        admin_id: this.props.user.student_id,
        email: this.props.user.email,
        password: "",
        retype_password: "",
      });

      
    } else {
      this.props.dispatch({ type: "RESET_ADMIN_PASSWORD_ERROR" });
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
        <div className="navbuttonscontainer">
          <Link to="/home">
            <Button variant="outline-primary">Home</Button>
          </Link>{" "}
        </div>

        <Card
          border="info"
          style={{ width: "95%", margin: "3% auto", padding: "2%" }}
        >
          <h1 style={{ width: "50%", margin: "5% 35%" }}>Reset Student Password</h1>
          <Form className="addstudent">
            <Row>
              <Col>
                <Form.Label>Student Email</Form.Label>
                <Form.Control
                  placeholder="Student Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </Col>
              <Col>
                <Form.Label>New Student Password</Form.Label>
                <Form.Control
                  placeholder="New Student Password"
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </Col>
              <Col>
                <Form.Label>Re-type New Student Password</Form.Label>
                <Form.Control
                  placeholder="Re-type New Student Password"
                  type="text"
                  name="password"
                  value={this.state.retype_password}
                  onChange={this.handleInputChangeFor("retype_password")}
                />
              </Col>
            </Row>

            <Link to="/home">
              <Button
                onClick={(event) => this.resetStudentPassword(event)}
                variant="success"
                type="submit"
                style={{ width: "40%", margin: "7% 30% 2%" }}
              >
                Submit Student Info
              </Button>
            </Link>
          </Form>
        </Card>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  user: state.user,
  
});
   
export default connect(mapStateToProps)(ResetStudentPassword);