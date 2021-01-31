import React from 'react'

function Sales(props) {
   var salesRevenue =props.default_account.default_sale_account
   var salesDiscount = props.default_account.default_sale_discount_account
   var salesReturn  = props.default_account.default_sales_return_account
   var salesShipping = props.default_account.default_sale_shipping_account
   var unearnedRevenue  = props.default_account.default_unearned_revenue_account
   var unbilledSales  = props.default_account.default_unbilled_sales_account
   var unbilledReceivable  = props.default_account.default_unbilled_ar_account
   var salesTaxPayable = props.default_account.default_sale_tax_account

   // const [deliverySales setDeliverySales] = useState("")
   

  var listAccount= props.account



   return (
      <div className="container mt-3">
         <div className="row">
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">
                  Sales revenue
                  </div>
               <div className="col-lg-7 my-2">
                  <select className="form-control" name="default_sale_account" onChange={props.onChangeValue}>
                     <option value={salesRevenue.id}>({salesRevenue.number}) - {salesRevenue.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5  my-3">
                  Sales Discount
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="_default_sale_discount_account" onChange={props.onChangeValue}>
                  <option value={salesDiscount.id}>({salesDiscount.number}) - {salesDiscount.name}</option>
                  {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5  my-3">
                  Sales Return
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_sales_return_account" onChange={props.onChangeValue}>
                  <option value={salesReturn.id}>({salesReturn.number}) - {salesReturn.name}</option>
                  {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5  my-3">
                Sales Shipping
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_sale_shipping_account" onChange={props.onChangeValue}>
                  <option value={salesShipping.id}>({salesShipping.number}) - {salesShipping.name}</option>
                  {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
            </div>
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">
               Unearned revenue
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_unearned_revenue_account" onChange={props.onChangeValue}>
                  <option value={unearnedRevenue.id}>({unearnedRevenue.number}) - {unearnedRevenue.name}</option>
                  {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5 my-3">
               Unbilled Sales
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_unbilled_sales_account" onChange={props.onChangeValue}>
                  <option value={unbilledSales.id}>({unbilledSales.number}) - {unbilledSales.name}</option>
                  {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5 my-3">
               Unbilled Receivable
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_unbilled_ar_account" onChange={props.onChangeValue}>
                  <option value={unbilledReceivable.id}>({unbilledReceivable.number}) - {unbilledReceivable.name}</option>
                  {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5 my-3">
               Sales Tax Payable
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_sale_tax_account" onChange={props.onChangeValue}>
                  <option value={salesTaxPayable.id}>({salesTaxPayable.number}) - {salesTaxPayable.name}</option>
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

export default Sales
