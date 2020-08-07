import React, {Component}  from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import Button from "react-bootstrap/Button"; //why not button from MUI?
import MUITable from '../MUITable/MUITable';
import moment from "moment";



class StudentEntries extends Component {
  state = {
    redirect: false
  }

componentDidMount () {
  this.props.dispatch({
    type: 'FETCH_ENTRIES_FOR_ADMIN'
  })
}

runReport() {
  this.props.dispatch({type: 'FETCH_CALCULATIONS'})
  this.forceUpdate();
  // this.renderRedirect();
}
renderRedirect = () => {
//this.props.history.push("/opentransactions");
  // if (this.props.calculations.length > 0) {
  //     return  <Redirect to = '/opentransactions'/>
  //   }
    
  }

  render() {


    return(
     
     <div>
     {/* {this.renderRedirect()} */}
      
      {this.props.user.role === 'admin'&&
                    <div className="navbuttonscontainer">
                    <Link to="/adminentryupdate" ><Button variant="outline-primary">Update Student Entry</Button></Link> {' '} 
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
          {/*When clicked, push admin to new page and want calculations to show up on that page */}
        <Button style={{margin:'3%'}} onClick={(event)=>this.runReport(event)}>Run Report</Button> 
      </div>
      
    
        );

  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
  calculations: state.calculations.calculations
});

export default connect(mapStateToProps)(StudentEntries);
