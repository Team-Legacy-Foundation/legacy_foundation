import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { green } from "@material-ui/core/colors";
import {
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  withStyles,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//The purpose of this page is to update the student's entry this past pay period


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO: when updating a student entry, have the previous information populate the update page
//That way the admin DOES NOT have to rewrite everything.
//They will change only what is needed

//OR are you saying that they can't choose the specific entry? they just have to have the first and last name match up? - Kyle
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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



       Swal.fire({
         title: "Please confirm details below",
         html: `1. First Name: ${first_name} </br>
      2. Last Name: ${last_name} </br>
      3. LCF ID: ${lcf_id} </br>
      4. Passing classes: ${pass_class} </br>
      5. GPA: ${gpa} </br>
      6a. Days absent: ${absent} </br>
      6b. Days tardy: ${tardy} </br>
      6c. Days late ${late} </br>
      6d. Days truant ${truant} </br>
      6e. Days punctual: ${clean_attend} </br>
      7. Detention hours: ${detent_hours} </br>
      8. After school activities: ${after_school} </br>
      9. Job: ${act_or_job} </br>
      10. Drug free: ${passed_ua} </br>
      11. service hours: ${current_service_hours} </br>
      12. homeroom attendence: ${hw_rm_attended} </br>
      13. comments: ${comments}`,
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
           Swal.fire("Success!", "Your entry update has been logged.", "success");
           this.props.history.push("/home");
           console.log("state is", this.state);
         }
       });
    }

      navToStudentEntries = () => {
    //goes to details page
    this.props.history.push("/totalstudententries");
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
                   <Button onClick={this.navToStudentEntries} style={{
                     marginLeft: "40%",
                     marginTop: 10,
                   }} variant="contained"
                color="primary"
                className="button"> View Student Entries</Button> {' '} 
                    </div>}
                  
         
        <br />
        <h3 style={{ textAlign: "center" }}>
          This entry is for the week of: PAY PERIOD HERE
        </h3>
        <Paper elevation={5} style={{ padding: "5%", margin: "5%" }}>
          <form onSubmit={this.submitInfo}>


         < p >
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



            <FormControl component="fieldset">

              <FormLabel component="legend" style={{ color: "black" }}>
                1. Are you passing all your classes?
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
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <p>
              2. What is your current GPA?
              <TextField
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "115px",
                  verticalAlign: "middle",
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
              />{" "}
            </p>
            <p>
              3a. How many days were you absent from school this pay period?
              <TextField
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "115px",
                  verticalAlign: "middle",
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
            </p>
            <p>
              3b. How many school days were you tardy this pay period?
              <TextField
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "115px",
                  verticalAlign: "middle",
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
            </p>
            <p>
              3c. How many school days were you late this pay period?
              <TextField
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "115px",
                  verticalAlign: "middle",
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
              />{" "}
            </p>
            <p>
              3d. How many school days were you truant this pay period?
              <TextField
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "115px",
                  verticalAlign: "middle",
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
              />{" "}
            </p>
            <p>
              3e. How many school days were you punctual for this pay period?
              <TextField
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "115px",
                  verticalAlign: "middle",
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
              <br />
              (no tardies, no truancy, no lateness)
            </p>
            <br/>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                4. Do you have detention hours at school?
              </FormLabel>
              <RadioGroup
                aria-label="detent_hours"
                name="detent_hours"
                value={this.state.detent_hours}
                onChange={(event) => this.handleChange(event, "detent_hours")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel
                  value="No"
                  control={<GreenRadio />}
                  label="No"
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
              <RadioGroup
                aria-label="after_school"
                name="after_school"
                value={this.state.after_school}
                onChange={(event) => this.handleChange(event, "act_or_job")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            {/* <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                6. Do you have a job?
              </FormLabel>
              <RadioGroup
                aria-label="act_or_job"
                name="act_or_job"
                value={this.state.act_or_job}
                onChange={(event) => this.handleChange(event, "act_or_job")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl> <br/> <br/> */}
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                6. Are you living a drug free life?
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
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <br />
            <p>
              7. How many service hours did you do the past 2 weeks?
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
                inputProps={inputProps}
                maxLength={1000}
                onChange={(event) =>
                  this.handleChange(event, "current_service_hours")
                } //onChange of input values set local state
              />
            </p>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                8. Were you ontime for mandatory homerooms this pay period?
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
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>{" "}
            <br /> <br />
            <p>9. Any comments you would like to leave this pay period?</p>
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
                variant="contained"
                type="submit"
                color="primary"
                className="button"
              >
                Submit entry
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
});

export default withRouter(connect(mapStateToProps)(AdminUpdateEntry));












// <h3>This entry is for the week of: PAY PERIOD HERE</h3>
//         <form onSubmit={this.submitInfo}>

//              <p>
//             1. Student First Name
//           </p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "30%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="first_name"
//             name="first_name"
//             // sets value of input to local state
//             value={this.state.first_name}
//             type="text"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "first_name")} //onChange of input values set local state
//           />

//         <p>
//             2. Student Last Name
//           </p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "30%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="last_name"
//             name="last_name"
//             // sets value of input to local state
//             value={this.state.last_name}
//             type="text"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "last_name")} //onChange of input values set local state
//           />

//                     <p>
//             3. Student LCF ID:
//           </p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "30%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="lcf_id"
//             name="lcf_id"
//             // sets value of input to local state
//             value={this.state.lcf_id}
//             type="text"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "lcf_id")} //onChange of input values set local state
//           />

