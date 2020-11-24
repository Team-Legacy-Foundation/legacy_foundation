import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { green, yellow } from "@material-ui/core/colors";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Slider,
  Snackbar,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import "./MakeEntry.css";
import moment from "moment";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import withReactContent from "sweetalert2-react-content";

const SwalJsx = withReactContent(Swal);

const GreenRadio = withStyles({
  // turns the radio button green
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  // turns the radio button yellow
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//The purpose of this page is to capture the student's activity for the past pay period
class MakeEntry extends Component {

  state = {
    selected_pay_day_ymd: null,
    status_rows: [],
    initialEntriesLoadNumber: this.props.entriesLoadNumber,
    savingEntriesLoadNumber: null,

    //state info for entry form
    lcf_id: this.props.user.lcf_id,
    pass_class: "",
    gpa: 0,
    absent: 0,
    tardy: 0,
    late: 0,
    truant: 0,
    clean_attend: 10,
    total_days: 10,
    detent_hours: null,
    act_or_job: null,
    passed_ua: null,
    current_service_hours: 0,
    hw_rm_attended: null,
    comments: '',
    //error values used to conditionally render error toasts, default is false
    error: false,
    pay_day_error: false,
    dupeEntry: false,
    toggle: false,
  };

  componentWillMount() {
    const payDayInfo = this.findCurrentPayDay();
    const statusRows = [
      this.buildStatusRow(payDayInfo.pay_day_moment),
      this.buildStatusRow(moment(payDayInfo.pay_day_moment).add(-2, "week")),
      this.buildStatusRow(moment(payDayInfo.pay_day_moment).add(-4, "week"))
    ];

    // These are the hard-coded number of school days per pay
    // period starting with 9/21/2020. It looks like we're good
    // for about 19 pay periods, and then the code will need to
    // be modified to handle this. -JP, 11/19/20
    //                              3           7          11                      19
    const daysByCounter = [0, 0, 0, 8, 9, 7, 0, 8, 5, 9, 0, 8, 0, 5, 9, 0, 9, 0, 9, 3];
    let totalDays = daysByCounter[payDayInfo.counter];
    if (!totalDays) totalDays = 10;
    this.setState({
      clean_attend: totalDays,
      total_days: totalDays,
      status_rows: statusRows
    });
  }

  componentDidMount() {
    this.props.dispatch({ type: "GET_STUDENTS" });
    this.props.dispatch({ type: "FETCH_STUDENT_HISTORY", payload: this.state.lcf_id});
    this.props.dispatch({ type: "FETCH_ENTRIES_FOR_ADMIN" });
  }

  /** @param payDay {moment.Moment} */
  buildStatusRow(payDay) {
    const row = {
      period_start: moment(payDay).add(-2, "week"),
      period_end: moment(payDay).add(-1, "day"),
      pay_day: payDay,
      pay_day_ymd: payDay.format('YYYY-MM-DD')
    };
    row.title = `${row.period_start.format("MMM D")} - ${row.period_end.format("MMM D, YYYY")}`;
    row.long_title = `${row.period_start.format("MMMM D")} - ${row.period_end.format("MMMM D, YYYY")}`;
    return row;
  }

  getEntryToMatchPayDay(studentLcfId, payDayYmd) {
    const allEntries = (this.props.entries || []).concat(this.props.studentHistory || []);
    return allEntries.find(e => {
      if (e.lcf_id !== studentLcfId) {
        return false;
      }
      if (typeof e.pay_day === 'string') {
        return e.pay_day.substr(0, 10) === payDayYmd;
      } else {
        return payDayYmd === moment(e.pay_day).format('YYYY-MM-DD');
      }
    });
  }

  /** @returns {{ pay_day_moment: moment.Moment, pay_day: string, previous_pay_day: string, counter: number }} */
  findCurrentPayDay() {
    let today = moment();
    let previous_pay_day = moment("2020-09-21T00:00:00.000-05"); //midnight central time
    let pay_day = moment(previous_pay_day);
    let counter = 0;
    while (today >= pay_day) {
      counter++;
      previous_pay_day = pay_day;
      pay_day = moment(previous_pay_day).add(2, "week");
    }
    previous_pay_day = previous_pay_day.format("MMMM Do YYYY");
    return {
      pay_day_moment: pay_day,
      pay_day: pay_day.format("MMMM Do YYYY"),
      previous_pay_day,
      counter
    };
  }

  //This function handles storing input values into state on change
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };

  handleChangeGpa = (event, gpa) => {
    gpa = Number(gpa);
    this.setState({
      gpa,
    });
  };

  handleChangeAbsent = (event, absent) => {
    absent = Number(absent);
    this.setState({
      absent,
    });
  };

  handleChangeTardy = (event, tardy) => {
    tardy = Number(tardy);
    this.setState({
      tardy,
    });
  };

  handleChangeLate = (event, late) => {
    late = Number(late);
    this.setState({
      late,
    });
  };

  handleChangeTruant = (event, truant) => {
    truant = Number(truant);
    this.setState({
      truant,
    });
  };

  handleChangeAttendance = (event) => {
    let { absent, tardy, late, truant, clean_attend } = this.state;

    this.setState({
      clean_attend: clean_attend - absent - tardy - late - truant,
      toggle: !this.state.toggle,
    });
  };

  //this function sends user information to the server to store in the database
  submitInfo = (event) => {
    event.preventDefault();
    const {
      pass_class,
      lcf_id,
      gpa,
      absent,
      tardy,
      late,
      truant,
      clean_attend,
      detent_hours,
      act_or_job,
      passed_ua,
      current_service_hours,
      hw_rm_attended,
      comments,
    } = this.state;
    //don't run function if any of these values below are null
    if (
      pass_class === null ||
      detent_hours === null ||
      act_or_job === null ||
      passed_ua === null ||
      current_service_hours === null ||
      current_service_hours === undefined ||
      current_service_hours === "" ||
      hw_rm_attended === null
    ) {
      this.setState({ error: true });
      setTimeout(() => this.setState({ error: false }), 5000);
      return;
    }

    const historyEntries = this.props.studentHistory;
    for (let history of historyEntries) {
      let historyYmd = moment.utc(history.pay_day).format("YYYY-MM-DD");
      if (historyYmd === this.state.selected_pay_day_ymd) {
        this.setState({ pay_day_error: true });
        setTimeout(() => this.setState({ pay_day_error: false }), 5000);
        return;
      }
    }

    SwalJsx.fire({
      title: "Please confirm details below",
      html: this.buildEntryPreview(this.state),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#fcb70a",
      confirmButtonText: "Confirm my entry",
    }).then((result) => {
      if (!result.value) {
        return;
      }
      this.setState({ savingEntriesLoadNumber: this.props.entriesLoadNumber});
      this.props.dispatch({
        type: "ADD_ENTRY",
        payload: {
          pay_day: this.state.selected_pay_day_ymd,
          pass_class: pass_class,
          lcf_id: lcf_id,
          gpa: gpa,
          absent: absent,
          tardy: tardy,
          late: late,
          truant: truant,
          clean_attend: clean_attend,
          detent_hours: detent_hours,
          act_or_job: act_or_job,
          passed_ua: passed_ua,
          current_service_hours: current_service_hours,
          hw_rm_attended: hw_rm_attended,
          comments: comments
        }
      });
    });
  };

  buildEntryPreview(entry) {
    const hasFullAttendanceInfo = typeof (entry.absent) !== 'undefined'
      || typeof (entry.tardy) !== 'undefined'
      || typeof (entry.late) !== 'undefined'
      || typeof (entry.truant) !== 'undefined';
    let attendHtml;
    if (hasFullAttendanceInfo) {
      attendHtml = (<div>
        <div>3a. Days absent: {entry.absent}</div>
        <div>3b. Days tardy: {entry.tardy}</div>
        <div>3c. Days late: {entry.late}</div>
        <div>3d. Days truant: {entry.truant}</div>
        <div>3e. Days punctual: {entry.clean_attend}</div>
      </div>);
    } else {
      attendHtml = (<div>3. Days punctual: {entry.clean_attend}</div>);
    }
    return (<div className="payday-swal-content">
      <div>1. Passing classes: {entry.pass_class}</div>
      <div>2. GPA: {entry.gpa}</div>
      {attendHtml}
      <div>4. Detention hours: {entry.detent_hours}</div>
      <div>5. Job or after school activities: {entry.act_or_job}</div>
      <div>6. Drug free: {entry.passed_ua}</div>
      <div>7. Service hours: {entry.current_service_hours}</div>
      <div>8. Homeroom attendence: {entry.hw_rm_attended}</div>
      <div>9. Comments: {entry.comments}</div>
    </div>);
  }

  setSelectedRow(row) {
    if(!row) {
      this.setState({ selected_pay_day_ymd: null });
      return;
    }
    const entry = this.getEntryToMatchPayDay(this.state.lcf_id, row.pay_day_ymd);
    this.setState({ selected_pay_day_ymd: row.pay_day_ymd });
    if (!entry) {
      return;
    }
    SwalJsx.fire({
      title: `${row.pay_day.format('MMMM D')} Pay Day Information`,
      html: this.buildEntryPreview(entry),
      showCancelButton: false,
      confirmButtonColor: "#5cb85c",
      confirmButtonText: "Dismiss",
    });
  }

  renderSummaryRowListItem(lcfId, row) {
    const entry = this.getEntryToMatchPayDay(lcfId, row.pay_day_ymd);
    let icon;
    let status;
    if (!entry) {
      icon = <CalendarTodayIcon />;
      status = "No entry";
    } else if (entry.did_we_pay === "Yes" || entry.did_we_pay === "yes") {
      // History entry that's been paid
      const money = Number(entry.total).toFixed(2);
      icon = <AttachMoneyIcon style={{ color: green[700] }} />;
      status = `Submitted ${moment(entry.date_submitted).format('MMM D')}; $${money} paid`;
    } else if (typeof entry.did_we_pay !== "undefined") {
      // History entry, but did_we_pay seems to be falsy.
      icon = <EventAvailableIcon style={{ color: yellow[700] }} />;
      status = `Submitted ${moment(entry.date_submitted).format('MMM D')}`;
    } else {
      icon = <EventAvailableIcon style={{ color: green[700] }} />;
      status = `Submitted ${moment(entry.date_submitted).format('MMM D')}`;
    }
    return {
      entry,
      html:
        <ListItem button key={row.pay_day_ymd}
            selected={this.state.selected_pay_day_ymd === row.pay_day_ymd}
            onClick={() => this.setSelectedRow(row)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={row.title} secondary={status} />
        </ListItem>
    };
  }

  render() {
    const student = this.props.students.find(s => s.lcf_id === this.props.user.lcf_id);
    if (!student || this.state.initialEntriesLoadNumber === this.props.entriesLoadNumber) {
      return (<div className="make-entry-loading">Loading...</div>);
    }

    const isSaving = this.state.savingEntriesLoadNumber
      && this.state.savingEntriesLoadNumber === this.props.entriesLoadNumber;

    const savingSnackbar = <Snackbar open={isSaving} message="Saving..." />;

    const marks = [
      {
        value: 0,
        label: "0"
      },
      {
        value: this.state.total_days,
        label: this.state.total_days,
      }
    ];
    const marksGpa = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map(i => ({ value: i, label: i.toString()}));

    if (student.inactive === "yes") {
      return (
        <div>
          <Paper elevation={5} style={{ margin: "5%", padding: "5%" }}>
            <center>
              <h2>
                Sorry, you cannot make an entry at this moment. Your account
                is currently inactive, please contact the admin for further
                details.
              </h2>
            </center>
            <center>
              <h2>Thank you!</h2>
            </center>
          </Paper>
        </div>
      );
    }

    const summaryRows = this.state.status_rows.map(row => this.renderSummaryRowListItem(student.lcf_id, row));
    const statusTable = (
      <div className="payday-summary">
        <Paper elevation={5}>
          <Typography variant="h6">Recent Pay Periods</Typography>
          <List dense>
            {summaryRows.map(r => r.html)}
          </List>
        </Paper>
        { summaryRows.some(r => !r.entry) || (
          <Alert severity="info" elevation={5}>
            Nice -- all pay periods listed here have entries.
            Check back next pay period!
          </Alert>
        )}
        { savingSnackbar }
      </div>
    );

    if (!this.state.selected_pay_day_ymd) {
      return statusTable;
    }

    const row = this.state.status_rows.find(r => r.pay_day_ymd === this.state.selected_pay_day_ymd);
    const entry = this.getEntryToMatchPayDay(student.lcf_id, this.state.selected_pay_day_ymd);
    if (entry) {
      return statusTable;
    }

    return (
      <div>
        {/* toast that appears on error, shows up when all required fields are not filled in */}
        {this.state.error === true && (
          <Alert className="error" style={{}} severity="error">
            Please fill out all of the required fields
          </Alert>
        )}
        {/* toast that appears when student tries to make an entry when an entry has alreadt been made */}
        {this.state.pay_day_error === true && (
          <Alert className="error" style={{}} severity="error">
            You already have a historical entry on record for this pay period.
            Another entry for the same pay period cannot be created.
          </Alert>
        )}

        <Grid container style={{ maxWidth: "90%", margin: "16px auto 8px auto" }}>
          <Grid item xs={1}>
            <IconButton onClick={() => this.setSelectedRow(null)}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <h6 style={{ textAlign: "center" }}>
              This entry is for the week of
            </h6>
            <h3 style={{ textAlign: "center" }}>
              {row.long_title}
            </h3>
          </Grid>
        </Grid>
        <Paper
          elevation={5}
          style={{
            padding: "5%",
            marginLeft: "5%",
            marginRight: "5%",
            marginBottom: "5%",
          }}
        >
          {/* start form for make entry */}
          <form onSubmit={this.submitInfo} className="payday-entry-form">
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                1. Are you passing all your classes?
              </FormLabel>
              <RadioGroup
                required
                aria-label="pass_class"
                name="pass_class"
                // sets the value of the input to the value of state
                value={this.state.pass_class}
                // onChange run handleChange function to update coorasponding state
                onChange={(event) => this.handleChange(event, "pass_class")}
              >
                <FormControlLabel
                  disabled={isSaving}
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  disabled={isSaving}
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <p>2. What is your current GPA?</p>
            <Slider
              //sets width of slider to 80% of the screen
              style={{
                width: "80%",
              }}
              disabled={isSaving}
              required
              // sets the default value of the slider to the value of state
              defaultValue={this.state.gpa}
              // requires a number
              type="number"
              aria-labelledby="discrete-slider-custom"
              // allows decimals values of up to 0.01
              step={0.01}
              valueLabelDisplay="auto"
              // max value is 4, gpa max is 4.0 and can't go higher
              max={4}
              // min value is 0, gpa min value is 0 and can't go lower
              min={0}
              label="GPA"
              name="GPA"
              // sets the value of the slider to the value of state
              value={this.state.gpa}
              // onChange run handleChange function to update coorasponding state
              onChange={this.handleChangeGpa}
              // sets the mark values for gpa below the slider.
              marks={marksGpa}
            />{" "}
            <span style={{ marginLeft: 20 }}>GPA: {this.state.gpa}</span>
            {this.state.toggle === false ? (
              <>
                <p>
                  3a. How many days were you absent from school this pay period?
                </p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.absent}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="absent"
                  name="absent"
                  // sets the value of the input to the value of state
                  value={this.state.absent}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeAbsent}
                  marks={marks} // sets the mark values below the slider.
                />
                <span style={{ marginLeft: 20 }}>
                  Days absent: {this.state.absent}
                </span>
                <p>3b. How many school days were you tardy this pay period?</p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.tardy}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="tardy"
                  name="tardy"
                  // sets the value of the input to the value of state
                  value={this.state.tardy}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeTardy}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Days tardy: {this.state.tardy}
                </span>
                <p>3c. How many school days were you late this pay period?</p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.late}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="late"
                  name="late"
                  // sets the value of the input to the value of state
                  value={this.state.late}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeLate}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Days late: {this.state.late}
                </span>
                <p>3d. How many school days were you truant this pay period?</p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.truant}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="truant"
                  name="truant"
                  // sets the value of the input to the value of state
                  value={this.state.truant}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeTruant}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Days truant: {this.state.truant}
                </span>
                <br />
                <Button //button that, once clicked, calculates total attendance
                  style={{
                    marginTop: "3%",
                    marginLeft: "5%",
                    marginRight: "5%",
                    backgroundColor: "green",
                    color: "white",
                  }}
                  variant="contained"
                  color="primary"
                  className="button"
                  onClick={this.handleChangeAttendance}
                >
                  Calculate Attendance
                </Button>
              </>
            ) : (
              <>
                <p>Total Attendance</p>
                <Slider
                  disabled
                  style={{
                    width: "80%",
                  }}
                  required
                  defaultValue={this.state.clean_attend}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //total number of school days, this can vary
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="attendance"
                  name="attendance"
                  value={this.state.clean_attend}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Attendance: {this.state.clean_attend}
                </span>
              </>
            )}
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                4. Do you have detention hours at school?
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two options)
                aria-label="detent_hours"
                name="detent_hours"
                // sets the value of the input to the value of state
                value={this.state.detent_hours}
                onChange={(event) => this.handleChange(event, "detent_hours")}
              >
                <FormControlLabel
                  disabled={isSaving}
                  value="No"
                  control={<GreenRadio />}
                  label="No"
                />
                <FormControlLabel
                  disabled={isSaving}
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
                5. Are you involved in any after school activity or job? <br />
                (At school or at Legacy)
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two options)
                aria-label="act_or_job"
                name="act_or_job"
                // sets the value of the input to the value of state
                value={this.state.act_or_job}
                onChange={(event) => this.handleChange(event, "act_or_job")}
              >
                <FormControlLabel
                  disabled={isSaving}
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  disabled={isSaving}
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
                6. Are you living a drug free life?
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two options)
                aria-label="passed_ua"
                name="passed_ua"
                // sets the value of the input to the value of state
                value={this.state.passed_ua}
                onChange={(event) => this.handleChange(event, "passed_ua")}
              >
                <FormControlLabel
                  disabled={isSaving}
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  disabled={isSaving}
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
              7. How many service hours did you do the past 2 weeks?
              <TextField //takes in a number (can be 0)
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "130px",
                  verticalAlign: "middle",
                }}
                disabled={isSaving}
                variant="outlined"
                required
                fullWidth
                label="service hours"
                name="service hours"
                // sets value of input to local state
                value={this.state.current_service_hours}
                type="number"
                inputProps={{ min: 0, max: 10 }}
                maxLength={1000}
                onChange={(event) =>
                  this.handleChange(event, "current_service_hours")
                } //onChange of input values set local state
              />
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                8. Were you on time for mandatory homerooms this pay period?
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two possible options)
                aria-label="hw_rm_attended"
                name="hw_rm_attended"
                // sets the value of the input to the value of state
                value={this.state.hw_rm_attended}
                //onChange of input values set local state
                onChange={(event) => this.handleChange(event, "hw_rm_attended")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />} //colors button
                  label="Yes"
                  disabled={isSaving}
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />} //colors button
                  label="No"
                  disabled={isSaving}
                />
              </RadioGroup>
            </FormControl>{" "}
            <br /> <br />
            <p>9. Any comments you would like to leave this pay period?</p>
            <TextField //box for student to enter in text
              style={{
                backgroundColor: "white",
                margin: "5px",
                width: "100%",
              }}
              disabled={isSaving}
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
              //onChange of input values set local state
              onChange={(event) => this.handleChange(event, "comments")} //onChange of input values set local state
            />{" "}
            <center>
              <Button
                disabled={isSaving}
                variant="contained"
                className="button"
                onClick={() => this.setSelectedRow(null)}>
                Cancel Entry
              </Button>

              <Button
                disabled={isSaving}
                variant="contained"
                type="submit"
                color="primary"
                className="button">
                Submit Entry
              </Button>
            </center>
          </form>
        </Paper>
        <br />{" "}
        {/*Add a little buffer on the bottom of page (prevent cutoff on mobile) */}
        <br />
        { savingSnackbar }
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    // Detect when a "save entry" completes and show success to the user.
    if (this.props.entriesLoadNumber === prevProps.entriesLoadNumber) {
      return;
    }
    const wasSaving = this.state.savingEntriesLoadNumber
      && this.state.savingEntriesLoadNumber < this.props.entriesLoadNumber;
    if (wasSaving) {
      Swal.fire("Success!", "Your entry has been saved.", "success");
      this.setState({
        selected_pay_day_ymd: null,
        savingEntriesLoadNumber: null
      });
    }
  }

}

const mapStateToProps = (state) => ({
  user: state.user,
  entries: state.students.studententriesadmin,
  entriesLoadNumber: state.students.entriesLoadNumber,
  students: state.students.studentlist,
  studentHistory: state.studentHistory.studentHistoryReducer
});

export default withRouter(connect(mapStateToProps)(MakeEntry));
