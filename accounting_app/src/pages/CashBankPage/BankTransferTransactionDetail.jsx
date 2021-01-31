import React, { useState, useEffect } from 'react'
import BankTransferServices from '../../services/BankTransferServices'
import JournalEntryServices from '../../services/JournalEntryServices'

import { useParams,useHistory } from 'react-router-dom'

function BankTransferTransactionDetail(props) {

const history = useHistory()
   const { id } = useParams()
   const [detail, setDetail] = useState("")
   const [transactionStatus, setTransactionStatus] = useState("")
   const [loading, setLoading] = useState(false);
   const [journalEntry, setJournalEntry] = useState("")
   const [transactionLine, setTransactionLine] = useState([])

   useEffect(() => {
      setLoading(true)
      BankTransferServices.getBankTransferById(id)
         .then(res => {
            setDetail(res.data)
            setTransactionStatus(res.data.transaction_status)
            JournalEntryServices.getJournalEntryByTransactionId(res.data.journal_id)
            .then(res => { 
               console.log(res.data);
               setJournalEntry(res.data);
               setTransactionLine(res.data.transaction_account_lines)
               
            }).catch(err => { 
               alert(err)
            })
         
         }).catch(err => {
            alert(err)
         }).finally(() => {
            setLoading(false)
         })



   }, [])

   const DetailHandler = (id) => {
      history.push("/account/cash_and_bank/"+id)
   }

   return (
      <>
         {loading ?
            <>
               <div id="bg-loading" className="bg-loading" >
                  <div id="loading" className="loading"></div>
               </div>
            </> :
            <>
               <div className="container-fluid">
                  <div className="header row d-flex justify-content-between">
                     <div>
                        <h5>Transactions</h5>
                        <h3>Bank Transfer {detail.transaction_no_format}</h3>
                     </div>
                     <div>
                        <h5>Status</h5>
                        <h3>{transactionStatus.name}</h3>
                     </div>
                  </div>
                  <hr className="mt-2" />
                  <div className="body mt-5">
                     <div className="row col-lg-12">
                        <div className="col-lg-4 row mb-5">
                           <div className="col-lg-6">
                              <h6>Transfer From :</h6>
                           </div>
                           <div className="col-lg-6">
                              <h6 className="text-primary font-weight-bold" onClick={()=>DetailHandler(detail.refund_id)}>{detail.refund_from}</h6>
                           </div>
                        </div>
                        <div className="col-lg-4 row">
                           <div className="col-lg-3">
                              <h6>Memo:</h6>
                           </div>
                           <div className="col-lg-9">
                              <h6>{detail.memo}</h6>
                           </div>
                        </div>
                        <div className="col-lg-4 row">
                           <div className="col-lg-5">
                              <h6>Transaction No :</h6>
                           </div>
                           <div className="col-lg-7">
                              <h6>{detail.transaction_no}</h6>
                           </div>
                        </div>

                     </div>
                     <div className="col-lg-4 row mb-5">
                        <div className="col-lg-6">
                           <h6 >Deposit To :</h6>
                        </div>
                        <div className="col-lg-6">
                           <h6 className="text-primary font-weight-bold" onClick={()=>DetailHandler(detail.deposit_id)}>{detail.deposit_to}</h6>
                        </div>
                     </div>
                     <div className="col-lg-4 row my-5">
                        <div className="col-lg-6">
                           <h6>Transaction Date :</h6>
                        </div>
                        <div className="col-lg-6">
                           <h6>{detail.transaction_date}</h6>
                        </div>
                     </div>
                     <div className="col-lg-4 row my-5">
                        <div className="col-lg-6">
                           <h6>Amount :</h6>
                        </div>
                        <div className="col-lg-6">
                           <h6>{detail.original_amount_currency_format}</h6>
                           <div className=" text-primary font-weight-bold" data-toggle="modal" data-target=".bd-example-modal-lg">view journal entry</div>
                           <div class="mt-5 modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-lg">
                                 <div class="modal-content">
                                    <div className="p-3 py-5">
                                       Journal Report
                                   <h5>Bank Transfer {journalEntry.transaction_no}</h5>
                                    <table className="table">
                                       <thead>
                                          <tr>
                                             <th>Account Number</th>
                                             <th>Account</th>
                                                <th>Debit (in {journalEntry.currency_code})</th>
                                             <th>Credit (in {journalEntry.currency_code})</th>
                                          </tr>
                                       </thead>
                                          <tbody>
                                             {transactionLine.map(line =>
                                             <tr>
                                                   <td>{line.account_number}</td>
                                                   <td>{line.accountName}</td>
                                                   <td>{line.debit_currency_format}</td>
                                                   <td>{line.credit_currency_format}</td>
                                             </tr>
                                             )}
                                             <hr/>
                                             <tr>
                                                <td className="font-weight-bold">Total</td>
                                                <td className="font-weight-bold"></td>
                                                <td className="font-weight-bold">{journalEntry.total_debit_currency_format}</td>
                                                <td className="font-weight-bold">{journalEntry.total_credit_currency_format}</td>
                                             </tr>
                                       </tbody>
                                    </table>
                                  </div>
                                 </div>
                              </div>
                           </div>


                        </div>

                     </div>
                  </div>
                  <hr />
                  <div className="row d-flex justify-content-between container-fluid">
                     <div>

                        <input type="button" value="Delete" className="btn btn-danger" />
                     </div>
                     <div>
                        <input type="button" className="btn btn-primary dropdown-toggle" id="action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                           value="Action +"
                        />
                        <div className="dropdown-menu" aria-labelledby="action">
                           <div className="dropdown-item" >
                              + Transfer Funds
                        </div>
                           <div className="dropdown-item">
                              + Receive Money
                       </div>
                           <div className="dropdown-item">
                              + Pay Money
                        </div>
                        </div>
                     </div>
                     <div>

                        <input type="button" value="Edit" className="btn btn-success" />
                     </div>

                  </div>
               </div>
            </>}
      </>
   )
}

export default BankTransferTransactionDetail
