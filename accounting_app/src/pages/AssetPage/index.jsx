import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';



function AssetPage(props) {

   const history = useHistory()


   const pendingAssetHandler = () => {
      history.push("/assets/pending")
   }
   const activeAssetHandler = () => {
      history.push("/assets/active")
   }
 
   const soldReleaseHandler = () => {
      history.push("/assets/released")
   }

   const DepreciationHandler = () => {
      history.push("/assets/depreciation")
   }

   const addAssetHandler = () => { 
      history.push("/assets/new")
   }


   return (
      <div className="product-page col-lg-12 col-sm-12">
         <div className="header row d-flex justify-content-between">
            <div>
               <small>Managemen Asset</small>
               <h3>Fixed assets</h3>
            </div>
            <div>
               <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick=""
               >
                 Import
              </Button>
               <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={addAssetHandler}
               >
                  Add Asset +
              </Button>
              
            </div>
         </div>
         <hr />
         <div className="product-body">

            <ul className="nav nav-tabs" id="myTab" role="tablist">
               {/* pending asset */}
               <li className="nav-item" onClick={pendingAssetHandler}>
                  {props.page === "pending" ?
                     <>
                        <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="services" aria-selected="false">Pending Asset</div>
                     </>
                     :
                     <>
                        <div className="nav-link" href="#services" role="tab" aria-controls="services" aria-selected="false">Pending Asset</div>
                     </>}
               </li>
               {/* pending asset */}
               {/* active asset */}
               <li className="nav-item" onClick={activeAssetHandler}>
                  {props.page === "active" ?
                     <>
                        <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="warehouse" aria-selected="false">Active Assets</div>
                     </>
                     :
                     <>
                        <div className="nav-link" role="tab" aria-controls="warehouse" aria-selected="false">Active Assets</div>
                     </>}
               </li>
               {/* active asset */}
               {/* sold /release */}
               <li className="nav-item" onClick={soldReleaseHandler}>
                  {props.page === "released" ?
                     <>
                        <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="price-rules" aria-selected="false">Sold / Released</div>
                     </>
                     :
                     <>
                        <div className="nav-link" role="tab" aria-controls="price-rules" aria-selected="false">Sold / Released</div>
                     </>}
               </li>
               {/* sold /release */}
               {/* Depreciation */}
               <li className="nav-item" onClick={DepreciationHandler}>
                  {props.page === "depreciation" ?
                     <>
                        <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="price-rules" aria-selected="false">Depreciation</div>
                     </>
                     :
                     <>
                        <div className="nav-link" role="tab" aria-controls="price-rules" aria-selected="false">Depreciation</div>
                     </>}
               </li>
               {/* Depreciation */}

            </ul>
            <div className="tab-content" id="myTabContent">
               {/* services body */}

               {props.children}
               {/* price-ruless body */}
               {/* other body */}

            </div>
         </div>
      </div>
   )
}

export default AssetPage
