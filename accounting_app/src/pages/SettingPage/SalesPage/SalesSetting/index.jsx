import React, { useState, useEffect } from 'react'
import PaymentTerms from '../../../../services/PaymentTerms'
import CompanyServices from '../../../../services/CompanyServices'
import { connect} from 'react-redux'

function SalesSetting(props) {
   
   const invoiceTerm = props.data.preferred_invoice_term
   const [render, setRender] = useState(false)
   const [listTerm, setListTerm] = useState([])
   const [loading, setLoading] = useState(false)

   var initialSalesSetting = {
      termId:props.data.preferred_invoice_term.id,
      discount_sale:props.data.discount_sale,
      discount_lines_sale:props.data.discount_lines_sale,
      default_delivery_slip_message:props.data.default_delivery_slip_message,
      default_invoice_message: props.data.default_invoice_message,
      disable_sell_on_no_product: props.data.disable_sell_on_no_product,
      use_profit_margin: props.data.use_profit_margin,
      selling_price_follow_price_rule:props.data.selling_price_follow_price_rule
   }
   const [salesSetting, setSellesSetting] = useState(initialSalesSetting);


   useEffect(() => {
      setLoading(true)
      PaymentTerms.getTermins(props.companyId.id)
         .then(res => {
            console.log(res.data);
            setListTerm(res.data)
         }).finally(setLoading(false))
   
   }, [render])

   const onChangeValue = (e) => { 
      if (e.target.type === "checkbox") { 
         var { name, checked } = e.target
         setSellesSetting({...salesSetting,[name]:checked})
      } else {
         var { name, value}= e.target
         setSellesSetting({...salesSetting,[name]:value})
      }
   }

   const updateHandler = (e) => { 
      e.preventDefault()
      console.log(salesSetting);
      var payload = {
         default_invoice_message: salesSetting.default_invoice_message,
      default_delivery_slip_message: salesSetting.default_delivery_slip_message,
      disable_sell_on_no_product: salesSetting.disable_sell_on_no_product,
      discount_lines_sale: salesSetting.discount_lines_sale,
      discount_sale: salesSetting.discount_sale,
      selling_price_follow_price_rule: salesSetting.selling_price_follow_price_rule,
      termId: salesSetting.termId,
      use_profit_margin: salesSetting.use_profit_margin,
      }
      setLoading(true)
      CompanyServices.updateCompanySalesSetting(props.companyId.id, payload)
         .then(res => { 
            alert("update successfull")
            console.log(res.data);
         }).catch(err => { 
            alert("update failed")
            console.log(err);
         }).finally(() => { 
            setLoading(false)
            props.render()
            setRender(!render)
         }
            
         )

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
                     <div className="salesSetting col-lg-12 col-sm-12">
                        <h5 className="mb-5 my-5">Sales Setting</h5>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="logo" className=" col-lg-4 col-sm-12 col-form-label">Main Payment Terms :</label>
                           <div className="col-lg-4 col-sm-12">
                                 <select className="form-control" name="termId" onChange={onChangeValue} >
                                    <option defaultValue={invoiceTerm.id}>{invoiceTerm.name}</option>
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
                                 <input class="form-check-input ml-2 mt-3" type="checkbox" value="true" onChange={onChangeValue}/>
                              </div>
                           </div>
                        </div>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Discount :</label>
                           <div className="col-lg-8 col-sm-12">
                              <div className="col-lg-8 col-sm-12">
                                 {salesSetting.discount_sale ?
                                    <>
                                         <input class="form-check-input ml-2 mt-3" name="discount_sale" type="checkbox" value="true" checked onChange={onChangeValue}/>
                                    </> :
                                    <>
                                         <input class="form-check-input ml-2 mt-3" name="discount_sale" type="checkbox" value="true" onChange={onChangeValue}/>
                                    </>}
                              </div>
                           </div>
                        </div>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Diskon per Line :</label>
                           <div className="col-lg-8 col-sm-12">
                              <div className="col-lg-8 col-sm-12">
                                 {salesSetting.discount_lines_sale ?
                                    <>
                                 <input class="form-check-input ml-2 mt-3" name="discount_lines_sale" type="checkbox" onChange={onChangeValue} value="true"  checked />
                                    </>
                                    :
                                    <>
                                    <input class="form-check-input ml-2 mt-3" name="discount_lines_sale" type="checkbox" onChange={onChangeValue} value="true"   />
                                    </>}
                              </div>
                           </div>
                        </div>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">
                              Down Payment :</label>
                           <div className="col-lg-8 col-sm-12">
                              <div className="col-lg-8 col-sm-12">
                                 <input class="form-check-input ml-2 mt-3" type="checkbox" value="true" disabled checked />
                              </div>
                           </div>
                        </div>

                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="companyName" className=" col-lg-4 col-sm-12 col-form-label">Show % of Profit on Sales Invoice :</label>
                           <div className="col-lg-8 col-sm-12">
                              <div className="col-lg-8 col-sm-12">
                                 {salesSetting.use_profit_margin ?
                                    <>
                                 <input class="form-check-input ml-2 mt-3" name="use_profit_margin" onChange={onChangeValue} type="checkbox"  value="true" checked/>
                                    </>
                                    :
                                    <>
                                 <input class="form-check-input ml-2 mt-3" name="use_profit_margin" onChange={onChangeValue} type="checkbox" value="true" />
                                    </>}
                              </div>
                           </div>
                        </div>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="companyName" className=" col-lg-4 col-sm-12 col-form-label">
                              Refuse Sales if Lack of Quantity:</label>
                           <div className="col-lg-8 col-sm-12">
                              <div className="col-lg-8 col-sm-12">
                                 {salesSetting.disable_sell_on_no_product ? <>
                                    <input class="form-check-input ml-2 mt-3" onChange={onChangeValue} type="checkbox" name="disable_sell_on_no_product" value="true" checked/>
                                 </> :
                                    <>
                                       <input class="form-check-input ml-2 mt-3" onChange={onChangeValue} type="checkbox" name="disable_sell_on_no_product"  value="true" />
                                    </>}
                              </div>
                           </div>
                        </div>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="companyName" className=" col-lg-4 col-sm-12 col-form-label">

                              The selling price follows the price rule</label>
                           <div className="col-lg-8 col-sm-12">
                              <div className="col-lg-8 col-sm-12">
                                 {salesSetting.selling_price_follow_price_rule ?
                                    <>
                                       <input class="form-check-input ml-2 mt-3" name="selling_price_follow_price_rule" onChange={onChangeValue}  type="checkbox" value="true"
                                       checked/>
                                    </>
                                    :
                                    <>
                                            <input class="form-check-input ml-2 mt-3" name="selling_price_follow_price_rule"  onChange={onChangeValue}   type="checkbox" value="true" />
                                    </>}
                            
                              </div>
                              <small style={{ marginLeft: "3rem", marginTop: "1rem", position: "absolute" }} className="note text-danger">* the price value will be locked and can only use the price rule</small>
                           </div>
                        </div>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="default_invoice_message" className=" col-lg-4 col-sm-12 col-form-label">Standard Sales Message :</label>
                           <div className="col-lg-8 col-sm-12">
                              <textarea type="textarea" rows="5" name="default_invoice_message" className="form-control" id="default_invoice_message" value={salesSetting.default_invoice_message} onChange={onChangeValue}/>
                           </div>
                        </div>
                        <div className="form-group row  col-lg-12" >
                           <label htmlFor="default_delivery_slip_message" className=" col-lg-4 col-sm-12 col-form-label">Standard Road Mail Order :</label>
                           <div className="col-lg-8 col-sm-12">
                              <textarea type="textarea" rows="5" className="form-control" id="default_delivery_slip_message" name="default_delivery_slip_message" value={salesSetting.default_delivery_slip_message} onChange={onChangeValue}/>
                           </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-ceneter mt-4">
                           <div className="col-lg-6">
                              <input type="button" className="btn button btn-danger " value="Cancel" onClick={cancelHandler}/>
                           </div>
                           <div className="col-lg-6">
                              <input type="button" className="btn button btn-success " value="Update" onClick={updateHandler}/>
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


export default connect(mapStateToProps,mapDispatchToProps)(SalesSetting);
