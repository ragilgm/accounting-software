import React from 'react'

function SalesInvoiceTemplate() {
   return (
      <>
         <div className="form">
            <form autoComplete="off" className="row " >
               <div className="salesSetting col-lg-12 col-sm-12">
                  <h5 className="mb-5 my-5">
                     Sales Invoice Email Templates </h5>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="address" className=" col-lg-4 col-sm-12 col-form-label">Subject :</label>
                     <div className="col-lg-8 col-sm-12">
                        <textarea type="textarea" rows="1" className="form-control" id="address" name="address"
                           value="Faktur Penjualan #[NomorTransaksi]" />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="shippingAddress" className=" col-lg-4 col-sm-12 col-form-label"> Message :</label>
                     <div className="col-lg-8 col-sm-12">
                        <textarea type="textarea" rows="10" className="form-control" id="shippingAddress" name="shippingAddress" value="Yth. [NamaCustomer],
                           Terima kasih atas bisnis Anda.

                           Berikut adalah Faktur #[NomorTransaksi] sebesar [SisaTagihan].

                           Terimakasih atas kerjasamanya.
                           [NamaPerusahaan]"/>
                     </div>
                  </div>

                  <div className="col-lg-12 d-flex justify-content-ceneter mt-4">
                     <div className="col-lg-6">
                        <input className="btn button btn-success" value="Update" />
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </>
   )
}

export default SalesInvoiceTemplate
