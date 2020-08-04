import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { TextField, Grid, RadioGroup, FormControlLabel, Radio, Select, MenuItem} from "@material-ui/core";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

class AdminUpdateEntry extends Component {

  state = {
    first_name: '',
    last_name: '',
    lcf_id: '',
    pass_class: "",
    gpa: "",
    absent: "",
    tardy: "",
    late: "",
    truant: "",
    clean_attend: "",
    detent_hours: "",
    after_school: "",
    act_or_job: "",
    passed_ua: "",
    current_service_hours: "",
    hw_rm_attended: "",
    comments: "",
  };

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };

  submitInfo = (event) => {
    event.preventDefault();
    const { pass_class,
       first_name,
       last_name,
       lcf_id,
       gpa,
       absent,
       tardy,
       late,
       truant,
       clean_attend,
       detent_hours,
       after_school,
       act_or_job,
       passed_ua,
       current_service_hours,
       hw_rm_attended,
       comments, } = this.state;
   this.props.dispatch({
     type: "ADMIN_ENTRY_UPDATE",
     payload: {
       pass_class: pass_class,
       gpa: gpa,
       first_name: first_name,
       last_name: last_name,
       lcf_id: lcf_id,
       absent: absent,
       tardy: tardy,
       late: late,
       truant: truant,
       clean_attend: clean_attend,
       detent_hours: detent_hours,
       after_school: after_school,
       act_or_job: act_or_job,
       passed_ua: passed_ua,
       current_service_hours: current_service_hours,
       hw_rm_attended: hw_rm_attended,
       comments: comments,
     },
   });
    this.props.history.push("/home");
    console.log('state is', this.state)
  };

  render() {
    const inputPropsGpa = {
      step: 0.01,
      max: 4.0,
      min: 0,
    };
      const inputProps = {
        max: 10,
        min: 0,
      };

    return (
      <div>
        {this.props.user.role === 'admin'&&
                    <div className="navbuttonscontainer">
                    <Link to="/totalstudententries" ><Button variant="outline-primary">View Student Entries</Button></Link> {' '} 
                    </div>}
                    
        <h3>This entry is for the week of: PAY PERIOD HERE</h3>
        <form onSubmit={this.submitInfo}>

             <p>
            1. Student First Name
          </p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "30%",
            }}
            variant="outlined"

            required

            fullWidth
            label="first_name"
            name="first_name"
            // sets value of input to local state
            value={this.state.first_name}
            type="text"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "first_name")} //onChange of input values set local state
          />

        <p>
            2. Student Last Name
          </p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "30%",
            }}
            variant="outlined"

            required

            fullWidth
            label="last_name"
            name="last_name"
            // sets value of input to local state
            value={this.state.last_name}
            type="text"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "last_name")} //onChange of input values set local state
          />

                    <p>
            3. Student LCF ID:
          </p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "30%",
            }}
            variant="outlined"

            required

            fullWidth
            label="lcf_id"
            name="lcf_id"
            // sets value of input to local state
            value={this.state.lcf_id}
            type="text"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "lcf_id")} //onChange of input values set local state
          />

          <p>4. Are you passing all your classes?</p>
          <Select
            style={{
              backgroundColor: "white",
            }}
            variant="outlined"

            required

            name="pass_class"
            //sets value of input to value of local state
            value={this.state.pass_class}
            onChange={(event) => this.handleChange(event, "pass_class")} //sends input values to local state
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          {/* figure radio buttons out as a stretch goal */}
          <div>
            {/* <Radio
              onChange={(event)=>this.handleChange(event, "pass")}
              value="yes"
              label="yes"
              name="yes"
              labelPlacement="bottom"
              />
              <Radio
              onChange={(event)=>this.handleChange(event, "pass")}
              value="no"
              label="no"
              name="no"
              labelPlacement="bottom"
              /> */}
          </div>
          <p>5. What is your current GPA?</p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "20%",
            }}
            variant="outlined"

            required

            fullWidth
            label="GPA"
            name="GPA"
            // sets value of input to local state
            value={this.state.gpa}
            type="number"
            inputProps={inputPropsGpa}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "gpa")} //onChange of input values set local state
          />
          <p>6a. How many days were you absent from school this pay period?</p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "20%",
            }}
            variant="outlined"

            required

            fullWidth
            label="absent"
            name="absent"
            // sets value of input to local state
            value={this.state.absent}
            type="number"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "absent")} //onChange of input values set local state
          />
          <p>6b. How many school days were you tardy this pay period?</p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "20%",
            }}
            variant="outlined"

            required

            fullWidth
            label="tardy"
            name="tardy"
            // sets value of input to local state
            value={this.state.tardy}
            type="number"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "tardy")} //onChange of input values set local state
          />
          <p>6c. How many school days were you late this pay period?</p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "20%",
            }}
            variant="outlined"

            required

            fullWidth
            label="late"
            name="late"
            // sets value of input to local state
            value={this.state.late}
            type="number"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "late")} //onChange of input values set local state
          />
          <p>6d. How many school days were you truant this pay period?</p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "20%",
            }}
            variant="outlined"

            required

            fullWidth
            label="truant"
            name="truant"
            // sets value of input to local state
            value={this.state.truant}
            type="number"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "truant")} //onChange of input values set local state
          />
          <p>
            6e. How many school days were you punctual for this pay period?
            <br />
            (no tardies, no truancy, no lateness)
          </p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "30%",
            }}
            variant="outlined"

            required

            fullWidth
            label="attendance"
            name="attendance"
            // sets value of input to local state
            value={this.state.clean_attend}
            type="number"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "clean_attend")} //onChange of input values set local state
          />
          <p>7. Do you have detention hours at school?</p>
          <Select
            style={{
              backgroundColor: "white",
            }}
            variant="outlined"

            required

            name="detent_hours"
            //sets value of input to value of local state
            value={this.state.detent_hours}
            onChange={(event) => this.handleChange(event, "detent_hours")} //sends input values to local state
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <p>
            8. Are you involved in any after school activity? <br />
            (At school or at Legacy)
          </p>
          <Select
            style={{
              backgroundColor: "white",
            }}
            variant="outlined"

            required

            name="after_school"
            //sets value of input to value of local state
            value={this.state.after_school}
            onChange={(event) => this.handleChange(event, "after_school")} //sends input values to local state
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <p>9. Do you have a job?</p>
          <Select
            style={{
              backgroundColor: "white",
            }}
            variant="outlined"

            required

            name="act_or_job"
            //sets value of input to value of local state
            value={this.state.act_or_job}
            onChange={(event) => this.handleChange(event, "act_or_job")} //sends input values to local state
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <p>10. Are you living a drug free life?</p>
          <Select
            style={{
              backgroundColor: "white",
            }}
            variant="outlined"

            required

            name="passed_ua"
            //sets value of input to value of local state
            value={this.state.passed_ua}
            onChange={(event) => this.handleChange(event, "passed_ua")} //sends input values to local state
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <p>11. How many service hours did you do the past 2 weeks?</p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "30%",
            }}
            variant="outlined"

            required

            fullWidth
            label="service hours"
            name="service hours"
            // sets value of input to local state
            value={this.state.current_service_hours}
            type="number"
            inputProps={inputProps}
            maxLength={1000}
            onChange={(event) =>
              this.handleChange(event, "current_service_hours")
            } //onChange of input values set local state
          />
          <p>12. Were you ontime for mandatory homerooms this pay period?</p>
          <Select
            style={{
              backgroundColor: "white",
            }}
            variant="outlined"

            required

            name="hw_rm_attended"
            //sets value of input to value of local state
            value={this.state.hw_rm_attended}
            onChange={(event) => this.handleChange(event, "hw_rm_attended")} //sends input values to local state
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <p>13. Any comments you would like to leave this pay period?</p>
          <TextField
            style={{
              backgroundColor: "white",
              margin: "5px",
              width: "100%",
            }}
            //per material UI changes textfield to act like a textarea tag
            multiline
            //input field takes up for rows by defaults
            rows={4}
            //...will expand up to 8 rows
            rowsMax={8}
            variant="outlined"

            required

            fullWidth
            label="comments"
            name="comments"
            // sets value of input to local state
            value={this.state.comments}
            type="text"
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "comments")} //onChange of input values set local state
          />
          <Button variant="contained" type="submit" color="primary" className="button">
            Submit entry
          </Button>
            <p></p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(AdminUpdateEntry));