import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Iframe from 'react-iframe'

import './StudentHome.css';

class StudentHome extends Component {
  render() {
    return (
      <div>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:'2%'}}>
            <center>
          <h1>
            Hello there {this.props.user.email}!
          </h1>
          <h3>LCF ID: INSERT VALUE</h3></center>
          </Grid>

 {/* <Grid item xs={12} sm={4} md={4} lg={4} style={{margin:'3%'}}>
   </Grid> */}

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper elevation={5} style={{ border: "", padding:'5%', margin:'5%' }}>
             <h3>Notification Portal</h3>
             <hr></hr>
              This could be a tool for the LCF folks to type something up they want sent out for every student to see? But where/how do they send something out. Create a portal on admin end? STRETCH <br/><br/>
              This could also be where students who had data changed get told about it. How would that functionality work?<br/><br/>
              Conditionally render that if nothing here, put something like "no new notifications"
            </Paper>
            <br />
            <br />
          </Grid>


          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper elevation={5} style={{ border: "", padding:'5%', margin:'5%' }}>
              <center>
              <Iframe
                // style="width: 90%"
                src="https://calendar.google.com/calendar/embed?title=Legacy%20Calendar&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=b88a8t126lf3cofcti721mu8pc%40group.calendar.google.com&amp;color=%23333333&amp;src=cfmdroilnfj71ep58mjic8bjv0%40group.calendar.google.com&amp;color=%238D6F47&amp;src=60i842s5uglu16too6f0bs5nq0%40group.calendar.google.com&amp;color=%236B3304&amp;src=66tdpj4tskh9o7qdb0n5ffs81k%40group.calendar.google.com&amp;color=%2323164E&amp;src=prbvfdkrlj30d1p4osinnmsqq0%40group.calendar.google.com&amp;color=%232F6309&amp;src=5ukrumpstnq37u91sc23jo3iio%40group.calendar.google.com&amp;color=%23711616&amp;src=f061r68qd6vc7db0l4qi5k0jio%40group.calendar.google.com&amp;color=%2329527A&amp;src=rb038vtg2r577kgn962nlvlru8%40group.calendar.google.com&amp;color=%23B1440E&amp;src=kbkdiah43goo8388rc29f6bk3k%40group.calendar.google.com&amp;color=%23B1365F&amp;src=fargoschools.org_ag5ihl34v5q8l3u50rttd05k24%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=America%2FChicago"
                width="100%"
                height="400"
                frameborder="0"
                scrolling="no"
                
              ></Iframe>
              </center>
            </Paper>
          </Grid>
          
          
         
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Paper elevation={5} style={{padding:'5%', margin:'5%'}}>
            <h3>Payment Information</h3>
            <hr></hr>
      
            Last Paycheck: AMOUNT
            <br />
            Balance to Pay: AMOUNT
            <br />
            Total Savings to Date: AMOUNT
            </Paper>
            </Grid>
          
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(StudentHome));
