import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Generates each row of student list
//TODO: Make name clickable and, when clicked, brings admin to page with student's past entries
class StudentListItem extends Component {
  render() {
    const {student} = this.props;
    return 
    // <TableCell>
    //   {student.lcf_id}
    //   {student.first_name}
    //   {student.last_name}
    //   {student.school_attend}
    //   {student.grad_year}
    //   {student.student_email}
    //   {student.last_login} {/*Need to do moment on this? pretty sure */}
    //   PAYMENT THIS PERIOD
    //   <Button variant='contained'><EditIcon></EditIcon></Button>
    //   <Button variant='contained'><HighlightOffIcon></HighlightOffIcon></Button>
    // </TableCell>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(StudentListItem));
