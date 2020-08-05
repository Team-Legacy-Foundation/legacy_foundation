import React, {Component} from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { createMuiTheme } from '@material-ui/core';
// import red from '@material-ui/core/colors/red';
//MAKE SURE TO NOT USE PROPS IN STATE
class MUITable extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_STUDENTS",
    });

    this.props.dispatch({
      type: "FETCH_ENTRIES_FOR_ADMIN",
    });
  }

  state = {
    title: this.props.title,
    setResponsive: "vertical",
    setTableBodyHeight: "400px",
    setTableBodyMaxHeight: " ",
    options: {
      filter: true,
      filterType: "dropdown",
      responsive: "vertical",
      tableBodyHeight: "400px",
      tableBodyMaxHeight: " ",
      selectableRows: false, //false means checkboxes are hidden
    },
  };

  render() {
    const columns = [
      {
        name: "Delete",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            return (
              <button
                onClick={() => {
                  const { data } = this.props;
                  data.shift();
                  this.setState({ data });
                }}
              >
                Delete
              </button>
            );
          },
        },
      },
      {
        name: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <button
                onClick={() =>
                  window.alert(
                    `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
                  )
                }
              >
                Edit
              </button>
            );
          },
        },
      },
      {
        name: "First Name",
        options: {
          filter: true,
        },
      },
      {
        label: "Last Name",
        name: "Last Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Grade",
        options: {
          filter: false,
        },
      },
      {
        name: "Graduation Year",
        options: {
          filter: true,
        },
      },
      {
        name: "School Name",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "LCF ID",
        options: {
          filter: true,
        },
      },
      {
        name: "LCF Start Date",
        options: {
          filter: true,
        },
      },
      {
        name: "Student Email",
        options: {
          filter: true,
        },
      },
      {
        name: "Student PIF Amount ($)",
        options: {
          filter: true,
        },
      },
    ];
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Responsive Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.options.responsive}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) => this.setState({ setResponsive: e.target.value })}
          >
            <MenuItem value={"vertical"}>vertical</MenuItem>
            <MenuItem value={"standard"}>standard</MenuItem>
            <MenuItem value={"simple"}>simple</MenuItem>

            <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
            <MenuItem value={"scrollMaxHeight"}>
              scrollMaxHeight (deprecated)
            </MenuItem>
            <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Table Body Height
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.options.tableBodyHeight}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) =>
              this.setState({ setTableBodyHeight: e.target.value })
            }
          >
            <MenuItem value={""}>[blank]</MenuItem>
            <MenuItem value={"400px"}>400px</MenuItem>
            <MenuItem value={"800px"}>800px</MenuItem>
            <MenuItem value={"100%"}>100%</MenuItem>
          </Select>
        </FormControl>

        <MUIDataTable
          title={this.props.title}
          data={this.props.data}
          columns={columns}
          options={this.state.options}
          // theme={ createMuiTheme({
          //             palette: { type: 'dark' },
          //             primary: red,
          //             typography: { useNextVariants: true }
          //          })}
        />
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
});

export default connect(mapStateToProps)(MUITable);