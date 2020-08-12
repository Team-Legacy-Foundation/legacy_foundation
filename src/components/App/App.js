import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import MakeEntry from "../MakeEntry/MakeEntry";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ForgotPasswordAdmin from "../ForgotPassword/ForgotPasswordAdmin";
import PastStudentEntries from "../PastStudentEntries/PastStudentEntries";

import "./App.css";
import PastAdminReports from "../PastAdminReports/PastAdminReports";
import AddStudent from '../AdminHome/AddStudent';
import UpdateStudent from '../AdminHome/UpdateStudent';
import UpdatePassword from "../AdminHome/UpdatePassword";
import StudentEntries from '../AdminHome/StudentEntries';
import AdminUpdateEntry from '../AdminHome/AdminUpdateEntry';
import AddAdmin from '../AdminHome/AddAdmin';
import AdminResetPassword from '../AdminHome/AdminResetPassword';
import StudentResetPassword from '../StudentHome/ResetStudentPassword';
import OpenTransactions from '../OpenTransactions/OpenTransactions';
import ChargeStudent from '../ChargeStudent/ChargeStudent';
import AddAdminForm from '../AdminHome/AddAdminForm';
import Instructions from '../Instructions/Instructions';



class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
    
    

    // this.props.dispatch({
    //   type: "GET_STUDENTS",
    // });

    // this.props.dispatch({
    //   type: "FETCH_ENTRIES_FOR_ADMIN",
    // });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/about" component={AboutPage} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}

            <ProtectedRoute exact path="/home" component={UserPage} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute exact path="/info" component={InfoPage} />
            <ProtectedRoute exact path="/makeentry" component={MakeEntry} />
            {/* <Route
              exact
              path="/forgotpassword/:email"
              component={ForgotPassword}
            />
            <Route
              exact
              path="/forgotpassword/admin/:email"
              component={ForgotPasswordAdmin}
            /> */}
            <ProtectedRoute
              exact
              path="/resetstudentpassword"
              component={StudentResetPassword}
            />
            <ProtectedRoute
              exact
              path="/paststudententries"
              component={PastStudentEntries}
            />
            <ProtectedRoute
              exact
              path="/pastadminreports"
              component={PastAdminReports}
            />
            <ProtectedRoute exact path="/addstudent" component={AddStudent} />
            <ProtectedRoute
              exact
              path="/updatestudent/:lcf_id"
              component={UpdateStudent}
            />
            <ProtectedRoute
              exact
              path="/updatepassword/:lcf_id"
              component={UpdatePassword}
            />
            <ProtectedRoute
              exact
              path="/totalstudententries"
              component={StudentEntries}
            />
            <ProtectedRoute
              exact
              path="/adminentryupdate/:lcf_id"
              component={AdminUpdateEntry}
            />
            <ProtectedRoute exact path="/adminusers" component={AddAdmin} />
            <ProtectedRoute exact path="/addadminform" component={AddAdminForm} />
            <ProtectedRoute
              exact
              path="/resetadminpassword"
              component={AdminResetPassword}
            />
            <ProtectedRoute
              exact
              path="/opentransactions"
              component={OpenTransactions}
            />
            <ProtectedRoute
              exact
              path="/chargestudent"
              component={ChargeStudent}
            />
            <ProtectedRoute
              exact
              path="/instructions"
              component={Instructions}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(App);
