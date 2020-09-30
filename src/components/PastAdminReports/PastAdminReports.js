import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MUITable from '../MUITable/MUITable';
import moment from "moment";
import InfoIcon from '@material-ui/icons/Info';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FilterListIcon from '@material-ui/icons/FilterList';
import Swal from "sweetalert2";

//QUESTION: Do we need another table to store past admin reports in?
//How will we make sure that the past reports hold all the information needed?
//What we want is the ability for the admin to click on the pay period in question
//amd get presented with a table of all the students' entries for that pay period
class PastAdminReports extends Component {
  state = {
    lcf_id: "",
  };
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_HISTORY",
    });
  }

  checkTrip = (event) => {
    event.preventDefault();
    let counter = 0;
    let totalMaps = 0;
    this.props.history.map((item, index) => {
      if (item.lcf_id === Number(this.state.lcf_id)) {
        if (item.attend_payment != "0.00") {
          counter++;
          console.log("counter", counter);
        }
        totalMaps++;
      }

      console.log("totalMaps", totalMaps);
      console.log("calc", counter / totalMaps);
    });
    if (counter / totalMaps < 0.8) {
      Swal.fire("This student is not eligible for a trip");
  
    } else {
      Swal.fire("this student is eligible for a trip");

    }
  };
  render() {
    return (
      <div style={{ padding: "2%" }}>
        <center>
          <h1>Past Reports</h1>
        </center>
        <div id="tooltip">
          <InfoIcon></InfoIcon>
          <span id="tooltiptext">
            Wanting to look at entries from a specific Pay Period? Click the{" "}
            <FilterListIcon></FilterListIcon>
            Filter List Icon and filter entries by Pay Day. Just select the date
            you want to look at!
          </span>
        </div>
        <Form>
          <center>
            <Form.Label>Trip Eligibility</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) =>
                this.setState({ lcf_id: event.target.value })
              }
            >
              <option value="">Pick From Below </option>{" "}
              {this.props.students
                ? this.props.students.map((student) => (
                    <option key={student.lcf_id} value={student.lcf_id}>
                      {" "}
                      {student.first_name}&nbsp; {student.last_name}&nbsp;{" "}
                    </option>
                  ))
                : ""}
            </Form.Control>
          </center>
          <center>
            <Button
              onClick={(event) => this.checkTrip(event)}
              variant="success"
              type="submit"
              style={{ width: "20%", margin: "2%" }}
            >
              Check Trip Eligibility
            </Button>
          </center>
        </Form>
        <MUITable
          data={this.props.history.map((item) => [
            item.lcf_id,
            item.first_name,
            item.last_name,

            moment.utc(item.pay_day).format("L"),
            moment.utc(item.date_submitted).format("L"),

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
            item.description,
            item.total,
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
            "Student Debt Description",
            "Total",
          ]}
          //title={"Past Reports"}
        />
        <MUITable
          data={this.props.students.map((item) => [
            item.lcf_id,
            item.first_name,
            item.last_name,
          ])}
          columns={["LCF ID", "First Name", "Last Name"]}
          //title={"Past Reports"}
        />
        <br />
        <br />
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