import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MUITable from '../MUITable/MUITable';
import moment from "moment";
import InfoIcon from '@material-ui/icons/Info';
import FilterListIcon from '@material-ui/icons/FilterList';

//QUESTION: Do we need another table to store past admin reports in?
//How will we make sure that the past reports hold all the information needed?
//What we want is the ability for the admin to click on the pay period in question
//amd get presented with a table of all the students' entries for that pay period
class PastAdminReports extends Component {

  componentDidMount() {
    
    this.props.dispatch({
      type: "FETCH_HISTORY",
    });
  }

  render() {

    return (

   
   
       <div style={{padding: '2%'}}>
      <center><h1 >Past Reports</h1></center>
      
      <div id='tooltip'>
      <InfoIcon></InfoIcon>
      <span id='tooltiptext'>
      Wanting to look at entries from a specific Pay Period? Click the <FilterListIcon></FilterListIcon>
      Filter List Icon and filter entries by Pay Day. Just select the date you want to look at!
      </span></div>
      
     
     <MUITable
     
            data={this.props.history
            .map((item) => [
                item.lcf_id,
                item.first_name,
                item.last_name,

                moment.utc(item.pay_day).format('L'),
                moment.utc(item.date_submitted).format('L'),

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
              "Attendance Payment",
              "PIF Donation Amount",
              "Bonus Amount",
              "Bonus Comments",
              "GPA Bonus",
              "Amount to Savings",
              "Money to Student",
              "Student Debt",
              "Student Debt Payment",
              "Student Debt Remaining",
              "Total",
              
            ]}
            //title={"Past Reports"}
          />
      
      <br/>
      <br/>
         
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