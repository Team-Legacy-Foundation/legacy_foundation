import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import Button from "react-bootstrap/Button";


//The purpose of this page is to update the student's entry this past pay period

class AddAdminForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    created_at: moment.utc().format(),
  };
  componentDidMount() {}

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  registerAdmin = (event) => {
    event.preventDefault();

    console.log("we are about to send the state", this.state);

    if (
      this.state.first_name &&
      this.state.last_name &&
      this.state.email &&
      this.state.password &&
      this.state.role
    ) {
      //send the new student to the server through a redux saga
      this.props.dispatch({
        type: "REGISTER_ADMIN",
        payload: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          role: this.state.role,
          email: this.state.email,
          password: this.state.password,
          created_at: this.state.created_at,
        },
      });

      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
      });

      this.props.history.push("/home");
    } else {
      this.props.dispatch({ type: "ADD_ADMIN_ERROR" });
    }
  }; // end registerAdmin

  render() {
    // const data = this.props.admin.map((entry) => [
    //   entry.first_name,
    //   entry.last_name,
    //   entry.email,
    //   entry.role,
    //   moment(entry.created_at).format("MMMM Do YYYY"),
    // ]);
    return (
      <div>
        <br />
        <center>
          <h1>Add An Admin</h1>
        </center>
        <Paper
          elevation={5}
          style={{ width: "95%", margin: "3% auto", padding: "2%" }}
        >
          <Form className="addstudent">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor("first_name")}
                />
              </Col>

              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor("last_name")}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.setState({ role: event.target.value })
                  }
                >
                  <option value="">Pick From Below</option>
                  <option value="admin">Regular Admin</option>
                  <option value="super admin">Super Admin</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  placeholder="Admin Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </Col>
              <Col>
                <Form.Label>Admin Password</Form.Label>
                <Form.Control
                  placeholder="Admin Password"
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </Col>
            </Row>
            <center>
              <Link to="/home">
                <Button
                  onClick={(event) => this.registerAdmin(event)}
                  variant="success"
                  type="submit"
                  style={{ width: "20%", margin:'1%' }}
                >
                  Create New Admin Account
                </Button>
              </Link>
            </center>
          </Form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entries: state.students.studententriesadmin,
  admin: state.admin.adminlist,
});

export default withRouter(connect(mapStateToProps)(AddAdminForm));
