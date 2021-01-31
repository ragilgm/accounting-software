import React from 'react'

function InvoiceReminder() {
   return (
      <>
         <div className="form">
            <form autoComplete="off" className="row " >
               <div className="salesSetting col-lg-12 col-sm-12">
                  <h5 className="mb-5 my-5">
                     Invoice Reminder</h5>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="logo" className=" col-lg-4 col-sm-12 col-form-label">
                        Invoice Type :</label>
                     <div className="col-lg-4 col-sm-12">
                        <select className="form-control" name="currency" >
                           <option  >Sales</option>
                           <option  >Sales Order</option>
                           <option  >All</option>
                        </select>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Interval :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           <div className="text-primary">Add Interval +</div>
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Exception :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           <input class="form-check-input ml-2 mt-3" type="checkbox" value="true" />
                           <label htmlFor="" style={{ position: 'absolute', marginLeft: "2rem", marginTop: "1rem" }}>Below <input type="text" className="ml-2" placeholder="value" /></label>
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label"></label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           <input class="form-check-input ml-2 mt-3" type="checkbox" value="true" />
                           <label htmlFor="" style={{ position: 'absolute', marginLeft: "2rem", marginTop: "1rem" }}>0 customers selected <small className="text-primary">View/Add Customer +</small> </label>
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">
                     </label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           <input class="form-check-input ml-2 mt-3" type="checkbox" value="true" />
                           <label htmlFor="" style={{ position: 'absolute', marginLeft: "2rem", marginTop: "1rem" }}>0 Invoice selected <small className="text-primary">View/Add Invoice +</small> </label>
                        </div>
                     </div>
                  </div>

                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="companyName" className=" col-lg-4 col-sm-12 col-form-label">Show % of Profit on Sales Invoice :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           <input class="form-check-input ml-2 mt-3" type="checkbox" value="true" />
                           <label htmlFor="" style={{ position: 'absolute', marginLeft: "2rem", marginTop: "1rem" }}>0 PO selected <small className="text-primary">View/Add PO +</small> </label>
                        </div>
                     </div>
                  </div>

                  <div className="col-lg-12 d-flex justify-content-ceneter mt-4">
                     <div className="col-lg-6">
                        <input type="button" className="btn button btn-primary" value="Cancel" />
                     </div>
                     <div className="col-lg-6">
                        <input type="button" className="btn button btn-danger" value="Update" />
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </>
   )
}

export default InvoiceReminder
