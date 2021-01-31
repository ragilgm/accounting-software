import React from 'react'

function Other(props) {

   var openingBalance=props.default_account.default_opening_balance_equity
   var fixedAsset=props.default_account.default_fixed_asset_account
 
   var listAccount=props.account


   return (
      <div className="container mt-3">
         <div className="row">
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">   
               Opening Balance Equity
                  </div>
               <div className="col-lg-7 my-2">
                  <select className="form-control" name="default_opening_balance_equity" onChange={props.onChangeValue} >
                  <option value={openingBalance.id}>({openingBalance.number}) - {openingBalance.name}</option>
                     {listAccount.map(data =>
                        <option key={data.id} value={data.id} >({data.number_account}) - {data.name}</option>
                        )}
                  </select>
               </div>

            </div>
            <div className="col-lg-6 row">
               <div className="col-lg-5 my-3">
               Fixed Asset
                  </div>
               <div className="col-lg-7  my-2">
                  <select className="form-control" name="default_fixed_asset_account" onChange={props.onChangeValue}>
                  <option value={fixedAsset.id}>({fixedAsset.number}) - {fixedAsset.name}</option>
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

export default Other
