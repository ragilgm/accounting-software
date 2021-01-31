import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import OpenningBalanceServices from '../../../services/OpenningBalanceServices'

function OpeningBalanceTransaction() {
   const { id } = useParams()
   const [loading, setLoading] = useState(false);
   const [openingBalance, setOpeningBalance] = useState("")
   const [transactionLine, setTransactionLine] = useState([])
   const [transactionStatus, setTransactionStatus] = useState([])


   useEffect(() => {
      setLoading(true)
      OpenningBalanceServices.getOpeningBalanceTransaction(id)
         .then(res => {
            console.log(res.data);
            setOpeningBalance(res.data);
            setTransactionLine(res.data.transaction_account_lines)
            setTransactionStatus(res.data.transaction_status.name)
         }).catch(err => {
            alert(err)
         }).finally(setLoading(false))

   }, [])

   const history = useHistory()


   return (
      <>
         {loading ?
            <>
                  <div id="bg-loading" className="bg-loading" >
               <div id="loading" className="loading"></div>
            </div>
            </> :
            <>

               <div className="header mb-5 row d-flex justify-content-between container-fluid">
                  <div>
                     <h5>Transaction</h5>
                     <h3>Opening Balance {openingBalance.transaction_no_format}</h3>
                  </div>
                  <div>
                     Status
             <h3>{transactionStatus}</h3>
                  </div>
               </div>
               <hr />
               <div className="body">
                  <div className="row mb-5 mt-5">
                     <div className="col-lg-3">
                        <div className="font-weight-bold">Transaction Date :</div>
                        <div className="font-weight-bold mt-3">{openingBalance.transaction_date}</div>
                     </div>
                     <div className="col-lg-3">
                        <div className="font-weight-bold">No Transaction :</div>
                        <div className="font-weight-bold mt-3">{openingBalance.transaction_no}</div>
                     </div>
                  </div>
                  <hr />
                  <div className="">
                     <div>
                        <div className="col-lg-12 row mt-5">
                           <div className="col-lg-2  font-weight-bold">Account Number</div>
                           <div className="col-lg-2  font-weight-bold">Account</div>
                           <div className="col-lg-4  font-weight-bold">Description</div>
                           <div className="col-lg-2  font-weight-bold">Debit (in {openingBalance.currency_code})</div>
                           <div className="col-lg-2  font-weight-bold">Credit (in {openingBalance.currency_code})</div>
                        </div>

                        {transactionLine.map(trx =>
                           <div className="col-lg-12 my-3 row" key={trx.id}>
                              <div className="col-lg-2">{trx.account_number}</div>
                              <div className="col-lg-2">{trx.accountName}</div>
                              <div className="col-lg-4">{trx.description}</div>
                              <div className="col-lg-2">{trx.debit_currency_format}</div>
                              <div className="col-lg-2">{trx.credit_currency_format}</div>
                           </div>
                        )}
                        <div className="col-lg-12 row mt-5">
                           <div className="col-lg-2  font-weight-bold"></div>
                           <div className="col-lg-2  font-weight-bold"></div>
                           <div className="col-lg-4  font-weight-bold"></div>
                           <div className="col-lg-2  font-weight-bold">Total Debit</div>
                           <div className="col-lg-2  font-weight-bold">Total Credit</div>
                        </div>
                        <div className="col-lg-12 row mt-3">
                           <div className="col-lg-2  font-weight-bold"></div>
                           <div className="col-lg-2  font-weight-bold"></div>
                           <div className="col-lg-4  font-weight-bold"></div>
                           <div className="col-lg-2  font-weight-bold">{openingBalance.total_debit_currency_format}</div>
                           <div className="col-lg-2  font-weight-bold">{openingBalance.total_credit_currency_format}</div>
                        </div>


                     </div>
                     
                  </div>
               </div>
            </>}
      </>
   )
}

export default OpeningBalanceTransaction
