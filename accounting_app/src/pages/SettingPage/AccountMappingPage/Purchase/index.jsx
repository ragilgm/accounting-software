import React, { useState} from 'react'
function Purchase(props) {

   var listAccount=props.account
   var cogs=props.default_account.default_cost_of_good_sold
   var purchaseShipping=props.default_account.default_purchase_shipping_account
   var prepayment=props.default_account.default_prepayment_account
   var unbilledPayable=props.default_account.default_unbilled_ap_account
   var purchaseTax=props.default_account.default_purchase_tax_account


   return (
      <div className="container mt-3">
         <div className="row">
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">    
                  Purchases (COGS)
                  </div>
               <div className="col-lg-7 my-2">
                  <select className="form-control" name="default_cost_of_good_sold" onChange={props.onChangeValue} >
                  <option value={cogs.id}>({cogs.number}) - {cogs.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5  my-3">
               Purchase Shipping
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_purchase_shipping_account"  onChange={props.onChangeValue} >
                  <option value={purchaseShipping.id}>({purchaseShipping.number}) - {purchaseShipping.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5  my-3">     
                  Prepayment
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_prepayment_account"  onChange={props.onChangeValue} >
                  <option value={prepayment.id}>({prepayment.number}) - {prepayment.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
            </div>
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">
               Unbilled Payable
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_unbilled_ap_account"  onChange={props.onChangeValue} >
                  <option value={unbilledPayable.id}>({unbilledPayable.number}) - {unbilledPayable.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5 my-3">
               Purchase Tax
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_purchase_tax_account"  onChange={props.onChangeValue} >
                  <option value={purchaseTax.id}>({purchaseTax.number}) - {purchaseTax.name}</option>
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

export default Purchase
