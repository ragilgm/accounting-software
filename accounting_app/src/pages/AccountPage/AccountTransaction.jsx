import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AccountServices from '../../services/AccountServices';
import swal from 'sweetalert'
function AccountTransaction() {
   const history = useHistory()

   const { account_id } = useParams();
   const [render, setRender] = useState("")
   const [loading, setLoading] = useState(false);
   const [account, setAccount] = useState("")
   const [transaction, setTransaction] = useState([])
   const [categoryAccount, setCategoryAccount] = useState("")
   const [transactionFilter, setTransactionFilter] = useState({
      id: "",
      from: "",
      to:""
   })


   useEffect(() => {
      setLoading(true)
      AccountServices.getAccountById(account_id)
         .then(res => {
            setAccount(res.data)
            setCategoryAccount(res.data.category)
            setTransaction(res.data.transactions)
         }).catch(err => {
            alert(err)
         }).finally(() => {
            setLoading(false)
         })
   }, [render])

   const editAccountHandler = (id) => {
      history.push("/account/edit/" + id)
   }

   const deleteAccountHandler = (id) => {
      setLoading(true)
      AccountServices.deleteAccount(id)
         .then(res => {
            	swal({
							title: "Delete Successfull..",
							icon: "success",
						 });
            history.push("/account")
         }).catch(err => {
            swal({
               title: err,
               icon: "error",
             });
         }).finally(() => {
            setLoading(false)
         })
   }

   const filterTransactionDate=()=>{ 
      if (transactionFilter.from === "" || transactionFilter.to==="") {
         alert("from date or to date not bee null")
         return
      } else { 
         AccountServices.filterTransactionAccount(account_id, transactionFilter.from, transactionFilter.to)
            .then(res => { 
               console.log(res.data);
               setAccount(res.data)
               setCategoryAccount(res.data.category)
               setTransaction(res.data.transactions)
            })
      }
   }

   
   const changeTransactionFilter = (e) => {
      console.log(e.target.value);
      setTransactionFilter({...transactionFilter, [e.target.name]:e.target.value})
    }

   const bankTransferHandler = () => { 
      history.push("/banktransfer/new")
   }

   const transactionDetailHandler = (id, type) => {
      switch (type) {
         case "Journal Entry":
            history.push("/journal-entries/" + id)
            break;
         case "Bank Transfer":
            history.push("/banktransfer/detail/" + id)
            break;
         case "Reversal":
            history.push("/reversal/" + id)
            break;
         case "Opening Balance":
            history.push("/opening-balance/" + id)
            break;

         default:
            break;
      }

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
               <div className="container-fluid">
                  <div className="header d-flex justify-content-between">
                     <div className="title">
                        <h5 className="text-secondary">{categoryAccount.name}</h5>
                        <h3>({account.number}) - {account.name}</h3>
                     </div>
                     <div>
                        <div className="row">
                           {categoryAccount.id === 3 ? <>
                          
                              <div className="mr-3">
                                 <input type="button" class="btn btn-primary dropdown-toggle" id="action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"

                                    value="New Transaction +"
                                 />
                                 <div class="dropdown-menu" aria-labelledby="action">
                                    <div class="dropdown-item" onClick={bankTransferHandler}>
                                    + Transfer Funds
                                    </div>
                                    <div class="dropdown-item">
                                    + Receive Money
                                    </div>
                                    <div class="dropdown-item">
                                    + Pay Money 
                                    </div>
                                 </div>
                              </div>
                              <div className=""> <input type="button" className="btn btn-success " value="Edit Account" onClick={() => editAccountHandler(account.id)} />
                              </div>

                           </> : <>
                                 {!account.is_lock ?
                                    <>
                                       <div> <input type="button" className="btn btn-danger mr-2" value="Delete Account" onClick={() => deleteAccountHandler(account.id)} /></div>
                                    </> : <></>}
                                 <div className=""> <input type="button" className="btn btn-success " value="Edit Account" onClick={() => editAccountHandler(account.id)} />
                                 </div>
                              </>}
                        </div>
                     </div>
                  </div>
                  <hr />
                  <div className="body row">
                     <div className="col-lg-4 col-sm-10">
                        <h3>Account Transactions</h3>
                     </div>
                     <div className="form-group row col-lg-4 col-sm-10">
                        <div className="col-lg-6 col-sm-10  pt-2">
                           <label htmlFor="from">Transaction From</label>
                        </div>
                        <div className="col-lg-6 col-sm-10">
                           <input type="date" name="from" id="from" className="form-control" onChange={changeTransactionFilter} />
                        </div>
                     </div>
                     <div className="form-group row col-lg-4 col-sm-10">
                        <div className="col-lg-2 col-sm-10 pt-2">
                           <label htmlFor="to">And</label>
                        </div>
                        <div className="col-lg-6 col-sm-10">
                           <input type="date" name="to" id="to" className="form-control" onChange={changeTransactionFilter} />
                        </div>
                        <div className="col-lg-4 col-sm-10">
                           <input type="button" value="Apply" className="btn btn-primary" onClick={filterTransactionDate} />
                        </div>
                     </div>
                  </div>
                  {transaction.length === 0 ?
                     <>
                        <h5 className="text-secondary text-center mt-5">No Transaction Record</h5>
                     </>
                     :
                     <>
                        <table className="table  mt-5">
                           <thead>
                              <tr>
                                 <th>Date</th>
                                 <th>Person</th>
                                 <th>Description</th>
                                 <th>Received (in IDR)</th>
                                 <th>Spent (in IDR)	</th>
                                 <th>Balance in (IDR)</th>
                              </tr>
                           </thead>
                           <tbody>
                              {transaction.map(trx=> 
                              <tr key={trx.id}>
                                        <td>{trx.date}</td>
                                    <td>{trx.person_name}</td>
                                    {trx.transaction_type === "Journal Entry" ?
                                       <>
                                          <td className="text-primary font-weight-bold" onClick={() => transactionDetailHandler(trx.journal_id, trx.transaction_type)}>{trx.transaction_type} {trx.transaction_no_format}</td>
                                       </>
                                       : <>
                                          <td className="text-primary font-weight-bold" onClick={() => transactionDetailHandler(trx.transaction_id, trx.transaction_type)}>{trx.transaction_type} {trx.transaction_no_format}</td>
                                       </>}
                                    <td>{trx.debit}</td>
                                    <td>{trx.credit}</td>
                                    <td>{trx.balance}</td>
                              </tr>
                                 )}
                           </tbody>
                        </table>
                     </>}
               </div>
            </>}
      </>
   )
}

export default AccountTransaction
