import React, {Component}  from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import MUITable from '../MUITable/MUITable';
import moment from "moment";
import { Alert } from "@material-ui/lab";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card';




import Swal from "sweetalert2";



class ChargeStudent extends Component {

  state = {
    lcf_id:null,
    type: null,
    description: null,
    amount: null,
    lcf_id_error: false,
    no_lcf_id_error: false,

  }

componentDidMount () {
      this.props.dispatch({
        type: "GET_STUDENTS",
      });
}

chargeStudent= (event) => {
  event.preventDefault();

//TODO: check in student table to make sure student with lcf_id exists
  if (this.state.lcf_id) {
    //send the updated student to the server through a redux saga

let allStudents = this.props.students;
//   console.log("this.props.student", this.props.students)

for (let student of allStudents) {

  console.log('student ID', student.lcf_id);
  if (Number(this.state.lcf_id) === Number(student.lcf_id)) {

    this.props.dispatch({
      type: "CHARGE_STUDENT",
      payload: {
        lcf_id: this.state.lcf_id,
        admin_id: this.props.user.admin_id, //grabs the id of the admin currently logged in
        date: moment(), //upon successful submission, use current date
        type: this.state.type,
        description: this.state.description,
        amount: this.state.amount
      },
    });
    Swal.fire({
      icon: "Success",
      title: "Activation",
      text: `Student number ${this.state.lcf_id} has been charged`,
    });

    this.props.history.push("/home");
    return;
  }
}

  this.setState({
    lcf_id_error: true,
  })

  setTimeout(() => {
    this.setState({
      lcf_id_error: false,
    });
  }, 5000);
    
  } else {
    this.setState({
      no_lcf_id_error: true,
    })

    setTimeout(() => {
      this.setState({
        no_lcf_id_error: false,
      });
    }, 5000);
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
      <br />
        {this.state.lcf_id_error === true && (
          <Alert className="error" style={{}} severity="error">
            The LCF ID you entered does not exist in the system, try again!
          </Alert>
        )}
        <br/>
          {this.state.no_lcf_id_error === true && (
          <Alert className="error" style={{}} severity="error">
            You have not entered an LCF ID for the student!
          </Alert>
        )}
      <h1 style={{ width: "50%", margin: "2% 35%" }}>
        Charge Student Account
      </h1>
  <Card border = "info" style={{ width: '90%', margin: '3% auto', padding: '2%' }} >
      <Form>
        <Row>
          <Col>
            <Form.Label>LCF ID</Form.Label>
            <Form.Control
              placeholder="LCF ID"
              type="number"
              name="lcf_id"
              value={this.state.lcf_id}
              onChange={this.handleInputChangeFor("lcf_id")}
            />
          </Col>
          <Col>
            <Form.Label>Charge Type</Form.Label>
            <Form.Control
              placeholder="type"
              type="text"
              name="type"
              value={this.state.type}
              onChange={this.handleInputChangeFor("type")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Description"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChangeFor("description")}
            />
          </Col>
          <Col>
            <Form.Label>Charge Amount</Form.Label>
            <Form.Control
              placeholder="Amount"
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleInputChangeFor("amount")}
            />
          </Col>
          </Row>
        <Button
          onClick={(event) => this.chargeStudent(event)}
          variant="success"
          type="submit"
          style={{ width: "40%", margin: "7% 30% 2%" }}
        >
          Create New Charge
        </Button>
      </Form>
      </Card>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
});

export default connect(mapStateToProps)(ChargeStudent);
