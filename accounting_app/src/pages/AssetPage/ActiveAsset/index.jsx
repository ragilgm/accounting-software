import React from 'react'

function ActiveAsset() {
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
                           <th>Acquisition Date</th>
                           <th>Asset Details</th>
                           <th>Asset Account</th>
                           <th>Acquisition Fee (in USD)</th>
                           <th>Nilai Buku (dalam USD)</th>
                           <th>Action</th>
                        </tr>
                     </table>
                  </div>
            </div>
        </div>
      </>
   )
}

export default ActiveAsset
