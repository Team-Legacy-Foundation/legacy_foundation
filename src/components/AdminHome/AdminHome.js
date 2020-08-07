import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import moment from "moment";
import { withRouter } from "react-router";
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

  render() {

    const columns = [
      {
        name: "Deactivate",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            const studentsArray = this.filterStudentArray(this.props.students);
            const student = studentsArray[dataIndex];
            return (
              <div>
                {student.status === "active" ? (
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      const studentsArray = this.filterStudentArray(
                        this.props.students
                      );
                      const student = studentsArray[dataIndex];
                      {
                        //send the updated student to the server through a redux saga
                        this.props.dispatch({
                          type: "DEACTIVATE_STUDENT",
                          payload: {
                            lcf_id: student.lcf_id,
                          },
                        });
                        this.props.dispatch({
                          type: "GET_STUDENTS",
                        });
                      }
                    }}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      const studentsArray = this.filterStudentArray(
                        this.props.students
                      );
                      const student = studentsArray[dataIndex];
                      {
                        //send the updated student to the server through a redux saga
                        this.props.dispatch({
                          type: "ACTIVATE_STUDENT",
                          payload: {
                            lcf_id: student.lcf_id,
                          },
                        });
                        this.props.dispatch({
                          type: "GET_STUDENTS",
                        });
                      }
                    }}
                  >
                    Activate
                  </button>
                )}
              </div>
            );
          },
        },
      },
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
                  // const studentsArray = this.getStudentArray(this.props.students);
                  // const student = studentsArray[dataIndex];
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
                    pathname:`/updatestudent/${student.lcf_id}`,
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
                    type: "GET_STUDENT_FOR_EDIT", payload: student.lcf_id
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
        name: "Reset Password",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <button
                onClick={() => {
                  // const studentsArray = this.getStudentArray(this.props.students);
                  // const student = studentsArray[dataIndex];
                  const studentsArray = this.filterStudentArray(
                    this.props.students
                  );
                  const student = studentsArray[dataIndex];
                  console.log(`students lcf_id should be: ${student.lcf_id}`); //NOTE: lcf_id could change position
                  //alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)

                  this.props.history.push(`/updatepassword/${student.lcf_id}`); //this pushes admin to edit page for select student
                }}
              >
                Reset Password
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
        label: "Last Name",
        name: "Last Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Grade",
        options: {
          filter: false,
        },
      },
      {
        name: "Graduation Year",
        options: {
          filter: true,
        },
      },
      {
        name: "School Name",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "LCF ID",
        options: {
          filter: true,
        },
      },
      {
        name: "LCF Start Date",
        options: {
          filter: true,
        },
      },
      {
        name: "Student Email",
        options: {
          filter: true,
        },
      },
      {
        name: "Student PIF Amount ($)",
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
            <Link to="/updatestudent">
              <Button variant="outline-primary">Update Student</Button>
            </Link>{" "}
          </div>
        )}

        {/*PLEASE NOTE: instead of start date, we want to show latest activity on this table */}
        {/*This will be tied to whenever a student logs in, it will do a put on that column to show thier latest login */}

        {/*Blaine: one option, get rid of filter and map and handle in redux */}
        {/*Do map in redux and store the data for the table in redux */}
        <MUITable
          data={this.getStudentArray(this.props.students)}
          columns={columns}
          title={"LCF Student List"}
        />
      </div>
    );
  }

  filterStudentArray = (students) => {
    return students.filter(
      (entry) =>
        entry.first_name &&
        entry.last_name &&
        entry.grade &&
        entry.grad_year &&
        entry.school_attend &&
        entry.lcf_id &&
        moment(entry.lcf_start_date).format("MMMM Do YYYY") &&
        entry.student_email &&
        entry.password &&
        entry.pif_amount
    );
  };

  // this IS A SELECTOR: it takes some state, and it
  // returns some derived state. In other words, if you
  // have students, you can always calculate the array
  // that MUI needs from there.
  getStudentArray = (students) => {
    const studentsArray = this.filterStudentArray(students).map(
      (entry, index) => [
        entry.first_name, // 0
        entry.last_name, // 1
        Number(entry.grade), // 2
        entry.grad_year, // 3
        entry.school_attend, // 4
        entry.lcf_id, // 5
        moment(entry.lcf_start_date).format("MMMM Do YYYY"), //This will change "last login" at some point
        entry.student_email,
        //entry.password,
        entry.pif_amount,
      ]
    );
    return studentsArray;
  };
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
});

export default withRouter(connect(mapStateToProps)(AdminHome));
