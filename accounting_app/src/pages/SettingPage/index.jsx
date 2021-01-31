import React, { useState, useEffect } from 'react'
import { connect} from 'react-redux'
import CompanySetting from './CompanySetting'
import Purcahse from './Purchase'
import ProductServices from './ProductServices'
import TemplatePage from './TemplatePage'
import SalesPage from './SalesPage'
import AccountMappingPage from './AccountMappingPage'
import UserSettingPage from './UserSettingPage'
import ThemeSetting from './ThemeSetting'
import CompanyServices from '../../services/CompanyServices'
import AccountServices from '../../services/AccountServices'


function SettingPage(props) {

   const [company, setCompany] = useState("");
   const [listAccount, setListAccount] = useState("")
   const [render, setRender] = useState(false);
   const [loading, setLoading] = useState(false)
   useEffect(() => {
      setLoading(true)
      CompanyServices.Company(props.companyId.id)
         .then(res => {
            setCompany(res.data)
            setLoading(false)
         }).catch(err => {
            console.log(err);
            setLoading(false)
         })
         AccountServices.listAccount(props.companyId.id)
            .then(res => { 
               setListAccount(res.data)
               console.log(res.data);
            }).catch(err => { 
               console.log(err);
               setLoading(false)
            })
      if (company !== "" && listAccount.length !== 0) { 
         setLoading(false)
      }
      
   },[render]);

   const renderSetting = () => { 
      setRender(!render)
   }


   return (
      <>
         {company === "" || listAccount==="" || loading ?
            <>
               <div id="bg-loading" className="bg-loading" >
						<div id="loading" className="loading"></div>
					</div>
         </> :
            <>
               <div className="container-fluid">
            <div className="row setting-page col-lg-12 col-sm-12"  style={{minHeight:"100vh"}}>
               <div className="nav setting-menu flex-column nav-pills col-lg-3 col-sm-3" id="v-pills-tab" role="tablist" aria-orientation="vertical" >
                  <a className="nav-link active" id="v-pills-company-tab" data-toggle="pill" href="#v-pills-company" role="tab" aria-controls="v-pills-company" aria-selected="true">
                     Company
                  </a>
                  <a className="nav-link" id="v-pills-sales-tab" data-toggle="pill" href="#v-pills-sales" role="tab" aria-controls="v-pills-sales" aria-selected="false">
                     Sales
                  </a>
                  <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                     Purchase
                  </a>
                  <a className="nav-link" id="v-pills-product-service-tab" data-toggle="pill" href="#v-pills-product-service" role="tab" aria-controls="v-pills-product-service" aria-selected="false">
                     Products & Services
                  </a>
                  <a className="nav-link" id="v-pills-templates-tab" data-toggle="pill" href="#v-pills-templates" role="tab" aria-controls="v-pills-templates" aria-selected="false">
                     Templates
                  </a>
                  <a className="nav-link" id="v-pills-account-mapping-tab" data-toggle="pill" href="#v-pills-account-mapping" role="tab" aria-controls="v-pills-account-mapping" aria-selected="false">
                     Account Mapping
                  </a>
                  <a className="nav-link" id="v-pills-user-setting-tab" data-toggle="pill" href="#v-pills-user-setting" role="tab" aria-controls="v-pills-user-setting" aria-selected="false">
                     Users Setting
                  </a>
                  <a className="nav-link" id="v-pills-setting-theme-tab" data-toggle="pill" href="#v-pills-setting-theme" role="tab" aria-controls="v-pills-setting-theme" aria-selected="false">
                     Theme Setting
                  </a>
               </div>
               <div className="tab-content col-lg-9 col-sm-8" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-company" role="tabpanel" aria-labelledby="v-pills-company-tab">

                     <CompanySetting data={company} render={renderSetting}/>
                  </div>
                  <div className="tab-pane fade" id="v-pills-sales" role="tabpanel" aria-labelledby="v-pills-sales-tab">
                     <SalesPage data={company} render={renderSetting}/>

                  </div>
                  <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                     <Purcahse data={company} render={renderSetting}/>
                  </div>
                  <div className="tab-pane fade" id="v-pills-product-service" role="tabpanel" aria-labelledby="v-pills-product-service-tab">
                     <ProductServices data={company} render={renderSetting}/>
                  </div>
                  <div className="tab-pane fade" id="v-pills-templates" role="tabpanel" aria-labelledby="v-pills-templates-tab">
    
                     <TemplatePage data={company} render={renderSetting}/>

                  </div>
                  <div className="tab-pane fade" id="v-pills-account-mapping" role="tabpanel" aria-labelledby="v-pills-account-mapping-tab">
    
                           
                           {listAccount === "" ?
                              <>
                              </> :
                              <>
                           <AccountMappingPage data={company} account={listAccount} render={renderSetting}/>
                           </>}

                  </div>
                  <div className="tab-pane fade" id="v-pills-user-setting" role="tabpanel" aria-labelledby="v-pills-user-setting-tab">
    
                     <UserSettingPage data={company} render={renderSetting}/>

                  </div>
                  <div className="tab-pane fade" id="v-pills-setting-theme" role="tabpanel" aria-labelledby="v-pills-setting-theme-tab">
    
                     <ThemeSetting theme={props.theme} render={renderSetting}/>

                  </div>
               </div>
            </div>
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


export default connect(mapStateToProps,mapDispatchToProps)(SettingPage);