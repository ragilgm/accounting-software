import React from 'react'
function Stock(props) {

   var inventory=props.default_account.default_inventory_account
   var inventoryGeneral=props.default_account.default_stock_adj_account_general
   var inventoryWaste=props.default_account.default_stock_adj_account_waste
   var inventoryProduction=props.default_account.default_stock_adj_account_production
  var listAccount=props.account

  

   return (
      <div className="container mt-3">
         <div className="row">
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">
               Inventory
                  </div>
               <div className="col-lg-7 my-2">
                  <select className="form-control" name="default_inventory_account" onChange={props.onChangeValue} >
                  <option value={inventory.id}>({inventory.number}) - {inventory.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5  my-3">
               Inventory General
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_stock_adj_account_general" onChange={props.onChangeValue} >
                  <option value={inventoryGeneral.id}>({inventoryGeneral.number}) - {inventoryGeneral.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>

            </div>
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">
               Inventory Waste
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_stock_adj_account_waste" onChange={props.onChangeValue}>
                  <option value={inventoryWaste.id}>({inventoryWaste.number}) - {inventoryWaste.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>
               <div className="col-lg-5 my-3">     
               Inventory Production
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_stock_adj_account_production" onChange={props.onChangeValue}>
                  <option value={inventoryProduction.id}>({inventoryProduction.number}) - {inventoryProduction.name}</option>
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

export default Stock
