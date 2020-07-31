import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import StudentListItem from '../StudentListItem/StudentListItem';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//This page displays a list of the students currently part of the LCF organization
//TODO: Add ability to click on column category and organize by ASC/DESC
//So if click "First Name", organize alphabetically and second click puts z first
//If click by :Graduation Year", organize by closest year and second click shows furthest year
class AdminHome extends Component {
  render() {
    return (
      <div style={{border:'1px solid black'}}>
        <h2>LCF Student List</h2>
        <h4>Pay Period for the week of: INSERT DATES HERE</h4>
        <div style={{border:'1px solid black',width:'20%', float:'right'}}>
        <SearchIcon></SearchIcon>
        <TextField placeholder='Search Students'></TextField>
        </div>
        <Table style={{width:'90%', margin:'auto'}}>
          
          <TableHead style={{color:'blue'}}>
            <TableRow >
              <TableCell>LCF ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>School Name</TableCell>
              <TableCell>Graduation Year</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell>Payment this Period</TableCell>
              <TableCell>Edit Student Account</TableCell>
              <TableCell>Delete Student</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* {students.map((student, index) => {
                return(
                  <StudentListItem
                  key = {`student-list-${index}`}
                  student={student}
                  />
                )
              })} */}
              <TableCell>58011</TableCell>
              <TableCell>Abby</TableCell>
              <TableCell>Adams</TableCell>
              <TableCell>Hard Knocks</TableCell>
              <TableCell>2021</TableCell>
              <TableCell>abby@anywhere.com</TableCell>
              <TableCell>July 30, 2020 at 9:30am</TableCell>
              <TableCell>$0.00</TableCell>
              <TableCell><Button variant='contained'><EditIcon></EditIcon></Button></TableCell>
              <TableCell><Button variant='contained'><HighlightOffIcon></HighlightOffIcon></Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h3 style={{textAlign:'center'}}>Total to pay this week: AMOUNT HERE</h3>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  // students: state.students,
});

export default withRouter(connect(mapStateToProps)(AdminHome));
