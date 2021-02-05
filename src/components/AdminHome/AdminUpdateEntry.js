import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { green, yellow } from "@material-ui/core/colors";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  withStyles,
  Slider,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { setStateToEntryByLcfIdInUrl } from "./AdminUtils";
import { getGpaSliderMarks } from "./../MakeEntry/MakeEntryUtils";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//The purpose of this page is to update the student's entry this past pay period

class AdminUpdateEntry extends Component {

  state = {
    loading: true,
    lcf_id: "",
    student_name: "",
    pay_period_label: "",
    pass_class: "",
    gpa: 0,
    clean_attend: 0,
    detent_hours: "",
    act_or_job: "",
    passed_ua: "",
    current_service_hours: 0,
    hw_rm_attended: "",
    comments: ""
  };

  componentWillMount() {
  }

  componentDidMount() {
    if (this.props.entries === null || this.props.entries.length === 0) {
      this.props.dispatch({ type: "FETCH_ENTRIES_FOR_ADMIN" });
    } else {
      this.initializeState();
    }
  }

  componentDidUpdate(prevProps) {
    // Detect when we're not loading anymore.
    if (this.state.loading && this.props.entries?.length > 0) {
      this.initializeState();
    }
  }

  initializeState() {
    const entry = setStateToEntryByLcfIdInUrl(this);
    const paydayEnd = moment(entry.pay_day).add(-3, 'day');
    const payDayStart = moment(entry.previous_pay_day);
    this.setState({
      loading: false,
      student_name: `${entry.first_name} ${entry.last_name}`,
      pay_period_label: `${payDayStart.format('MMM D')} to ${paydayEnd.format('MMM D, YYYY')}`
    });
  }

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };
  handleChangeGpa = (event, gpa) => {
    gpa = Number(gpa);
    this.setState({
      gpa,
    });
  };

  submitInfo = (event) => {
    event.preventDefault();
    const {
      pass_class,
      lcf_id,
      gpa,
      clean_attend,
      detent_hours,
      after_school,
      act_or_job,
      passed_ua,
      current_service_hours,
      hw_rm_attended,
      comments,
    } = this.state;

    Swal.fire({
      title: "Please confirm details below",
      html: `1. LCF ID: ${lcf_id} </br>
      2. Passing classes: ${pass_class} </br>
      3. GPA: ${gpa} </br>
      4. Days punctual: ${clean_attend} </br>
      5. Detention hours: ${detent_hours} </br>
      6. Job: ${act_or_job} </br>
      7. Drug free: ${passed_ua} </br>
      8. service hours: ${current_service_hours} </br>
      9. homeroom attendence: ${hw_rm_attended} </br>
      10. comments: ${comments}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm my entry",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch({
          type: "ADMIN_ENTRY_UPDATE",
          payload: {
            lcf_id: lcf_id,
            pass_class: pass_class,
            gpa: gpa,
            clean_attend: clean_attend,
            detent_hours: detent_hours,
            after_school: after_school,
            act_or_job: act_or_job,
            passed_ua: passed_ua,
            current_service_hours: current_service_hours,
            hw_rm_attended: hw_rm_attended,
            comments: comments
          }
        });
        Swal.fire("Success!", "Your entry update has been logged.", "success");
        this.props.history.push("/totalstudententries");
        console.log("state is", this.state);
      }
    });
  };

  navToStudentEntries = () => this.props.history.push("/totalstudententries");

  render() {
    const header =
      (<div className="navbuttonscontainer">
        <Button
          onClick={this.navToStudentEntries}
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10, display: "block" }}
          variant="contained"
          color="primary"
          className="button"
        >View Student Entries</Button>
      </div>);
    const body = this.state.loading
      ? (<h3 style={{ textAlign: "center" }}>Loading...</h3>)
      : this.getMainBody();

    return (<div>{header}{body}</div>);
  }

  getMainBody() {
    const marksGpa = getGpaSliderMarks();
    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: "24px" }}>
          This entry is for the week of: {this.state.pay_period_label}
        </h3>
        <Paper elevation={5} style={{ padding: "24px 5%", margin: "24px 5%" }}>
          <form onSubmit={this.submitInfo}>
            <p>1. Student: {this.state.student_name} (#{this.state.lcf_id})</p>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                2. Are you passing all your classes?
              </FormLabel>
              <RadioGroup
                aria-label="pass_class"
                name="pass_class"
                value={this.state.pass_class}
                onChange={(event) => this.handleChange(event, "pass_class")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <p>3. What is your current GPA?</p>
            <Slider
              style={{
                width: "80%",
              }}
              required
              defaultValue={Number(this.state.gpa)}
              type="number"
              aria-labelledby="discrete-slider-custom"
              step={0.01}
              valueLabelDisplay="auto"
              max={4}
              min={0}
              label="GPA"
              name="GPA"
              value={Number(this.state.gpa)}
              onChange={this.handleChangeGpa}
              marks={marksGpa}
            />{" "}
            <span style={{ marginLeft: 20 }}>GPA: {this.state.gpa}</span>

            <div>
              4. How many school days were you punctual for this pay period? (no tardies, no truancy, no lateness)
              <br />
              <TextField
                  style={{
                    backgroundColor: "white",
                    margin: "5px",
                    width: "180px",
                    verticalAlign: "middle",
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  label="Clean attendance"
                  name="Clean attendance"
                  // sets value of input to local state
                  value={this.state.clean_attend}
                  type="number"
                  inputProps={{min:0, max:10}}
                  maxLength={2}
                  onChange={(event) => this.handleChange(event, "clean_attend")}
                />
            </div>

            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                5. Do you have detention hours at school?
              </FormLabel>
              <RadioGroup
                aria-label="detent_hours"
                name="detent_hours"
                value={this.state.detent_hours}
                onChange={(event) => this.handleChange(event, "detent_hours")}
              >
                <FormControlLabel
                  value="No"
                  control={<GreenRadio />}
                  label="No"
                />
                <FormControlLabel
                  value="Yes"
                  control={<YellowRadio />}
                  label="Yes"
                />
              </RadioGroup>
            </FormControl>{" "}
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                6. Are you involved in any after school activity or job? <br />
                (At school or at Legacy)
              </FormLabel>
              <RadioGroup
                aria-label="after_school"
                name="after_school"
                value={this.state.act_or_job}
                onChange={(event) => this.handleChange(event, "act_or_job")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                7. Are you living a drug free life?
              </FormLabel>
              <RadioGroup
                aria-label="passed_ua"
                name="passed_ua"
                value={this.state.passed_ua}
                onChange={(event) => this.handleChange(event, "passed_ua")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <div>
              8. How many service hours did you do the past 2 weeks?
              <TextField
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "130px",
                  verticalAlign: "middle",
                }}
                variant="outlined"
                required
                fullWidth
                label="service hours"
                name="service hours"
                // sets value of input to local state
                value={this.state.current_service_hours}
                type="number"
                inputProps={{ min: 0, max: 100 }}
                maxLength={4}
                onChange={(event) => this.handleChange(event, "current_service_hours")}
              />
            </div>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                9. Were you on time for mandatory homerooms this pay period?
              </FormLabel>
              <RadioGroup
                aria-label="hw_rm_attended"
                name="hw_rm_attended"
                value={this.state.hw_rm_attended}
                onChange={(event) => this.handleChange(event, "hw_rm_attended")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>{" "}
            <br /> <br />
            <p>10. Any comments you would like to leave this pay period?</p>
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
              fullWidth
              label="Write comments here"
              name="comments"
              // sets value of input to local state
              value={this.state.comments}
              type="text"
              maxLength={1000}
              onChange={(event) => this.handleChange(event, "comments")} //onChange of input values set local state
            />{" "}
            <br />
            <br />
            <center>
              <Button
                style={{ margin: "6%" }}
                variant="contained"
                color="secondary"
                className="button"
                onClick={() => {
                  this.props.history.push("/totalstudententries");
                }}
              >
                Cancel Update
              </Button>

              <Button
                variant="contained"
                type="submit"
                color="primary"
                className="button"
              >
                Submit Entry
              </Button>
            </center>
          </form>
        </Paper>
        <br />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  user: state.user,
  entries: state.students.studententriesadmin
});

export default withRouter(connect(mapStateToProps)(AdminUpdateEntry));
