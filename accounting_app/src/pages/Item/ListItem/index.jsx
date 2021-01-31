import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './style.css'

class ListItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         rows: [
            {
               id: 1,
               kode:123123,
               name: 'Frozen yoghurt',
               barcode: "1234fgnj1",
               merek: "a",
               group: "a",
               
            },
          
            {
               id: 1,
               kode:123123,
               name: 'Frozen yoghurt',
               barcode: "1234fgnj1",
               merek: "a",
               group: "a",
               
            },
          
            {
               id: 1,
               kode:123123,
               name: 'Frozen yoghurt',
               barcode: "1234fgnj1",
               merek: "a",
               group: "a",
               
            },
          
            {
               id: 1,
               kode:123123,
               name: 'Frozen yoghurt',
               barcode: "1234fgnj1",
               merek: "a",
               group: "a",
               
            },
          
         ]
      }
   }

   useStyles= makeStyles ((theme) => ({
      button: {
        margin: theme.spacing(1),
      },
           table: {
        minWidth: 650,
      }

    }));
    
    
   render() {
      return (
         <div>
            <div className="card">
               <div className="container">
                  <div className='row'>   
                     <div className="col-lg-12 title-item">
                        <h1>DAFTAR ITEM</h1>
                        <hr/>
                     </div>
                     <div className="menu col-lg-12 col-sm-12">
                        <Button
                           variant="contained"
                           color="secondary"
                           className={this.useStyles.button}
                           // startIcon={<DeleteIcon />}
                           >
                           ADD ITEM
                           </Button>
                           {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
                           <Button
                           variant="contained"
                           color="primary"
                           className={this.useStyles.button}
                           // endIcon={<Icon>send</Icon>}
                           >  
                           EXPORT TO XLS
                        </Button>
                           <Button
                           variant="contained"
                           color="primary"
                           className={this.useStyles.button}
                           // endIcon={<Icon>send</Icon>}
                           >  
                           Filter / Search
                        </Button>
                     </div>
                     <TableContainer component={Paper}>
           <Table className={this.useStyles.table} aria-label="caption table">
             <TableHead>
               <TableRow>
                 <TableCell align="center">ID</TableCell>
                 <TableCell align="center">KODE</TableCell>
                 <TableCell align="center">NAMA</TableCell>
                 <TableCell align="center">ACTION</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {this.state.rows.map((row) => (
                 <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.kode}</TableCell>
                   <TableCell align="center">{row.name}</TableCell>
                     <TableCell align="center">
                     <i class="fas fa-eye"></i>
                     <i class="ml-2 fas fa-edit"></i>
                     <i class="ml-2 fas fa-trash"></i>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>

                  </div>
               </div>
            </div>
         </div>
       );
   }
}

export default ListItem;
