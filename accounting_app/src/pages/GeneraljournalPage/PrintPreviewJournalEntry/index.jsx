import React, { useRef, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import JournalEntryServices from '../../../services/JournalEntryServices'
import './style.css'

class ComponentToPrint extends React.Component {
   useStyles = makeStyles({
      table: {
         minWidth: 650,
      },
   });

   constructor(props) {
      super(props);
      this.state = {
         journalEntry: "",
         transactionLine: "",
         transactionStatus: ""
      }
   }



   render() {

      const { journalEntry, transactionLine } = this.props
      return (
         <div className="pdf mr-5 paper">
            <div className="">
               <div className="line-invoice mb-3"></div>
               <h3 className="text-center font-weight-bold">JOURNAL ENTRY</h3>
               <div className="line-invoice mb-3 mt-1"></div>
               <div className="col-lg-12 font-weight-bold row mb-5">
                  <table>
                     <tr>
                        <td> No Transaction </td>
                        <td>:</td>
                        <td> {journalEntry.transaction_no}</td>
                     </tr>
                     <tr>
                        <td> Date </td>
                        <td>:</td>
                        <td>{journalEntry.transaction_date}</td>
                     </tr>
                  </table>
                  

               </div>
            </div>
            <TableContainer component={Paper}>
               <Table className={this.useStyles.table} aria-label="simple table">
                  <TableHead className="table-head">
                     <TableRow>
                        <TableCell>Account</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Debit in ({journalEntry.currency_code})</TableCell>
                        <TableCell>Credit in ({journalEntry.currency_code})</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {transactionLine.map(trx =>
                     <TableRow >
                           <TableCell>{trx.account_number} {trx.accountName}</TableCell>
                        <TableCell >{trx.description}</TableCell>
                        <TableCell >{trx.debit_currency_format}</TableCell>
                        <TableCell >{trx.credit_currency_format}</TableCell>
                     </TableRow>
                        )}
                     <TableRow>
                        <TableCell colSpan={2} className="font-weight-bold">TOTAL :</TableCell>
                        <TableCell className="font-weight-bold">
                           {journalEntry.total_debit_currency_format}	</TableCell>
                        <TableCell className="font-weight-bold">
                           {journalEntry.total_credit_currency_format}</TableCell>
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

const PrintPreviewJournalEntry = () => {
   const { id } = useParams()
   const [loading, setLoading] = useState(false);
   const [journalEntry, setJournalEntry] = useState("")
   const [transactionLine, setTransactionLine] = useState([])
   const [transactionStatus, setTransactionStatus] = useState([])


   useEffect(() => {
      setLoading(true)
      JournalEntryServices.getJournalEntryByTransactionId(id)
         .then(res => {
            console.log(res.data);
            setJournalEntry(res.data);
            setTransactionLine(res.data.transaction_account_lines)
            setTransactionStatus(res.data.transaction_status.name)
         }).catch(err => {
            alert(err)
         }).finally(setLoading(false))

   }, [])
   const componentRef = useRef();
   const history = useHistory();
   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
   });

   const handleBack = (id) => {
      history.push("/journal-entries/"+id)
   }

   return (
      <>
         {loading ?
            <>
               <div id="bg-loading" className="bg-loading" >
                  <div id="loading" className="loading"></div>
               </div>
            </>
            :
            <>
               <div className="action-print ">
                  <ComponentToPrint ref={componentRef} journalEntry={journalEntry} transactionLine={transactionLine} transactionStatus={transactionStatus} />
                  <div className="col-lg-12 d-flex justify-content-center">
                  <input type="button" className="btn btn-danger mr-3 mt-5" onClick={()=>handleBack(journalEntry.id)} value="Back"/>
                  <input type="button" className="btn btn-primary  mt-5" onClick={handlePrint} value="Print Out"/>
                  </div>
               </div>
            </>}
      </>
   );
};

export default PrintPreviewJournalEntry