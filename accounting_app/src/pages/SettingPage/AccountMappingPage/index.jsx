import React, { useState } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CompanyServices from '../../../services/CompanyServices'
import Sales from './Sales'
import Purchase from './Purchase'
import Arap from './Arap'
import Stock from './Stock'
import Other from './Other'
import { connect} from 'react-redux'

function AccountMappingPage(props) {

   console.log(props.data);

   const [loading, setLoading] = useState(false)
   const [render, setRender] = useState(false)

      const default_account = {
         default_account_payable: props.data.default_accounts.default_account_payable.id,
         default_account_receiveable: props.data.default_accounts.default_account_receiveable.id,
         default_cost_of_good_sold: props.data.default_accounts.default_cost_of_good_sold.id,
         default_fixed_asset_account: props.data.default_accounts.default_fixed_asset_account.id,
         default_inventory_account:props.data.default_accounts.default_inventory_account.id,
         default_opening_balance_equity: props.data.default_accounts.default_opening_balance_equity.id,
         default_prepayment_account: props.data.default_accounts.default_prepayment_account.id,
         default_purchase_tax_account: props.data.default_accounts.default_purchase_tax_account.id,
         default_sale_account: props.data.default_accounts.default_sale_account.id,
         default_sale_tax_account: props.data.default_accounts.default_sale_tax_account.id,
         default_sales_return_account: props.data.default_accounts.default_sales_return_account.id,
         default_stock_adj_account_general: props.data.default_accounts.default_stock_adj_account_general.id,
         default_stock_adj_account_production: props.data.default_accounts.default_stock_adj_account_production.id,
         default_stock_adj_account_waste: props.data.default_accounts.default_stock_adj_account_waste.id,
         default_unbilled_ap_account: props.data.default_accounts.default_unbilled_ap_account.id,
         default_unbilled_ar_account: props.data.default_accounts.default_unbilled_ar_account.id,
         default_unbilled_sales_account: props.data.default_accounts.default_unbilled_sales_account.id,
         default_unearned_revenue_account: props.data.default_accounts.default_unearned_revenue_account.id,
         default_purchase_shipping_account: props.data.default_accounts.default_purchase_shipping_account.id,
         default_sale_discount_account: props.data.default_accounts.default_sale_discount_account.id,
         default_sale_shipping_account:props.data.default_accounts.default_sale_shipping_account.id,
      }


   const [defaultAccountId, setDefaultAccountId] = useState(default_account)

   const [sales, setSales] = useState(false);
   const salesHandler = () => {
      setSales(!sales)
   }
   const [purchase, setPurchase] = useState(false);
   const purcahseHandler = () => {
      setPurchase(!purchase)
   }
   const [arap, setArap] = useState(false);
   const arapHandler = () => {
      setArap(!arap)
   }
   const [stock, setStock] = useState(false);
   const stockHandler = () => {
      setStock(!stock)
   }
   const [other, setOther] = useState(false);
   const otherHandler = () => {
      setOther(!other)
   }


   const onChangeValue = (e) => { 
      var { name, value } = e.target
      console.log(name, value);
      setDefaultAccountId({...defaultAccountId,[name]:value})
   }

   const updateHandler = (e) => { 
      e.preventDefault()
      setLoading(true)
      console.log(props.companyId.id);
      console.log(defaultAccountId);
      CompanyServices.updateCompanyMappingAccountSetting(props.companyId.id, defaultAccountId)
         .then(res => { 
            alert("update successfull")
            console.log(res.data);
         }).catch(err => { 
            alert("update failed")
            console.log(err);
         }).finally(
            () => { 
               props.render()
               setLoading(false)
               setRender(!render)
            }

         )
   }

   const cancelHandler = () => { 
    window.history.go()
   }

   return (
      <>
         {props.account.length === 0 || loading?
            <>
                    <div id="bg-loading" className="bg-loading" >
						<div id="loading" className="loading"></div>
					</div>
            </>
            :
            <>
               
        
         <div className="form">
            <form autoComplete="off" className="row " >
               <div className="account-mapping col-lg-12 col-sm-12">
                  <div className="mb-5 my-5">
                     <h5 >Account Mapping</h5>
                     <small ><i>
                        Select the default account for each label to help the system automatically create your journal entries from transactions. All fields are required</i></small>
                  </div>
                  <ul>
                     <li className="list-line col-lg-12 sol-sm-10" onClick={salesHandler}>
                        <div className="row d-flex justify-content-between">
                           <h6>Sales</h6>
                           {sales ? <ExpandLess /> : <ExpandMore />}
                        </div>
                     </li>
                     <Collapse in={sales} timeout="auto" unmountOnExit>
                              <Sales account={props.account} default_account={props.data.default_accounts} onChangeValue={onChangeValue}/>
                     </Collapse>
                     <li className="list-line col-lg-12 sol-sm-10 my-3" onClick={purcahseHandler}>
                        <div className="row d-flex justify-content-between">
                           <h6>Purchase</h6>
                           {purchase ? <ExpandLess /> : <ExpandMore />}
                        </div>
                     </li>
                     <Collapse in={purchase} timeout="auto" unmountOnExit>
                              <Purchase account={props.account} default_account={props.data.default_accounts} onChangeValue={onChangeValue}/>
                     </Collapse>
                     <li className="list-line col-lg-12 sol-sm-10 my-3" onClick={arapHandler}>
                        <div className="row d-flex justify-content-between">
                           <h6>AR/AP</h6>
                           {arap ? <ExpandLess /> : <ExpandMore />}
                        </div>
                     </li>
                     <Collapse in={arap} timeout="auto" unmountOnExit>
                        <Arap account={props.account} default_account={props.data.default_accounts} onChangeValue={onChangeValue}/>
                     </Collapse>

                     <li className="list-line col-lg-12 sol-sm-10 my-3" onClick={stockHandler}>
                        <div className="row d-flex justify-content-between">
                           <h6>Stock</h6>
                           {stock ? <ExpandLess /> : <ExpandMore />}
                        </div>
                     </li>
                     <Collapse in={stock} timeout="auto" unmountOnExit>
                        <Stock account={props.account} default_account={props.data.default_accounts} onChangeValue={onChangeValue}/>
                     </Collapse>

                     <li className="list-line col-lg-12 sol-sm-10 my-3" onClick={otherHandler}>
                        <div className="row d-flex justify-content-between">
                           <h6>Other</h6>
                           {other ? <ExpandLess /> : <ExpandMore />}
                        </div>
                     </li>
                     <Collapse in={other} timeout="auto" unmountOnExit>
                        <Other account={props.account} default_account={props.data.default_accounts} onChangeValue={onChangeValue}/>
                     </Collapse>

                  </ul>
                  <div className="col-lg-12 d-flex justify-content-ceneter mt-4">
                     <div className="col-lg-6">
                              <button type="button" className="btn button btn-danger" onClick={cancelHandler}>Cancel</button>
                     </div>
                     <div className="col-lg-6">
                              <button type="button" className="btn button btn-success" value="Update" onClick={updateHandler}> Update</button>
                     </div>
                  </div>
               </div>
            </form>
               </div>
               </>
         }
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


export default connect(mapStateToProps,mapDispatchToProps)(AccountMappingPage);

