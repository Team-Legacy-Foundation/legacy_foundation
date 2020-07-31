import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';


class PastAdminReports extends Component {
  render() {
    return <div style={{border:'1px solid black'}}>
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
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(PastAdminReports));