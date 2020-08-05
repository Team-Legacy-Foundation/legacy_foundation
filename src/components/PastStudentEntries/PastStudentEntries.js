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
import './PastStudentEntries.css';
import EntryItem from '../PastEntriesItem/PastEntriesItem';
import Paper from "@material-ui/core/Paper";

class PastStudentEntries extends Component {
  componentDidMount() {
    //fetches music list from database on mount
    this.props.dispatch({ type: "FETCH_ENTRY" });
  }
  render() {
    const gunnarStyle = { minHeight: "500px", minWidth: "150px", textAlign:'center' };
    
    if (this.props.entry.entryList.length ===0 ){ //conditional rendering to handle case of no entries for student
      return (
        <Paper elevation={5} style={{margin:'5%', padding:'5%', textAlign:'center'}}>
          <h2>It looks like you don't have any past entries! Check back once you've made one</h2>
        </Paper>
      )

    } else {
    return (
      <div style={{margin:'5%'}}>
      <center>
        <h4>Scroll along the table to review past entries</h4>
      </center>
      <Paper elevation={5}
        style={{
          
          height: "100%",
          overflow: "scroll",
          
          border: "",
          
        }}
      >
        
        <Table style={{margin:'1%',}}>
          <TableHead>
            <TableRow style={gunnarStyle}>
              <TableCell
                style={gunnarStyle}
                
              >
                Entry ID
              </TableCell>
              <TableCell style={gunnarStyle}>Pay Day</TableCell>
              <TableCell style={gunnarStyle}>Passing All Classes?</TableCell>
              <TableCell style={gunnarStyle}>GPA</TableCell>
              <TableCell style={gunnarStyle}>
                How many days of clean attendance?
              </TableCell>
              <TableCell style={gunnarStyle}>Detention Hours?</TableCell>
              <TableCell style={gunnarStyle}>School Activity or Job?</TableCell>
              <TableCell style={gunnarStyle}>Drug Free Lifestyle?</TableCell>
              <TableCell style={gunnarStyle}>
                How many Service Hours this pay period?
              </TableCell>
              <TableCell style={gunnarStyle}>
                Did you attend homeroom?
              </TableCell>
              <TableCell style={gunnarStyle}>Comments</TableCell>
              <TableCell style={gunnarStyle}>Strikes</TableCell>
              <TableCell style={gunnarStyle}>Inactive?</TableCell>
              
              <TableCell style={gunnarStyle}>New Charges</TableCell>
              <TableCell style={gunnarStyle}>Reason for Charge</TableCell>
              <TableCell style={gunnarStyle}>Balance to be Paid</TableCell>
              <TableCell style={gunnarStyle}>Check this payday?</TableCell>
              <TableCell style={gunnarStyle}>GPA Bonus Amount</TableCell>
              <TableCell style={gunnarStyle}>Total</TableCell>
              <TableCell style={gunnarStyle}>Money to Savings</TableCell>
              <TableCell style={gunnarStyle}>
                Pay It Forward Contributions
              </TableCell>
              <TableCell style={gunnarStyle}>Deduction Amount</TableCell>
              <TableCell style={gunnarStyle}>Deduction Comments</TableCell>
              <TableCell style={gunnarStyle}>Bonus Amount</TableCell>
              <TableCell style={gunnarStyle}>Bonus Comments</TableCell>
              <TableCell style={gunnarStyle}>Money to Student</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {" "}
            {
            this.props.entry.entryList.map((entryItem, index) => {
              // if (index >= this.props.user.id === entryItem.student_id) {
                return <EntryItem key={entryItem.id} entryItem={entryItem} />;
              // }
            })}
          </TableBody>
          
        </Table>
        </Paper>
        <div>Total savings to date:</div>
      </div>
    );}
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entry: state.entry,
});

export default withRouter(connect(mapStateToProps)(PastStudentEntries));
