import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import { withRouter } from "react-router";
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

class StudentEntries extends Component {
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

  //does dispatch to run calculations and then GET calculations to display on table
  //(see calculationsSaga.js)
  runReport() {
    this.props.dispatch({ type: "FETCH_CALCULATIONS" });
  }

  redirectPage() {
    if(this.props.redirect.redirect === true){
      return <Redirect to='/opentransactions'/>
    }
  }


  render() { //MUI tables for columns for the table
    const columns = [
      {
        name: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <Button
                variant="warning"
                onClick={() => {
                  const selectedEntry = this.props.entries[dataIndex];
                  this.props.history.push({
                    pathname: `/adminentryupdate/${selectedEntry.id}`
                  });
                }}
              >
                <EditIcon></EditIcon>
              </Button>
            );
          },
        },
      },
      {
        name: "Pay Day",
        options: {
          filter: true,
          sortCompare: (order) => {
            return (a, b) => {
              const amo = moment(a.data, 'M/D/YY');
              const bmo = moment(b.data, 'M/D/YY');
              return amo.diff(bmo, 'day') * (order === 'asc' ? 1 : -1);
            }
          }
        }
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

    const options = {
      rowsPerPage: 50,
      rowsPerPageOptions: [10, 25, 50, 100, 500]
    };

    return (
      <div>
         <Button
          style={{margin:'1%'}}
          variant='success'
          onClick={(event) => this.runReport(event)}
        >
          Run Report
        </Button>
        {this.redirectPage()}
        <div style={{paddingRight:'2%', paddingLeft:'2%', paddingBottom:'6%'}}>
          <MUITable
            options={options}
            data={this.getStudentArray(this.props.entries)}
            columns={columns}
            title={`Current Entries`} />
        </div>
        <br/>
        <br/>

      </div>
    );
  }

  // this IS A SELECTOR: it takes some state, and it
  // returns some derived state. In other words, if you
  // have students, you can always calculate the array
  // that MUI needs from there.
  getStudentArray = (entries) => {
    return entries.map(entry => [
      moment(entry.pay_day).format('M/D/YY'),
      entry.first_name,
      entry.last_name,
      entry.lcf_id,
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
    ]);
  };
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  redirect: state.redirect,
  entries: state.students.studententriesadmin
});

export default withRouter(connect(mapStateToProps)(StudentEntries));
