import React from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select';

function AddAsset() {

   const history = useHistory()


   const backHandler = () => {
      history.push("/assets")
   }

   const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
   ]

   return (
      <>
         <div className="container">
            <div className="row">
               <div className="header">
                  <h3>
                     <button className="btn btn-link"
                        style={{ fontSize: 30 }}
                        onClick={backHandler}>
                        <i className="fas fa-chevron-left"></i>
                     </button> New Asset Storage
                  </h3>
               </div>
            </div>
            <div className="card mt-3">
               <div className="detail-assets">
                  <h5>Detail Aset</h5>
                  <div className="row col-lg-12 col-sm-10">

                     <div className="col-lg-6 row">
                        <div className="col-lg-4">
                           <label htmlFor="" className="mt-3">Asset Name</label>
                        </div>
                        <div className="col-lg-8">
                           <input type="text" className="form-control" placeholder="Asset name" />
                        </div>
                        <div className="col-lg-4">
                           <label htmlFor="" className="mt-3">Asset Number</label>
                        </div>
                        <div className="col-lg-8">
                           <input type="text" className="form-control" placeholder="Asset Number" />
                        </div>
                        <div className="col-lg-4">
                           <label htmlFor="" className="mt-3">Fixed Asset Account</label>
                        </div>
                        <div className="col-lg-8">
                           <Select
                              defaultValue={options[2]}
                              name="colors"
                              options={options}

                           />
                        </div>
                        <div className="col-lg-4">
                           <label htmlFor="" className="mt-3">Description</label>
                        </div>
                        <div className="col-lg-8 mt-3">
                           <textarea name="" id="" rows="5" style={{ width: "100%" }}></textarea>
                        </div>
                     </div>
                     <div className="col-lg-6 row">
                        <div className="col-lg-4">
                           <label htmlFor="" className="mt-3">Acquisition Date</label>
                        </div>
                        <div className="col-lg-8">
                           <input type="text" className="form-control" placeholder="Asset name" />
                        </div>
                        <div className="col-lg-4">
                           <label htmlFor="" className="mt-3">Acquisition Fee</label>
                        </div>
                        <div className="col-lg-8">
                           <input type="text" className="form-control" placeholder="Asset Number" />
                        </div>
                        <div className="col-lg-4">
                           <label htmlFor="" className="mt-3">Account Credited</label>
                        </div>
                        <div className="col-lg-8">
                           <input type="text" className="form-control" placeholder="Asset Number" />
                        </div>

                     </div>



                  </div>
               </div>


               <div className="depreciation my-3">
                  <h5>Detail Aset</h5>
                  <div className="row">
                     <h6 className="ml-3">Non-depreciating assets</h6>
                     <input type="checkbox" className="ml-5 mt-1" />
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-6 row">
                     <div className="col-lg-4">
                        <label htmlFor="" className="mt-3">Method</label>
                     </div>
                     <div className="col-lg-8">
                        <input type="text" className="form-control" placeholder="Method" />
                     </div>
                     <div className="col-lg-4">
                        <label htmlFor="" className="mt-3">The useful life</label>
                     </div>
                     <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Year  " />
                     </div>
                     <div className="col-lg-4 mt-3">
                        <h6>Year</h6>
                     </div>
                     <div className="col-lg-4">
                        <label htmlFor="" className="mt-3">Value / Year</label>
                     </div>
                     <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Year  " />
                     </div>
                     <div className="col-lg-4 mt-3">
                        <h6>Percent</h6>
                     </div>

                  </div>
                  <div className="col-lg-6 row">
                     <div className="col-lg-4">
                        <label htmlFor="" className="mt-3">Depreciation Account</label>
                     </div>
                     <div className="col-lg-8">
                        <Select
                           defaultValue={options[2]}
                           name="colors"
                           options={options}

                        />
                     </div>
                     <div className="col-lg-4">
                        <label htmlFor="" className="mt-3">Accumulated Depreciation Account</label>
                     </div>
                     <div className="col-lg-8">
                        <Select
                           defaultValue={options[2]}
                           name="colors"
                           options={options}

                        />
                     </div>
                     <div className="col-lg-4">
                        <label htmlFor="" className="mt-3">Accumulated depreciation</label>
                     </div>
                     <div className="col-lg-8">
                        <input type="text" className="form-control" placeholder="Asset Number" />
                     </div>
                     <div className="col-lg-4">
                        <label htmlFor="" className="mt-3">At the date of</label>
                     </div>
                     <div className="col-lg-8">
                        <input type="date" className="form-control" placeholder="Asset Number" />
                     </div>

                  </div>
               </div>

               <div className="row">
               <div className="col-lg-6"></div>
               <div className="col-lg-6 row mt-5">
                  <div className="col-lg-6">
                     <div className="btn btn-block btn-danger">Cancel</div>
                  </div>
                  <div className="col-lg-6">
                     <div className="btn btn-block btn-success">Create Asset</div>
                  </div>
               </div>
             </div>

            </div>
         </div >
      </>
   )
}

export default AddAsset
