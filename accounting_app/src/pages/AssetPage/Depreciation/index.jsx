import React from 'react'

function Depreciation() {
   return (
      <>
            <div className="container-fluid mt-3">
            <div className="header">
               <div className="row">
                  <h3>Depreciation Schedule</h3>
               </div>
               <div className="body">
                  <table className="table">
                     <tr>
                        <th>Asset Details</th>
                        <th>Period</th>
                        <th>Value</th>
                        <th>Method</th>
                        <th>Depreciation</th>
                     </tr>
                  </table>
               </div>
            </div>
         </div>
      </>
   )
}

export default Depreciation
