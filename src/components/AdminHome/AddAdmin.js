import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import moment from "moment";
import MUITable from '../MUITable/MUITable';



class AddAdmin extends Component {

      


      componentDidMount () {
   this.props.dispatch({
     type: 'GET_ADMIN'
   });
}


componentDidUpdate() {
  console.log('update table')
}

//This function dispatched our newly added admin to the database from state
//We first validate the inputs to make sure we are not sending empty inputs to the server
     




//This function handles storing input values into state on change
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  
    render () {
      const data = this.props.admin
                .map((entry) => [
                entry.first_name,
                entry.last_name,
                entry.email,
                entry.role,
                moment(entry.created_at).format("MMMM Do YYYY")
              ])
      return (
        
      <div><br/>
        <center><h1>Admin Users</h1></center>
        {this.props.user.role === "admin" && (
          <div className="navbuttonscontainer">
            <Link to="/addadminform">
              <Button style={{marginLeft:'1%'}} variant="success">Add Admin</Button>
            </Link>{" "}
            
          </div>
        )}
          

{/* {this.props.videos.map(videoObj => {
      return (
        videoObj.path ? [videoObj.title, videoObj.description, videoObj.visibility, `...${videoObj.path.slice(-40)}`, ''] : []
      );
    });} */}

        <div style={{padding:'1.5%'}}>
    <MUITable
            data={data}
            columns={[
              {name: "First Name"},
              {name: "Last Name"},
              {name: "Admin Email" },
              {name: "Role"},
              {name: "Creation Date"}
            ]}
            // options={}
            title={"LCF Admin List"}
          />
          </div>

       
       
        
      


      </div>


      );
    }
}



const mapStateToProps = state => ({
  user: state.user,
  admin: state.admin.adminlist,
});
   
export default connect(mapStateToProps) (AddAdmin);