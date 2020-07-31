import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import './PastStudentEntries.css'

class PastStudentEntries extends Component {
  render() {
    const gunnarStyle ={minHeight: '500px', minWidth:'100px'}
    return (
      <div style={{ width: "90%", height:'100%', overflow: "scroll", margin: "auto", border:'1px solid black'}}>
        <Table style={{}}>
          <TableHead >
            <TableRow style={gunnarStyle}>
              <TableCell style={gunnarStyle} style={{border:'1px solid black'}} >Entry ID</TableCell>
              <TableCell style={gunnarStyle}>Pay Day</TableCell>
              <TableCell style={gunnarStyle}>Passing All Classes?</TableCell>
              <TableCell style={gunnarStyle}>GPA</TableCell>
              <TableCell style={gunnarStyle}>How many days of clean attendance?</TableCell>
              <TableCell style={gunnarStyle}>Detention Hours?</TableCell>
              <TableCell style={gunnarStyle}>School Activity or Job?</TableCell>
              <TableCell style={gunnarStyle}>Drug Free Lifestyle?</TableCell>
              <TableCell style={gunnarStyle}>How many Service Hours this pay period?</TableCell>
              <TableCell style={gunnarStyle}>Did you attend homeroom?</TableCell>
              <TableCell style={gunnarStyle}>Strikes</TableCell>
              <TableCell style={gunnarStyle}>Inactive?</TableCell>
              <TableCell style={gunnarStyle}>Comments</TableCell>
              <TableCell style={gunnarStyle}>New Charges</TableCell>
              <TableCell style={gunnarStyle}>Reason for Charge</TableCell>
              <TableCell style={gunnarStyle}>Balance to be Paid</TableCell>
              <TableCell style={gunnarStyle}>Check this payday?</TableCell>
              <TableCell style={gunnarStyle}>GPA Bonus Amount</TableCell>
              <TableCell style={gunnarStyle}>Total</TableCell>
              <TableCell style={gunnarStyle}>$ to Savings</TableCell>
              <TableCell style={gunnarStyle}>Pay It Forward Contributions</TableCell>
              <TableCell style={gunnarStyle}>Deduction Amount</TableCell>
              <TableCell style={gunnarStyle}>Deduction Comments</TableCell>
              <TableCell style={gunnarStyle}>Bonus Amount</TableCell>
              <TableCell style={gunnarStyle}>Bonus Comments</TableCell>
              <TableCell style={gunnarStyle}>Money to Student</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(PastStudentEntries));
