import React, {Component}  from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import MUITable from '../MUITable/MUITable';
import moment from "moment";



class AdminHome extends Component {

componentWillMount () {
  this.props.dispatch({
    type: 'GET_STUDENTS'
  })
}

  render() {

  
    return(
     
     <div>
     
      <h1>Hello there {this.props.user.email}, you are a(n) {this.props.user.role}!</h1>
      {this.props.user.role === 'admin'&&
                    <div className="navbuttonscontainer">
                    <Link to="/addstudent"><Button variant="outline-primary">Add Student</Button></Link> {' '} 
                    <Link to="/addstudent"><Button  variant="outline-primary">Update Student</Button></Link> {' '}
                    </div>}
                    
         
      

     <MUITable
            data={this.props.students
              .filter(
                (entry) =>
                    entry.first_name&&
                    entry.last_name&&
                    entry.grade&&
                    entry.grad_year&&
                    entry.school_attend&&
                    entry.lcf_id&&
                    moment(entry.lcf_start_date).format("MMMM Do YYYY")&&
                    entry.student_email&&
                    entry.password&&
                    entry.pif_amount
              )
              .map((entry) => [
                 entry.first_name,
                 entry.last_name,
                 entry.grade,
                 entry.grad_year,
                 entry.school_attend,
                 entry.lcf_id,
                 moment(entry.lcf_start_date).format("MMMM Do YYYY"),
                 entry.student_email,
                 entry.password,
                 entry.pif_amount
              ])}
            columns={[
              "First Name",
              "Last Name",
              "Grade",
              "Graduation Year",
              "School Name",
              "LCF ID:",
              "LCF Start Date",
              "Student Email",
              "Student PIF Amount ($)"
            ]}
            title={"LCF Student List"}
          />
        
      </div>
      
    
        );

  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
});

export default connect(mapStateToProps)(AdminHome);
