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
    const gunnarStyle = { minHeight: "500px", minWidth: "100px" };
    const {entryItem} = this.props
    return (
      <TableRow>
          <TableCell>{entryItem.id}</TableCell>
          <TableCell>{entryItem.pay_day}</TableCell>
          <TableCell>{entryItem.pass_class}</TableCell>
          <TableCell>{entryItem.gpa}</TableCell>
          <TableCell>{entryItem.detent_hours}</TableCell>
          <TableCell>{entryItem.act_or_job}</TableCell>
          <TableCell>{entryItem.passed_ua}</TableCell>
          <TableCell>{entryItem.current_service_hours}</TableCell>
          <TableCell>{entryItem.hm_rm_attended}</TableCell>
          <TableCell>{entryItem.strikes}</TableCell>
          <TableCell>{entryItem.inactive}</TableCell>
          <TableCell>{entryItem.comments}</TableCell>
          <TableCell>{entryItem.new_charge}</TableCell>
          <TableCell>{entryItem.reason_for_charge}</TableCell>
          <TableCell>{entryItem.balance_to_pay}</TableCell>
          <TableCell>{entryItem.check_this_payday}</TableCell>
          <TableCell>{entryItem.gpa_bonus_amount}</TableCell>
          <TableCell>{entryItem.total}</TableCell>
          <TableCell>{entryItem.amt_to_savings}</TableCell>
          <TableCell>{entryItem.pif_donations}</TableCell>
          <TableCell>{entryItem.deduction_amount}</TableCell>
          <TableCell>{entryItem.deduction_comments}</TableCell>
          <TableCell>{entryItem.bonus_amount}</TableCell>
          <TableCell>{entryItem.bonus_comments}</TableCell>
          <TableCell>{entryItem.money_to_student}</TableCell>
        </TableRow>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entry: state.entry,
});

export default withRouter(connect(mapStateToProps)(PastEntriesItem));
