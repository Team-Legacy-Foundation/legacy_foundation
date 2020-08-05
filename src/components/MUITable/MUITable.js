import React, {Component} from "react";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { createMuiTheme } from '@material-ui/core';
// import red from '@material-ui/core/colors/red';


// import { createMuiTheme } from '@material-ui/core';
// import green from '@material-ui/core/colors/green';

// This is the base preset for the custom material-table component since most of the tables
// display at least these columns.
// const tablePreferences = {
//   moreInfoColumnIndex: 3,
//   columns: [
//     {
//       name: 'Artwork',
//       options: {
//         filter: false,
//         sort: false
//       }
//     },
//     {
//       name: 'Name',
//       options: {
//         filter: true
//       }
//     },
//     {
//       name: 'More Info',
//       options: {
//         filter: false,
//         sort: false
//       }
//     },
//     {
//       name: 'Player Range',
//       options: {
//         filter: true,
//         sort: false
//       }
//     },
//     {
//       name: 'Play Time',
//       options: {
//         filter: true,
//         sort: false
//       }
//     }
//   ],
//   options: {
//     selectableRows: 'none',
//     responsive: 'standard',
//     // Don't show the default print or download buttons that come with the default table.
//     print: false,
//     download: false,
//     filter: true,
//     filterType: 'dropdown'
//   },
//   theme: createMuiTheme({
//     palette: { type: 'dark' },
//     primary: green,
//     typography: { useNextVariants: true }
//   })
// };

// export default tablePreferences;


class MUITable extends Component {

        state = {
           
            setResponsive: "vertical",
            setTableBodyHeight: "400px",
            setTableBodyMaxHeight: " ",
             options: {
                 filter: true,
                 filterType: "dropdown",
                 responsive: "vertical",
                 tableBodyHeight: "400px",
                tableBodyMaxHeight: " ",
                
                },

        }

       


    render(){


        return(

             <React.Fragment>

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.options.responsive}
                        style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
                        onChange={e => this.setState({ setResponsive: e.target.value })}>

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
                        <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.options.tableBodyHeight}
                        style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
                        onChange={e => this.setState({ setTableBodyHeight: e.target.value }) }
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
                    columns={this.props.columns}
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


export default MUITable;