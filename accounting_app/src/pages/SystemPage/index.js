import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as XLSX from 'xlsx'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class SystemPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data:[]
      }
   }

    useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    
   //   createData(OrderDate,Region,Rep,Item,Units) {
   //    return { name, calories, fat, carbs, protein };
   //  }
 useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

   importHandler = (file) => {
      var date = new Date("2020-02-18")
      console.log("idi date " + date.getDate());
      console.log("idi date " + date.getDay());
      console.log("idi date " + date.getFullYear());
     const promise = new Promise((resolve, reject) => {
       const fileReader = new FileReader();
       fileReader.readAsArrayBuffer(file);
 
       fileReader.onload = (e) => {
         const bufferArray = e.target.result;
 
         const wb = XLSX.read(bufferArray, { type: "buffer" });
         console.log();
         const wsname = wb.SheetNames[0];
         console.log(wsname);
         const ws = wb.Sheets[wsname];
         console.log(ws);
         const data = XLSX.utils.sheet_to_json(ws);
         
         console.log(data);
 
         resolve(data);
       };
 
       fileReader.onerror = (error) => {
         reject(error);
       };
     });
 
      promise.then((d) => {
      // this.props.dataImport(d)
         console.log(d);
        this.setState({data:d})
     });
   };
   
   render() {
      return (
         <div>
            <input type="file" onChange={(e) => { 
               const file = e.target.files[0];
               console.log(file);
               this.importHandler(file)
            }} />

            <TableContainer component={Paper}>
                  <Table className={this.useStyles.table} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell align="center">OrderDate</TableCell>
                        <TableCell align="center">Item</TableCell>
                        <TableCell align="center">Units</TableCell>
                        <TableCell align="center">Unit Cost</TableCell>
                        <TableCell align="center">Total</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {this.state.data.map((row) => (
                        <TableRow key={row.name}>
                           <TableCell align="center">{row.OrderDate}</TableCell>

                        <TableCell align="center">{row.Item}</TableCell>
                        <TableCell align="center">{row.Units}</TableCell>
                        <TableCell align="center">{row.UnitCost}</TableCell>
                        <TableCell align="center">{row.Total}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
                  </Table>
               </TableContainer>

         </div>
      );
   }
}


const mapStateToProps = (state) => ({
   data: state.dataImport,
 })
 
 const mapDispatchToProps = (dispatch) => ({
   dataImport: (data) => dispatch({ type: "DATA", payload: data }),

 })
 
 
 
 export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SystemPage));