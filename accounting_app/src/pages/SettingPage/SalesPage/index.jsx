import React, { useState, useEffect} from 'react'
import SalesSetting from './SalesSetting'
import InvoiceReminder from './InvoiceReminder'

function SalesPage(props) {

   const company = props.data


   return (
      <>
         {company === "" ?
            <>
               <div id="bg-loading" className="bg-loading" >
						<div id="loading" className="loading"></div>
					</div>
            </>
            :
            <>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" style={{ width: "50%", textAlign: "center" }}>
                           <a class="nav-link active" id="setting-format-tab" data-toggle="tab" href="#setting-format" role="tab" aria-controls="setting-format" aria-selected="false">
                              Setting Format
                           </a>
                        </li>
                        <li class="nav-item" style={{ width: "50%", textAlign: "center" }}>
                           <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">
                              Invoice Reminder</a>
                        </li>
                     </ul>
                     <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show  active" id="setting-format" role="tabpanel" aria-labelledby="setting-format-tab">
                     <SalesSetting data={company} render={props.render}/>
                        </div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                     <InvoiceReminder data={company}  render={props.render}/>
                        </div>
                     </div>
            </>
         }
      </>
   )
}

export default SalesPage
