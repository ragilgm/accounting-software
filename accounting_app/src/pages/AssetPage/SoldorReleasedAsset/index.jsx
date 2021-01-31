import React from 'react'

function SoldorReleasedAsset() {
   return (
      <>
         <div className="container-fluid mt-3">
            <div className="header">
               <div className="row">
                  <h3>List Assets</h3>
               </div>
               <div className="body">
                  <table className="table">
                     <tr>
                        <th>Date</th>
                        <th>Asset Details</th>
                        <th>Transaction No</th>
                        <th>Selling price</th>
                        <th>Profit/Loss</th>
                        <th>Action</th>
                     </tr>
                  </table>
               </div>
            </div>
         </div>
      </>
   )
}

export default SoldorReleasedAsset