//           <p>4. Are you passing all your classes?</p>
//           <Select
//             style={{
//               backgroundColor: "white",
//             }}
//             variant="outlined"

//             required

//             name="pass_class"
//             //sets value of input to value of local state
//             value={this.state.pass_class}
//             onChange={(event) => this.handleChange(event, "pass_class")} //sends input values to local state
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//           {/* figure radio buttons out as a stretch goal */}
//           <div>
//             {/* <Radio
//               onChange={(event)=>this.handleChange(event, "pass")}
//               value="yes"
//               label="yes"
//               name="yes"
//               labelPlacement="bottom"
//               />
//               <Radio
//               onChange={(event)=>this.handleChange(event, "pass")}
//               value="no"
//               label="no"
//               name="no"
//               labelPlacement="bottom"
//               /> */}
//           </div>
//           <p>5. What is your current GPA?</p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "20%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="GPA"
//             name="GPA"
//             // sets value of input to local state
//             value={this.state.gpa}
//             type="number"
//             inputProps={inputPropsGpa}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "gpa")} //onChange of input values set local state
//           />
//           <p>6a. How many days were you absent from school this pay period?</p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "20%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="absent"
//             name="absent"
//             // sets value of input to local state
//             value={this.state.absent}
//             type="number"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "absent")} //onChange of input values set local state
//           />
//           <p>6b. How many school days were you tardy this pay period?</p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "20%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="tardy"
//             name="tardy"
//             // sets value of input to local state
//             value={this.state.tardy}
//             type="number"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "tardy")} //onChange of input values set local state
//           />
//           <p>6c. How many school days were you late this pay period?</p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "20%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="late"
//             name="late"
//             // sets value of input to local state
//             value={this.state.late}
//             type="number"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "late")} //onChange of input values set local state
//           />
//           <p>6d. How many school days were you truant this pay period?</p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "20%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="truant"
//             name="truant"
//             // sets value of input to local state
//             value={this.state.truant}
//             type="number"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "truant")} //onChange of input values set local state
//           />
//           <p>
//             6e. How many school days were you punctual for this pay period?
//             <br />
//             (no tardies, no truancy, no lateness)
//           </p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "30%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="attendance"
//             name="attendance"
//             // sets value of input to local state
//             value={this.state.clean_attend}
//             type="number"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "clean_attend")} //onChange of input values set local state
//           />
//           <p>7. Do you have detention hours at school?</p>
//           <Select
//             style={{
//               backgroundColor: "white",
//             }}
//             variant="outlined"

//             required

//             name="detent_hours"
//             //sets value of input to value of local state
//             value={this.state.detent_hours}
//             onChange={(event) => this.handleChange(event, "detent_hours")} //sends input values to local state
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//           <p>
//             8. Are you involved in any after school activity? <br />
//             (At school or at Legacy)
//           </p>
//           <Select
//             style={{
//               backgroundColor: "white",
//             }}
//             variant="outlined"

//             required

//             name="after_school"
//             //sets value of input to value of local state
//             value={this.state.after_school}
//             onChange={(event) => this.handleChange(event, "after_school")} //sends input values to local state
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//           <p>9. Do you have a job?</p>
//           <Select
//             style={{
//               backgroundColor: "white",
//             }}
//             variant="outlined"

//             required

//             name="act_or_job"
//             //sets value of input to value of local state
//             value={this.state.act_or_job}
//             onChange={(event) => this.handleChange(event, "act_or_job")} //sends input values to local state
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//           <p>10. Are you living a drug free life?</p>
//           <Select
//             style={{
//               backgroundColor: "white",
//             }}
//             variant="outlined"

//             required

//             name="passed_ua"
//             //sets value of input to value of local state
//             value={this.state.passed_ua}
//             onChange={(event) => this.handleChange(event, "passed_ua")} //sends input values to local state
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//           <p>11. How many service hours did you do the past 2 weeks?</p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "30%",
//             }}
//             variant="outlined"

//             required

//             fullWidth
//             label="service hours"
//             name="service hours"
//             // sets value of input to local state
//             value={this.state.current_service_hours}
//             type="number"
//             inputProps={inputProps}
//             maxLength={1000}
//             onChange={(event) =>
//               this.handleChange(event, "current_service_hours")
//             } //onChange of input values set local state
//           />
//           <p>12. Were you ontime for mandatory homerooms this pay period?</p>
//           <Select
//             style={{
//               backgroundColor: "white",
//             }}
//             variant="outlined"

//             required

//             name="hw_rm_attended"
//             //sets value of input to value of local state
//             value={this.state.hw_rm_attended}
//             onChange={(event) => this.handleChange(event, "hw_rm_attended")} //sends input values to local state
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//           <p>13. Any comments you would like to leave this pay period?</p>
//           <TextField
//             style={{
//               backgroundColor: "white",
//               margin: "5px",
//               width: "100%",
//             }}
//             //per material UI changes textfield to act like a textarea tag
//             multiline
//             //input field takes up for rows by defaults
//             rows={4}
//             //...will expand up to 8 rows
//             rowsMax={8}
//             variant="outlined"

//             required

//             fullWidth
//             label="comments"
//             name="comments"
//             // sets value of input to local state
//             value={this.state.comments}
//             type="text"
//             maxLength={1000}
//             onChange={(event) => this.handleChange(event, "comments")} //onChange of input values set local state
//           />
//           <Button variant="contained" type="submit" color="primary" className="button">
//             Submit entry
//           </Button>
            
//         </form>