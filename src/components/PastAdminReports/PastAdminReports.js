import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MUITable from '../MUITable/MUITable';
import moment from "moment";

//QUESTION: Do we need another table to store past admin reports in?
//How will we make sure that the past reports hold all the information needed?
//What we want is the ability for the admin to click on the pay period in question
//amd get presented with a table of all the students' entries for that pay period
class PastAdminReports extends Component {

  componentDidMount() {
    
    this.props.dispatch({
      type: "FETCH_CONFIRM",
    });
  }

  render() {

    return (

   
   
       <div style={{padding: '2%'}}>
     
     
     <MUITable
     
            data={this.props.history
            .map((item) => [
                item.lcf_id,
                item.first_name,
                item.last_name,
                moment.utc(item.pay_day).local().calendar(),
                moment.utc(item.date_submitted).local().calendar(),
                item.pass_class,
                item.gpa,
                item.clean_attend,
                item.detent_hours,
                item.act_or_job,
                item.passed_ua,
                item.current_service_hours,
                item.hw_rm_attended,
                item.comments,
                item.attend_payment,
                item.pif_donations,
                item.bonus_amount,
                item.bonus_comments,
                item.gpa_bonus,
                item.amt_to_savings,
                item.money_to_student,
                item.student_debt,
                item.student_debt_payment,
                item.student_debt_remaining,
                item.total

              ])}
            columns={[
              "LCF ID",
              "First Name",
              "Last Name",
              "Pay Day",
              "Day Submitted",
              "Passing All Classes?",
              "GPA",
              "Clean Attendance",
              "Detention Hours",
              "After School Activities",
              "Drug Free Life?",
              "Service Hrs",
              "Homeroom attended?",
              "Comments",
              "attend_payment",
              "pif_donations",
              "bonus_amount",
              "bonus_comments",
              "GPA Bonus",
              "Amount to Savings",
              "Money to Student",
              "Student Debt",
              "Student Debt Payment",
              "Student Debt Remaining",
              "Total",
              
            ]}
            title={"Past Reports"}
          />
      
      
         
      </div>
    
     );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
  calculations: state.calculations.calculations,
  history: state.history.history
});

export default withRouter(connect(mapStateToProps)(PastAdminReports));