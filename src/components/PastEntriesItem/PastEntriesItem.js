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

class PastEntriesItem extends Component {
  render() {
    const gunnarStyle = { textAlign:'center' };
    const {entryItem} = this.props
    return (
      <TableRow>
          <TableCell style={gunnarStyle}>{entryItem.id}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.pay_day}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.pass_class}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.gpa}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.clean_attend}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.detent_hours}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.act_or_job}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.passed_ua}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.current_service_hours}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.hw_rm_attended}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.comments}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.strikes}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.inactive}</TableCell>
          
          <TableCell style={gunnarStyle}>{entryItem.new_charge}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.reason_for_charge}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.balance_to_pay}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.check_this_payday}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.gpa_bonus_amount}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.total}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.amt_to_savings}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.pif_donations}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.deduction_amount}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.deduction_comments}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.bonus_amount}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.bonus_comments}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.money_to_student}</TableCell>
        </TableRow>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entry: state.entry,
});

export default withRouter(connect(mapStateToProps)(PastEntriesItem));
