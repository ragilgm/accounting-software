import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import JournalEntryServices from '../../../services/JournalEntryServices'
import './style.css'
import swal from 'sweetalert'

function Transaction() {


   const { id } = useParams()
   const [loading, setLoading] = useState(false);
   const [journalEntry, setJournalEntry] = useState("")
   const [transactionLine, setTransactionLine] = useState([])
   const [transactionStatus, setTransactionStatus] = useState([])
   const [attachment, setAttachment]= useState([])


   useEffect(() => {
      setLoading(true)
      JournalEntryServices.getJournalEntryByTransactionId(id)
         .then(res => {
            console.log(res.data);
            setJournalEntry(res.data);
            setTransactionLine(res.data.transaction_account_lines)
            setTransactionStatus(res.data.transaction_status.name)
            if (res.data.attachments != null) { 
               setAttachment(res.data.attachments)
            }
         }).catch(err => {
            alert(err)
         }).finally(setLoading(false))

   }, [])

   const history = useHistory()


   const handlePreview = (id) => {
      history.push("/journal-entry/preview/"+id)
   }

   const handleOpenAttachment = (filename) => {
      var fileextention = filename.split(".")
      if (fileextention[1] !== "pdf") { 
         history.push("/attachment/image/"+filename)
      } else {
         history.push("/attachment/pdf/"+filename)  
      }
   }
   
   const deleteTransactionHandler = () => { 

      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this transaction!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
       .then((willDelete) => {
          if (willDelete) {
            JournalEntryServices.deleteJournalHandler(id)
            .then(() => { 
               swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
               });
               history.push("/account")
            }).catch(err => { 
                  swal(err, {
                     icon: "error",
                   });
               })
         
         } else {
           swal("Your imaginary file is safe!");
         }
       });

 
   }

   const cloneTransactionHandler = () => { 
      history.push("/general-journey/new/duplicateFrom/"+id)
   }

   const editTransactionHandler = () => { 
      history.push("/general-journey/edit/"+id)
   }

   const backHandler = () => {
      history.push("/account")
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

               <div className="header mb-5 row d-flex justify-content-between container-fluid">
                  <div>
                     <h5>Transaction</h5>
                     <h3>Journal Entry {journalEntry.transaction_no_format}</h3>
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
                        <div className="font-weight-bold mt-3">{journalEntry.transaction_date}</div>
                     </div>
                     <div className="col-lg-3">
                        <div className="font-weight-bold">No Transaction :</div>
                        <div className="font-weight-bold mt-3">{journalEntry.transaction_no}</div>
                     </div>
                     <div className="col-lg-2">
                        <div className="font-weight-bold">Attachments :</div>
                        {attachment.length > 0 ? <>
                              {attachment.map((data, idx) => 
                                 <button className=" btn btn-sm btn-primary mr-2 mt-2" key={idx}
                                    onClick={() => handleOpenAttachment(data)}>File {idx + 1} ({data.split(".")[1]})</button>
                              )}
                           
                           </> : <></>}
                     </div>
                  </div>
                  <hr />
                  <div className="">
                     <div>
                        <div className="col-lg-12 row mt-5">
                           <div className="col-lg-2  font-weight-bold">Account Number</div>
                           <div className="col-lg-2  font-weight-bold">Account</div>
                           <div className="col-lg-4  font-weight-bold">Description</div>
                           <div className="col-lg-2  font-weight-bold">Debit (in {journalEntry.currency_code})</div>
                           <div className="col-lg-2  font-weight-bold">Credit (in {journalEntry.currency_code})</div>
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
                           <div className="col-lg-2  font-weight-bold">{journalEntry.total_debit_currency_format}</div>
                           <div className="col-lg-2  font-weight-bold">{journalEntry.total_credit_currency_format}</div>
                        </div>


                     </div>
                     <div className="action mt-5">
                        <div className="row d-flex justify-content-between">
                           <div className="col-lg-4">
                              <input className="btn btn-danger" type="button" value="Hapus" onClick={deleteTransactionHandler} />
                           </div>

                           <div className="col-lg-4 row">
                              <input type="button" className="btn btn-primary mr-3" value="Print & Preview" onClick={()=>handlePreview(journalEntry.id)} />
                              <button type="button" class="btn btn-secondary dropdown-toggle" id="action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                 style={{ height: 30, textAlign: "center", width: 100, fontSize: 12, backgroundColor: '#4269f5' }}>
                                 Action
                          </button>
                              <div class="dropdown-menu" aria-labelledby="action">
                                 <div class="dropdown-item" onClick={cloneTransactionHandler}>
                                    <i class="fas fa-upload mr-3" ></i>Clone Transaction</div>
                                 <div class="dropdown-item">
                                    <i class="fas fa-book mr-3"></i>Set Recuring</div>
                              </div>
                           </div>

                           <div className="col-lg-4 row">
                              <div className="col-lg-6">
                              </div>
                              <div className="col-lg-6 row">
                                 <input className="btn btn-secondary mr-3" type="button" value="Back" onClick={backHandler} />
                                 <input className="btn btn-success" type="button" value="Edit" onClick={editTransactionHandler} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </>}
      </>
   )
}


export default Transaction
