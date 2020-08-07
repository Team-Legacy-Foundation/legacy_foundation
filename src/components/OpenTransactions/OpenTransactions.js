import React, {Component}  from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import MUITable from '../MUITable/MUITable';
import moment from "moment";



class OpenTransactions extends Component {

  

componentDidMount () {
  console.log('this means page is running');
  this.props.dispatch({type: 'FETCH_CALCULATIONS'})
  
  
}

  render() {

    console.log(this.props.calculations)
    
    return(
     
     <div>
     This is where calculations will be shown and when Penny will confirm if things look good
     <MUITable
     
            data={this.props.calculations
            .map((entry) => [
                entry.lcf_id,
                entry.first_name,
                entry.last_name, 
                // moment(entry.pay_day).format("MMMM Do YYYY") &&
                // moment(entry.date_submitted).format("MMMM Do YYYY") &&
                entry.payday,
                entry.date_submitted,
                entry.pass_class,
                entry.gpa,
                entry.clean_attend,
                entry.detent_hours,
                entry.act_or_job,
                entry.passed_ua,
                entry.current_service_hours,
                entry.hw_rm_attended,
                entry.comments,
                entry.attend_payment,
                entry.pif_donations,
                entry.bonus_amount,
                entry.bonus_comments,
                entry.gpa_bonus,
                entry.amt_to_savings,
                entry.money_to_student,
                entry.student_debt,
                entry.student_debt_payment,
                entry.student_debt_remaining,
                entry.total
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
  calculations: state.calculations.calculations
});

export default connect(mapStateToProps)(OpenTransactions);
