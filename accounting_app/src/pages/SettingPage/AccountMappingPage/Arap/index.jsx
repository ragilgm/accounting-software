import React from 'react'

function Arap(props) {

   var listAccount=props.account
   var accountReceivable = props.default_account.default_account_receiveable;
   var accountPayable=props.default_account.default_account_payable

   return (
      <div className="container mt-3">
         <div className="row">
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">    
               Accounts receivable
                  </div>
               <div className="col-lg-7 my-2">
                  <select className="form-control" name="default_account_receiveable" onChange={props.onChangeValue}>
                  <option value={accountReceivable.id}>({accountReceivable.number}) - {accountReceivable.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>

            </div>
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">
               Account payable
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_account_payable" onChange={props.onChangeValue}>
                  <option value={accountPayable.id}>({accountPayable.number}) - {accountPayable.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               
            </div>
         </div>
      </div>
   )
}

export default Arap
