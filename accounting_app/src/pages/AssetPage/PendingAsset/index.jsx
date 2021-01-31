import React from 'react'

function PendingAsset() {
   return (
      <>
         <div className="container-fluid mt-3">
            <div className="header">
               <div className="row">
                  <h3>Unsaved Assets</h3>
               </div>
                  <div className="body">
                     <table className="table">
                        <tr>
                           <th>Acquisition Date</th>
                           <th>Goods</th>
                           <th>Invoice #</th>
                           <th>Acquisition Fee</th>
                           <th>Action</th>
                        </tr>
                     </table>
                  </div>
            </div>
        </div>
      </>
   )
}

export default PendingAsset
