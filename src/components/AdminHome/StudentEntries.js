import React, {Component}  from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import MUITable from '../MUITable/MUITable';
import moment from "moment";



class StudentEntries extends Component {

componentDidMount () {
  this.props.dispatch({
    type: 'FETCH_ENTRIES_FOR_ADMIN'
  })
}

  render() {

  
    return(
     
     <div>
     
      <h1>Hello there {this.props.user.email}, you are a(n) {this.props.user.role}!</h1>
      {this.props.user.role === 'admin'&&
                    <div className="navbuttonscontainer">
                    <Link to="/addstudent"><Button variant="outline-primary">Add Student</Button></Link> {' '} 
                    <Link to="/updatestudent"><Button  variant="outline-primary">Update Student</Button></Link> {' '}
                    </div>}
                    
         
      
{/*PLEASE NOTE: instead of start date, we want tos how latest activity on this table */}
{/*This will be tied to whenever a student logs in, it will do a put on that column to show thier latest login */}
     <MUITable
            data={this.props.entries
              .filter(
                (entry) =>
                    entry.first_name&&
                    entry.last_name&&
                    entry.lcf_id &&
                    // moment(entry.pay_day).format("MMMM Do YYYY") &&
                    // moment(entry.date_submitted).format("MMMM Do YYYY") &&
                    entry.grade&&
                    entry.school_attend &&
                    entry.pass_class&&
                    entry.gpa&&
                    entry.clean_attend&&
                    entry.detent_hours&&
                    entry.act_or_job&&
                    entry.passed_ua&&
                    entry.current_service_hours&&
                    entry.hw_rm_attended&&
                    entry.comments
              )
              .map((entry) => [
                    entry.first_name,
                    entry.last_name,
                    entry.lcf_id,
                    // moment(entry.pay_day).format("MMMM Do YYYY"),
                    // moment(entry.date_submitted).format("MMMM Do YYYY"),
                    entry.grade,
                    entry.school_attend,
                    entry.pass_class,
                    entry.gpa,
                    entry.clean_attend,
                    entry.detent_hours,
                    entry.act_or_job,
                    entry.passed_ua,
                    entry.current_service_hours,
                    entry.hw_rm_attended,
                    entry.comments
              ])}
            columns={[
              "First Name",
              "Last Name",
              "LCF ID:",
            //   "Pay Day",
            //   "Day Submited",
              "Grade",
              "School Name",
              "Class Pass",
              "GPA",
             "Clean Attendance",
              "Detention Hours",
              "After School Activities",
              "UA Results",
              "Service Hrs",
              "HWK Room",
              "Comments"

              
            ]}
            title={"LCF Student Entry List"}
          />
        
      </div>
      
    
        );

  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
});

export default connect(mapStateToProps)(StudentEntries);
