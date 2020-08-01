import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import Button from "react-bootstrap/Button";
// import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from "moment";



class AddStudent extends Component {

      state = {
    first_name: '',
    last_name: '',
    grade: '',
    grad_year: '',
    school_attend: '',
    lcf_id: '',
    lcf_start_date: '',
    student_email: '',
    password: '',
    pif_amount: '',
    created_at: moment.utc().format()
      }

//This function dispatched our newly added student to the database from state
//We first validate the inputs to make sure we are not sending empty inputs to the server
      registerStudent = (event) => {
    event.preventDefault();

    console.log( 'we are about to send the state', this.state);

    if (this.state.first_name&&
        this.state.last_name&&
        this.state.grade&&
        this.state.grad_year&&
        this.state.school_attend&&
        this.state.lcf_id&&
        this.state.lcf_start_date&&
        this.state.student_email&&
        this.state.password&&
        this.state.pif_amount
        ) {

        

//send the new student to the server through a redux saga
      this.props.dispatch({
        type: 'REGISTER_STUDENT',
        payload: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            grade: this.state.grade,
            grad_year: this.state.grad_year,
            school_attend: this.state.school_attend,
            lcf_id: this.state.lcf_id,
            lcf_start_date: this.state.lcf_start_date,
            student_email: this.state.student_email,
            password: this.state.password,
            pif_amount: this.state.pif_amount,
            created_at: this.state.created_at
        },
      });


      this.setState({
            first_name: '',
            last_name: '',
            grade: '',
            grad_year: '',
            school_attend: '',
            lcf_id: '',
            lcf_start_date: '',
            student_email: '',
            password: '',
            pif_amount: ''
        });
    } else {
      this.props.dispatch({type: 'ADD_STUDENT_ERROR'});
    }
  } // end registerStudent



//   updateStudent = (event) => {
//     event.preventDefault();

//     console.log( 'we are about to send the state', this.state);

//     if (this.state.first_name &&
//         this.state.last_name &&
//         this.state.grade &&
//         this.state.grad_year &&
//         this.state.school_attend &&
//         this.state.lcf_id &&
//         this.state.lcf_start_date &&
//         this.state.student_email &&
//         this.state.password &&
//         this.state.pif_amount
//         ) {

        

// //send the updated student to the server through a redux saga
//       this.props.dispatch({
//           type: 'UPDATE_STUDENT',
//           payload: {
//               first_name: this.state.first_name,
//               last_name: this.state.last_name,
//               grade: this.state.grade,
//               grad_year: this.state.grad_year,
//               school_attend: this.state.school_attend,
//               lcf_id: this.state.lcf_id,
//               lcf_start_date: this.state.lcf_start_date,
//               student_email: this.state.student_email,
//               password: this.state.password,
//               pif_amount: this.state.pif_amount
//           },
//       });

//         this.setState({
//             first_name: '',
//             last_name: '',
//             grade: '',
//             grad_year: '',
//             school_attend: '',
//             lcf_id: '',
//             lcf_start_date: '',
//             student_email: '',
//             password: '',
//             pif_amount: ''
//         });

     
//     } else {
//       this.props.dispatch({type: 'UPDATE_STUDENT_ERROR'});
//     }
//   } // end updateStudent



//This function handles storing input values into state on change
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

    render () {
      return (
        
      <div>
          <div className="navbuttonscontainer">
                    <Link to="/home"><Button variant="outline-primary">Home</Button></Link> {' '} 
                    </div>

       <h1 style={{   width: '50%', margin: '2% 40%' }}>Student Information</h1>
       
        
      {/* <Card border = "info" style={{ width: '90%', margin: '3% auto' }} > */}
      <Form className="addstudent" >  
          <Row>
            <Col>
            <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="First Name" type="text" name="first_name" value={this.state.first_name} onChange={this.handleInputChangeFor('first_name')}/>
            </Col>

            <Col>
             <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last Name" type="text" name="last_name" value={this.state.last_name} onChange={this.handleInputChangeFor('last_name')}/>
            </Col>
          </Row>
          <Row>
            <Col>
                <Form.Label>Grade</Form.Label>
                <Form.Control as="select" onChange={(event)=>this.setState({grade: event.target.value})}>
                     <option value="">Pick From Below</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                 </Form.Control>
            </Col>
              <Col>
              <Form.Label>Graduation Year</Form.Label>
             <Form.Control placeholder="Enter Graduation Year" type="number" name="grad_year}" value={this.state.grad_year} onChange={this.handleInputChangeFor('grad_year')}/>
            </Col>
            <Col>
                <Form.Label>School Name</Form.Label>
                <Form.Control placeholder="School Name" type="text" name="school_attend" value={this.state.school_attend} onChange={this.handleInputChangeFor('school_attend')}/>
            </Col>
          </Row>
            <Row>
                <Col>
               <Form.Label>LCF ID:</Form.Label>
                <Form.Control placeholder="Enter LCF ID" type="text" name="lcf_id" value={this.state.lcf_id} onChange={this.handleInputChangeFor('lcf_id')}/>
              </Col>
              <Col>
              <Form.Label>LCF Start Date</Form.Label>
              <Form.Control placeholder="LCF Start Date" type="date" name="lcf_start_date" value={this.state.lcf_start_date} onChange={this.handleInputChangeFor('lcf_start_date')}/>
            </Col>
            <Col>
              <Form.Label>PIF Contribution</Form.Label>
                <Form.Control placeholder="PIF Contribution" type="text" name="pif_amount" value={this.state.pif_amount} onChange={this.handleInputChangeFor('pif_amount')}/>
              </Col>
            </Row>
            <Row>
             <Col>
               <Form.Label>Student Email</Form.Label>
                <Form.Control placeholder="Student Email" type="email" name="student_email" value={this.state.student_email} onChange={this.handleInputChangeFor('student_email')}/>
              </Col>
              <Col>
               <Form.Label>Student Password</Form.Label>
                <Form.Control placeholder="Student Password" type="text" name="password" value={this.state.password} onChange={this.handleInputChangeFor('password')}/>
              </Col>
            </Row>

            <Link to="/home"><Button onClick={(event)=>this.registerStudent(event)} variant="success" type="submit" style={{ width: '40%', margin: '7% 30% 2%' }}>
            Submit Student Info
          </Button></Link> 
        </Form>
      {/* </Card> */}
      </div>


      );
    }
}



const mapStateToProps = state => ({
  user: state.user,
});
   
export default connect(mapStateToProps) (AddStudent);