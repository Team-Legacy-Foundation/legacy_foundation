import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';


//QUESTION: Do we need another table to store past admin reports in?
//How will we make sure that the past reports hold all the information needed?
//What we want is the ability for the admin to click on the pay period in question
//amd get presented with a table of all the students' entries for that pay period
class PastAdminReports extends Component {
  render() {

    return (

   
    <div>
      <h1>This will show all the past reports on a table for the admin to see</h1>
    
    <div style={{border:'1px solid black'}}>
       <h2>Past Reports</h2>
      <Table style={{width:'90%', margin:'auto'}}>
          <TableHead>
            <TableRow >
              <TableCell>ID</TableCell>
              <TableCell>Pay Period</TableCell>
              <TableCell>Total amount paid to students</TableCell>
              <TableCell>Print Report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>33</TableCell>
              <TableCell>7/29/20 - 8/12/20</TableCell>
              <TableCell>$2330</TableCell>
              <TableCell><Button variant='contained'>PRINT</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>

    </div>
    </div>
     );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(PastAdminReports));