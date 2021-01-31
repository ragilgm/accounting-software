import React, { useEffect, useState } from 'react'
import { currency } from './CurrencyList';
import CompanyServices from '../../../services/CompanyServices'
import { connect } from 'react-redux'

function CompanySetting(props) {


   var initialLogo = {
      logo:""  
   }

   const [logoCompany, setLogoCompany] = useState(initialLogo)

   const changeLogoHandler = (e) => { 
      console.log(e.target.files);
      var { name, files} = e.target
      setLogoCompany({...logoCompany,[name]:files})
   }
   



   var displayLogo = `http://localhost:8080/api/v1/company/logo/${props.data.logo}`


      var dataCompany = {
         name: props.data.name,
         industry: props.data.industry,
         address: props.data.address,
         shipping_address: props.data.shipping_address,
         phone: props.data.phone,
         fax: props.data.fax,
         company_tax_number: props.data.company_tax_number,
         show_logo_report: props.data.show_logo_report,
         company_website: props.data.company_website,
         company_email: props.data.company_email,
         enable_monthly_performance_email:props.data.enable_monthly_performance_email
      }


      var dataBankDetail = {
         bank_name: props.data.company_bank_detail.account_name,
         bank_branch: props.data.company_bank_detail.bank_branch,
         bank_address: props.data.company_bank_detail.bank_address,
         account_number: props.data.company_bank_detail.account_number,
         account_name: props.data.company_bank_detail.account_name,
         swift_code: props.data.company_bank_detail.swift_code
      }
 
      var companyCurrentCurency = {
         id: props.data.company_currency.id,
         code: props.data.company_currency.code,
         country: props.data.company_currency.country,
         currency_in_words: props.data.company_currency.currency_in_words,
         symbol: props.data.company_currency.symbol
      }



   


      const [company, setCompany] = useState(dataCompany);
      const [companyBankDetail, setCompanyBankDetail] = useState(dataBankDetail);
      const [companyCurrency, setCompanyCurrency] = useState(companyCurrentCurency)
      const [loading, setLoading] = useState(false)
    
   
   const changeValue = (e) => {
      if (e.target.type === "checkbox") {
         const { name, checked } = e.target;
         console.log(name,checked);
         setCompany({ ...company, [name]: checked })
      } else {
         const { name, value } = e.target;
         setCompany({ ...company, [name]: value })
      }
   }

   const changeBankValue = (e) => {
      const { name, value } = e.target;
      console.log(name, value);
      setCompanyBankDetail({ ...companyBankDetail, [name]: value })
   }

  const changeCurrencyHander = (e) => { 
   const { name, value } = e.target;
   console.log(name, value);
   setCompanyCurrency({ ...companyCurrency, [name]: value })
   }

   const updateCompanyHandler = (e) => {
      e.preventDefault();
      setLoading(true)
      var payload = {
         name: company.name,
         industry: company.industry,
         address: company.address,
         shipping_address: company.shipping_address,
         phone: company.phone,
         fax: company.fax,
         company_tax_number: company.company_tax_number,
         show_logo_report: company.show_logo_report,
         company_website: company.company_website,
         company_email: company.company_email,
         enable_monthly_performance_email: company.enable_monthly_performance_email,
         bank_name: companyBankDetail.bank_name,
         bank_branch: companyBankDetail.bank_branch,
         bank_address: companyBankDetail.bank_address,
         account_number: companyBankDetail.account_number,
         account_name: companyBankDetail.account_name,
         swift_code: companyBankDetail.swift_code,
         currency_id: companyCurrency.id,
      }
      console.log(payload);

      var imageUpload = logoCompany;
      console.log(imageUpload);

      console.log(imageUpload.logo[0]);
      var file = imageUpload.logo[0]
      const imageData = new FormData();
      imageData.append("logo", file)

      CompanyServices.imageUploadHandler(props.companyId.id, imageData)
         .then(res => { 
            console.log(res.data);
         }).catch(err => { 
            props.render();
         })

      CompanyServices.updateCompanySetting(props.companyId.id,payload)
         .then(res => { 
            console.log(res.data);
         
            alert("update berhasil")
         }).catch(err => { 
            alert("update gagal")
            console.log(err);
         }).finally(
            () => { 
               props.render()
               setLoading(false)
            }
         )
   }

   const cancelHandler =() => { 
      props.render()
   }

   const deleteLogoHandler = () => { 
      CompanyServices.deleteLogoCompany(props.companyId.id)
         .then(res => { 
            console.log("delete successfull");
         }).catch(err => { 
            console.log("delete failed");
         }).finally(
            props.render()
         )
   }

   return (
      <>
         
         {loading ?
            <>
            <div id="bg-loading" className="bg-loading" >
						<div id="loading" className="loading"></div>
            </div>
            </> :
            <>
            
         <div className="form">
            <form autoComplete="off" className="row " >
               <div className="companyProfile col-lg-6 col-sm-12">
                  <h5 className="mb-5 my-5">Company Setting</h5>

                    
                           {props.data.logo === null ? <></> : <>
                              <div className="col-lg-12 text-center">
                              <div className="text-primary font-weight-bold" onClick={deleteLogoHandler}>x</div>
                        <img src={displayLogo} alt="" srcset="" className="logo-company-setting"/>
                              </div>
                           </>}
                    
                        
                        <div className="form-group row  col-lg-12" >
                     <label htmlFor="logo" className=" col-lg-4 col-sm-12 col-form-label">Logo :</label>
                     <div className="col-lg-8 col-sm-12">
                              <input type="file" className="form-control" id="logo" name="logo" placeholder="Choose Logo" onChange={changeLogoHandler}/>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="show-logo" className=" col-lg-4 col-sm-12 col-form-label">Show logo In Report :</label>

                     <div className="col-lg-8 col-sm-12">
                        {company.show_logo_report === true ?
                           <>
                              <input class="form-check-input ml-2 mt-3" type="checkbox" name="show_logo_report" value="true" checked onChange={changeValue} />
                           </>
                           :
                           <>
                              <input class="form-check-input ml-2 mt-3" type="checkbox" name="show_logo_report" value="true" onChange={changeValue} />
                           </>}
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="companyName" className=" col-lg-4 col-sm-12 col-form-label">Company Name :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Company Name" value={company.name} onChange={changeValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="address" className=" col-lg-4 col-sm-12 col-form-label">Address :</label>
                     <div className="col-lg-8 col-sm-12">
                        <textarea type="textarea" className="form-control" id="address" name="address"
                           value={company.address} onChange={changeValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="shippingAddress" className=" col-lg-4 col-sm-12 col-form-label">Shipping Address :</label>
                     <div className="col-lg-8 col-sm-12">
                        <textarea type="textarea" className="form-control" id="shipping_address" name="shipping_address" value={company.shipping_address} onChange={changeValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="telephone" className=" col-lg-4 col-sm-12 col-form-label">Telephone :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="phone" name="phone"
                           value={company.phone} onChange={changeValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="fax" className=" col-lg-4 col-sm-12 col-form-label">fax :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="fax" name="fax"
                           value={company.fax} onChange={changeValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="website" className=" col-lg-4 col-sm-12 col-form-label">Website :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="company_website" name="company_website"
                           value={company.company_website} onChange={changeValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="website" className=" col-lg-4 col-sm-12 col-form-label">Email :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="company_email" name="company_email"
                           value={company.company_email} onChange={changeValue} />
                     </div>
                  </div>

               </div>
               <div className="companyProfile col-lg-6 col-sm-12">
                  <h5 className=" mb-5 my-5">Detail Bank Account</h5>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="bank_name" className=" col-lg-4 col-sm-12 col-form-label">Bank Name :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="bank_name" name="bank_name" placeholder="Bank Name"
                           value={companyBankDetail.bank_name} onChange={changeBankValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="bank_branch" className=" col-lg-4 col-sm-12 col-form-label">Branch Office :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="bank_branch" name="bank_branch" placeholder="Branch Office"
                           value={companyBankDetail.bank_branch} onChange={changeBankValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="bank_address" className=" col-lg-4 col-sm-12 col-form-label">Address Bank :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="bank_address" name="bank_address" placeholder="Address Bank"
                           value={companyBankDetail.bank_address} onChange={changeBankValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="account_number" className=" col-lg-4 col-sm-12 col-form-label">Account Number :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="account_number" name="account_number" placeholder="Account Number"
                           value={companyBankDetail.account_number} onChange={changeBankValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="account_name" className=" col-lg-4 col-sm-12 col-form-label">Holder Name :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="account_name" name="account_name" placeholder="Holder Name"
                           value={companyBankDetail.account_name} onChange={changeBankValue} />
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="swift_code" className=" col-lg-4 col-sm-12 col-form-label">Swift Code :</label>
                     <div className="col-lg-8 col-sm-12">
                        <input type="text" className="form-control" id="swift_code" name="swift_code" placeholder="Swift Code"
                           value={companyBankDetail.swift_code} onChange={changeBankValue} />
                     </div>
                  </div>
                  <h5 className="mb-5 mt-5">Another Feature</h5>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="currency" className=" col-lg-4 col-sm-12 col-form-label">Currency :</label>
                     <div className="col-lg-8 col-sm-12">
                              <select className="form-control" name="id" value={companyCurrency.id} onChange={changeCurrencyHander}>
                           <option value={companyCurrency.id}>{companyCurrency.country} - {companyCurrency.currency_in_words} - {companyCurrency.code}</option>
                           {currency.map((c, idx) =>
                              <option key={idx} value={c.id} >{c.country} - {c.currency_in_words} - {c.code}</option>
                           )}

                        </select>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="show-logo" className=" col-lg-4 col-sm-12 col-form-label">Receive Monthly Company Performance Email :</label>

                     <div className="col-lg-8 col-sm-12">
                        {company.enable_monthly_performance_email === true ?
                           <>
                              <input class="form-check-input ml-2 mt-3" type="checkbox" name="enable_monthly_performance_email" value="true" checked onChange={changeValue} />
                           </>
                           :
                           <>
                              <input class="form-check-input ml-2 mt-3" type="checkbox" name="enable_monthly_performance_email" value="true" onChange={changeValue} />
                           </>}
                     </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-ceneter mt-4">
                     <div className="col-lg-6">
                        <input type="button" className="btn button btn-danger btn-block" value="Cancel" onClick={cancelHandler}/>
                     </div>
                     <div className="col-lg-6">
                        <input type="button" className="btn button btn-success btn-block" value="Update" onClick={updateCompanyHandler} />
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


export default connect(mapStateToProps,mapDispatchToProps)(CompanySetting);

