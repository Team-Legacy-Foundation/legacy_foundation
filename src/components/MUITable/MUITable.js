import React, {Component} from "react";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { createMuiTheme } from '@material-ui/core';
// import red from '@material-ui/core/colors/red';


class MUITable extends Component {

        state = {
            title: this.props.title,
            data: this.props.data,
            columns: this.props.columns,
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
                    title={this.state.title}
                    data={this.state.data}
                    columns={this.state.columns}
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