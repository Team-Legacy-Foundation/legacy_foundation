import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";

import moment from "moment";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
//import { response } from "express";

class AdminHome extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_STUDENTS",
    });

    this.props.dispatch({
      type: "GET_ADMIN",
    });


    this.props.dispatch({
      type: "FETCH_ENTRIES_FOR_ADMIN",
    });
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
    const columns = [
      {
        name: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <button
                onClick={() => {
                  const studentsArray = this.filterStudentArray(
                    this.props.students
                  );
                  const student = studentsArray[dataIndex];
                  console.log(student);
                  /* a possible refactor:
                    1. Create a function that returns only the filtered students, but its still an array of objects
                    2. Then you pass into the MUITable the result of a function that takes the filtered list and makes
                      an array in the expected format
                    3. then in THIS function use the first array, not the second mapped array. Thus student.id would work
                      instead of student[5]
                  */
                  console.log(`students lcf_id should be: ${student.lcf_id}`); //NOTE: lcf_id could change position
                  //alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)

                  this.props.history.push({
                    pathname: `/updatestudent/${student.lcf_id}`,
                    // state: {lcf_id: student.lcf_id}
                    // pathname:`/updatestudent/${dataIndex}`,
                    // state: {id: dataIndex}
                  }); //this pushes admin to edit page for select student
                  // this.props.dispatch({
                  //   type: "EDIT_STUDENT",
                  //   payload: {
                  //     lcf_id: student.lcf_id,
                  //   },
                  // });


                  this.props.dispatch({
                    type: "GET_STUDENT_FOR_EDIT",
                    payload: student.lcf_id,
                  });
                }}
              >
                Edit
              </button>
            );
          },
        },
      },
      {
        name: "First Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Last Name",
        options: {
          filter: false,
        },
      },
      {
        name: "ID",
        options: {
          filter: true,
        },
      },
      {
        name: "Grade",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "School Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Passing Classes",
        options: {
          filter: true,
        },
      },
      {
        name: "GPA",
        options: {
          filter: true,
        },
      },
      {
        name: "Days Attended",
        options: {
          filter: true,
        },
      },
      {
        name: "Detention",
        options: {
          filter: true,
        },
      },
      {
        name: "Activities or Job",
        options: {
          filter: true,
        },
      },
      {
        name: "Drug Free",
        options: {
          filter: true,
        },
      },
      {
        name: "Service Hours",
        options: {
          filter: true,
        },
      },
      {
        name: "Attended Homeroom",
        options: {
          filter: true,
        },
      },
      {
        name: "Comments",
        options: {
          filter: true,
        },
      },
    ];
    return (
      <div>
        {this.props.user.role === "admin" && (
          <div className="navbuttonscontainer">
            <Link to="/addstudent">
              <Button variant="outline-primary">Add Student</Button>
            </Link>{" "}
          </div>
        )}
        {/*PLEASE NOTE: instead of start date, we want to show latest activity on this table */}
        {/*This will be tied to whenever a student logs in, it will do a put on that column to show thier latest login */}

        {/*Blaine: one option, get rid of filter and map and handle in redux */}
        {/*Do map in redux and store the data for the table in redux */}
        <MUITable
          data={this.getStudentArray(this.props.entries)}
          columns={columns}
          title={"Entry History"}
        />
      </div>
    );
  }

  filterStudentArray = (entries) => {
    return entries.filter(
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

    );
  };


  // this IS A SELECTOR: it takes some state, and it
  // returns some derived state. In other words, if you
  // have students, you can always calculate the array
  // that MUI needs from there.
  getStudentArray = (entries) => {
    const studentsArray = this.filterStudentArray(entries).map(
      (entry, index) => [
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
      ]
    );
    return studentsArray;
  };
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,

  entries: state.students.studententriesadmin

});

export default withRouter(connect(mapStateToProps)(AdminHome));

