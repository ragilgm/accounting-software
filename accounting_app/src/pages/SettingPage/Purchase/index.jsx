import React, { useState,useEffect} from 'react'
import PaymentTerms from '../../../services/PaymentTerms'
import CompanyServices from '../../../services/CompanyServices'
import { connect} from 'react-redux'

function Purchase(props) {


   var purchase = {
      termId:props.data.preferred_invoice_term.id,
      discount_purchase:props.data.discount_purchase,
      discount_lines_purchase:props.data.discount_lines_purchase,
      default_purchase_order_message: props.data.default_purchase_order_message
   }

   const [listTerm, setListTerm] = useState([])
   const [loading, setLoading] = useState(false)
   const [purchaseSetting, setPurchaseSetting] = useState(purchase);

   useEffect(() => {
      setLoading(true)
      PaymentTerms.getTermins(props.companyId.id)
         .then(res => {
    
            console.log(res.data);
            setListTerm(res.data)
         }).
         finally(setLoading(false))
      console.log('====================================');
      console.log("purchase");
      console.log(props.data);
      console.log('====================================');

   }, [])
   
   const onChangeValue = (e) => { 
      if (e.target.type === "checkbox") { 
         var { name, checked } = e.target
         setPurchaseSetting({...purchaseSetting,[name]:checked})
      } else {
         var { name, value}= e.target
         setPurchaseSetting({...purchaseSetting,[name]:value})
      }
   }

   const updateHandler = (e) => { 
      e.preventDefault();

      console.log(purchaseSetting);
      setLoading(true)
      CompanyServices.updateCompanyPurchaseSetting(props.companyId.id, purchaseSetting)
         .then(res => { 
            alert("update successfull")
            console.log(res.data);
         }).catch(err => { 
            alert("update failed")
            console.log(err);
         }).finally(() => { 
            setLoading(false)
            props.render()
         })
   }

   const cancelHandler = () => { 
      window.history.go()
   }
   

   return (
      <>
         {loading ?
            <>
                       <div id="bg-loading" className="bg-loading" >
						<div id="loading" className="loading"></div>
					</div>
            </>
            :
            <>
       
         <div className="form">
            <form autoComplete="off" className="row " >
               <div className="purchaseSetting col-lg-12 col-sm-12">
                  <h5 className="mb-5 my-5">Purcahse Setting</h5>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="logo" className=" col-lg-4 col-sm-12 col-form-label">Main Purchase Terms :</label>
                     <div className="col-lg-4 col-sm-12">
                     <select className="form-control" name="termId" onChange={onChangeValue} >
                                 <option defaultValue={props.data.preferred_purchase_term.id}>{props.data.preferred_purchase_term.name}</option>
                                 {listTerm.map(data => 
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                    )}
                                 
                              </select>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Delivery :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           <input class="form-check-input ml-2 mt-3" type="checkbox" value="true"  onChange={onChangeValue} />
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Discount :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           {purchaseSetting.discount_purchase ?
                              <>
                           <input class="form-check-input ml-2 mt-3" name="discount_purchase" type="checkbox" value="true" checked  onChange={onChangeValue} />
                              </>
                              :
                              <>
                                     <input class="form-check-input ml-2 mt-3" name="discount_purchase" type="checkbox" value="true"  onChange={onChangeValue} />
                              </>}
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Diskon per Line :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           {purchaseSetting.discount_lines_purchase ?
                              <>
                                    <input class="form-check-input ml-2 mt-3" name="discount_lines_purchase" type="checkbox" value="true" checked  onChange={onChangeValue} />
                              </>
                              :
                              <>
                                    <input class="form-check-input ml-2 mt-3" name="discount_lines_purchase" type="checkbox" value="true"  onChange={onChangeValue} />
                              </>
                           }
                         
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">
                        Down Payment :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           <input class="form-check-input ml-2 mt-3" type="checkbox" value="true" disabled checked
                            onChange={onChangeValue} />
                        </div>
                     </div>
                  </div>

   

                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="default_purchase_order_message" className=" col-lg-4 col-sm-12 col-form-label">Standard Purchase Message :</label>
                     <div className="col-lg-8 col-sm-12">
                        <textarea type="textarea" rows="5" className="form-control" id="default_purchase_order_message" name="default_purchase_order_message" value={purchaseSetting.default_purchase_order_message}
                         onChange={onChangeValue} />
                     </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-ceneter mt-4">
                     <div className="col-lg-6">
                              <input type="button" className="btn button btn-danger" value="Cancel" onClick={cancelHandler}/>
                     </div>
                     <div className="col-lg-6">
                        <input type="button" className="btn button btn-success" value="Update" onClick={updateHandler}/>
                     </div>
                  </div>
               </div>
            </form>
               </div>
                       
            </>}
      </>
   )
}


const mapStateToProps = (state) => ({
	companyId:state.AuthReducer.company,
	userLogin:state.AuthReducer.userLogin,
	isLogin:state.AuthReducer.isLogin
 })
 
const mapDispatchToProps = (dispatch) => ({
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload:user, isLogin:true,company:company  }),
})


export default connect(mapStateToProps,mapDispatchToProps)(Purchase);
