import React from 'react'
import { useHistory} from 'react-router-dom'
import TableExpenses from './TableExpenses'

function ExpensesPage() {
   const history = useHistory();

   const createExpensesHandler = () => { 
      history.push("/expenses/create")
   }

   return (
      <>
         <div className="container-fluid">
            <div className="header">
               <div className="col lg-12 d-flex justify-content-between">
                  <div className="">
                     <small>Expenses</small>
                     <h3>Spending</h3>
                  </div>
                  <div className="">
                     <div className="btn btn-link" onClick={createExpensesHandler}>
                        Create New Expenses +
                     </div>
                  </div>
               </div>
            </div>
            <hr />
            <div className="expenses-body row col-lg-12 col-sm-10">
               <div className="col-lg-4">
                  <div className="box row">
                     <div className="">
                        <p className="title-box">Total Cost of the Month (USD)</p>
                     </div>
                     <div className="total">
                        <p>4</p>
                     </div>
                     <div className="line"></div>
                     <div className="col-lg-12 mt-3">
                        <small>Total </small>
                        <h5>Rp. 100.000.000</h5>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className="box row">
                     <div className="">
                        <p className="title-box">Last 30 Days Fee (USD)</p>
                     </div>
                     <div className="total">
                        <p>4</p>
                     </div>
                     <div className="line"></div>
                     <div className="col-lg-12 mt-3">
                        <small>Total </small>
                        <h5>Rp. 100.000.000</h5>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className="box row">
                     <div className="">
                        <p className="title-box">Unpaid Charges (USD)</p>
                     </div>
                     <div className="total">
                        <p>4</p>
                     </div>
                     <div className="line"></div>
                     <div className="col-lg-12 mt-3">
                        <small>Total </small>
                        <h5>Rp. 100.000.000</h5>
                     </div>
                  </div>
               </div>
            </div>

            <hr />
            
            <div className="row table-list d-flex justify-content-between container col-lg-12">
               <div className="title-list col-lg-6">
               <h5>List Expenses</h5>
               </div>
               <div className="action row col-lg-6">
                  <div className="">
                     <div className="btn btn-primary btn-link mr-3">
                        Import
                     </div> 
                  </div>
                  <div className="search col-lg-8">
                     <input type="text" className="form-control" placeholder="search.."/>
                  </div>
               </div>
            </div>
            <div className=" col-lg-12 container mt-3">

            <ul className="nav nav-tabs" id="myTab" role="tablist">
               <li className="nav-item">
                  <a className="nav-link active" id="expenses-tab" data-toggle="tab" href="#expenses" role="tab" aria-controls="expenses" aria-selected="true">Expenses</a>
               </li>
             
               </ul>
               <div className="tab-content mt-3" id="myTabContent">
                  <div className="tab-pane fade show active" id="expenses" role="tabpanel" aria-labelledby="expenses-tab">
                     
                     <TableExpenses/>

               </div>
               </div>


            </div>
         </div>
      </>
   )
}

export default ExpensesPage
