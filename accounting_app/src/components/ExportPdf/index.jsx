import React, { useRef } from 'react';
import {useHistory} from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './style.css'
 
class ComponentToPrint extends React.Component {
   useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
  render() {
    return (
       <div className="pdf mr-5">
          <div className="">
          <div className="line-invoice mb-3"></div>
             <h3 className="text-center font-weight-bold">General Journal</h3>
             <div className="line-invoice mb-3 mt-1"></div>
             <div className="col-lg-2 offset-lg-8 font-weight-bold">
                No Transaction :
             </div>
             <div className="col-lg-2 offset-lg-8 font-weight-bold mt-3 mb-3">
                Date : 
             </div>
          </div>
                <TableContainer component={Paper}>
                  <Table className={this.useStyles.table} aria-label="simple table">
                  <TableHead className="table-head">
                     <TableRow>
                        <TableCell align="center">Account</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Debit in (IDR)</TableCell>
                        <TableCell align="center">Credit in (IDR)</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                        <TableRow >
                        <TableCell align="center">1-10001 Cash</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">20.000,00</TableCell>
                        <TableCell align="center">0.00</TableCell>
                        </TableRow>
                        <TableRow >
                        <TableCell align="center">1-10001 Cash</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">0.00</TableCell>
                        <TableCell align="center">20.000,00</TableCell>
                       </TableRow>
                        <TableRow className="table-head">
                      <TableCell align="right" colSpan={2} className="font-weight-bold">TOTAL :</TableCell>
                           <TableCell align="center" className="font-weight-bold">20.000,00	</TableCell>
                           <TableCell align="center" className="font-weight-bold">20.000,00</TableCell>
                           </TableRow>
                  </TableBody>
                  </Table>
          </TableContainer>
          <div className="row mt-5 mx-2">
             <div className=" text-center font-weight-bold maker py-2">Made by,</div>
             <div className=" text-center font-weight-bold maker py-2">Checked by,</div>
             <div className=" text-center font-weight-bold maker py-2">Approved by,</div>
             <div className=" text-center font-weight-bold maker py-2">Accepted by,</div>
             <div className=" text-center font-weight-bold maker-signature"></div>
             <div className=" text-center font-weight-bold maker-signature"></div>
             <div className=" text-center font-weight-bold maker-signature"></div>
             <div className=" text-center font-weight-bold maker-signature"></div>
          </div>
      </div>
    );
  }
}
 
const ExportPdf = () => {
   const componentRef = useRef();
   const history = useHistory();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
   
   const handleBack = () => { 
      history.push("/general-journey/transaction")
   }
 
  return (
    <div className="action-print">
      <ComponentToPrint ref={componentRef} />
        <button className="btn btn-danger offset-lg-5 mr-5" onClick={handleBack}>Back</button>
        <button className="btn btn-success ml-4" onClick={handlePrint}>Print Out</button>
    </div>
  );
};

export default ExportPdf