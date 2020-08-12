import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

class Instructions extends Component {
  render() {
    return (
      <div>
        <br />
        <center>
          <h1>Instructions for Use</h1>
        </center>
        <center>
          <Paper
            elevation={5}
            style={{ width: "80%", overflow: "scroll", marginBottom: "5%" }}
          >
            <div>
              <br />
              The overall use of the application looks something like...
              <br />
              <br />
              <div style={{ textAlign: "left", paddingLeft: "5%" }}>
                <u>
                  <h2>Student Account Creation</h2>
                </u>
                1. After collecting information from new students, an Admin will
                add new students to the database from the Homepage via the "Add
                New Student" button.
                <br />
                2. Once the student is successfully created (will appear in
                Student List on Homepage), an email can be sent out to the
                student with their login information which is:
                <br />
                &emsp; &emsp; *email used upon LCF signup
                <br />
                &emsp; &emsp; *password created by Admin when creating new
                student account
                <br />
                &emsp; OR this can presented to the student in person. <br />
                3. Once the student logs into their account, they will be able
                to change their password by clicking the "Reset Password" tab
                and entering a new password
                <br />
                &emsp; (make sure the student double checks that their new password
                works).
                <br />
                4. The admin can change a student's information at any time by
                clicking the "Edit" button found in the row of the student on
                the admin Homepage.
                <br />
                5. The admin can also change a student's status from "active" to
                "inactive" via the Change Status column found on the admin
                Homepage.
                <br />
                &emsp; Students who are inactive in the database can still log into
                their account but will not be able to make entries.
              </div>
              <br />
              <br />
              <div style={{ textAlign: "left", paddingLeft: "5%" }}>
                <u>
                  <h2>Student Makes an Entry</h2>
                </u>
                6. Once a student is ready to make their entry for the Pay
                Period (i.e. reflecting on the last two week school period), they will
                login and click "Make an Entry".
                <br />
                &emsp;They will be met with a form for them to fill out cataloging
                their activity the past two weeks.
                <br />
                &emsp; NOTE: Students should only make an entry once they have
                completed the two weeks of school within that pay period.
                <br />
                &emsp; Filling out an entry early will result in the{" "}
                <b>
                  <i>
                    student not being able to make another entry for that period.
                  </i>
                </b>
                <br />
                &emsp; The admin will be able to review entries and see if students
                submit BEFORE they should (i.e. before they have fininshed up
                school for that pay period).
              </div>
              <br />
              <br />
              <div style={{ textAlign: "left", paddingLeft: "5%" }}>
                <u>
                  <h2>Admin Duties</h2>
                </u>
                7. Once all entries for that pay period are entered, the admin
                can review all entries submitted by clicking the tab "Current
                Entries".
                <br />
                &emsp; If they find something wrong with an entry, they can click the
                edit button in the row that needs changing.
                <br />
                8. If all entries look good, the admin can click the "Run
                Report" button at the top of the page to run the calculations
                behind the scenes.
                <br />
                &emsp; This will bring the admin to a new page.
                <br />
                9. Here the admin can review the calculations made by the
                built-in logic and figure out how much each student is getting
                paid.
                <br />
                &emsp; If the numbers look wrong or an error is spotted, the admin can
                click the "cancel" button on the bottom to move back to the
                entry list and correct it.
                <br />
                10.Otherwise if the final calculated number for each student
                looks good, the admin can click "Confirm Report" to push
                everything to the Past Reports Page.
                <br />
                &emsp; NOTE: Once entries are pushed to Past Reports they{" "}
                <b>CANNOT be removed</b>. This discourages tampering of past
                data.
                <br />
                &emsp; If an error is indeed made and is not caught before the check is
                sent out, the admin will have to reconcile the amount manually.
                <br />
              </div>
              <br />
              <br />
              <div style={{ textAlign: "left", paddingLeft: "5%" }}>
                <u><h2>Past Entries/History</h2></u>
                The purpose of the past entries on the student's account is to
                allow them to reflect on their past entries as well as have a
                record of their past paychecks.
                <br />
                If students have questions on their past entries or their past
                paychecks, they should contact an admin to discuss.
              </div>
              <br />
              <br />
              <div style={{ textAlign: "left", paddingLeft: "5%" }}>
                <u><h2> Password Resets</h2></u>
                If a password reset is needed by a student, they will contact
                the admin. The admin will then confirm the student's credentials
                (name, LCF ID) and reset their password.
                <br />
                This new password can then be given to the student so that they
                can login and chnage their password to a password they will
                better remember.
              </div>
              <br />
              <br />
            </div>
          </Paper>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  admin: state.admin.adminlist,
});

export default connect(mapStateToProps)(Instructions);
