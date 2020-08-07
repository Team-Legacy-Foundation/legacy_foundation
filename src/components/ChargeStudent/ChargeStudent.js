import React, {Component}  from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import MUITable from '../MUITable/MUITable';
import moment from "moment";



class ChargeStudent extends Component {

componentDidMount () {
  
}

  render() {

  
    return(
     
     <div>
     This is where admin will charge students
     INPUT LCF_ID
     INPUT CHARGE AMOUNT
     INPUT CHARGE DESCRIPTION
      
      
        
      </div>
      
    
        );

  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
});

export default connect(mapStateToProps)(ChargeStudent);
