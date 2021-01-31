import React from 'react'
import SalesQuoteTemplate from './SalesQuoteTemplate'
import SalesOrderTemplate from './SalesOrderTemplate'
import PurchaseOrderTemplate from './PurchaseOrderTemplate'
import SalesInvoiceTemplate from './SalesInvoiceTemplate'

function TemplatePage() {
   return (
      <>
         <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" style={{ width: "25%", textAlign: "center" }}>
                           <a class="nav-link active" id="selling-offers-tab" data-toggle="tab" href="#selling-offers" role="tab" aria-controls="selling-offers" aria-selected="false">
                           Sales invoice
                           </a>
                        </li>
                        <li class="nav-item" style={{ width: "25%", textAlign: "center" }}>
                           <a class="nav-link" id="sales-quote-tab" data-toggle="tab" href="#sales-quote" role="tab" aria-controls="sales-quote" aria-selected="false">
                           Sales Quote 
                           </a>
                        </li>
                        <li class="nav-item" style={{ width: "25%", textAlign: "center" }}>
                           <a class="nav-link" id="sales-order-tab" data-toggle="tab" href="#sales-order" role="tab" aria-controls="sales-order" aria-selected="false">
                           Sales Order</a>
                        </li>
                        <li class="nav-item" style={{ width: "25%", textAlign: "center" }}>
                           <a class="nav-link" id="purchase-order-tab" data-toggle="tab" href="#purchase-order" role="tab" aria-controls="purchase-order" aria-selected="false">
                              Purchase Order</a>
                        </li>
                     </ul>
                     <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show  active" id="selling-offers" role="tabpanel" aria-labelledby="selling-offers-tab">
                           <SalesInvoiceTemplate/>
                        </div>
                        <div class="tab-pane fade" id="sales-quote" role="tabpanel" aria-labelledby="sales-quote-tab">
                           <SalesQuoteTemplate />
                        </div>
                        <div class="tab-pane fade" id="sales-order" role="tabpanel" aria-labelledby="sales-order-tab">
                           <SalesOrderTemplate />
                        </div>
                        <div class="tab-pane fade" id="purchase-order" role="tabpanel" aria-labelledby="purchase-order-tab">
                           <PurchaseOrderTemplate />
                        </div>
                     </div>
      </>
   )
}

export default TemplatePage
