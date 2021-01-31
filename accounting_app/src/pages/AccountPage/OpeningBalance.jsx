import React, { useEffect, useState } from 'react'
import OpenningBalanceServices from '../../services/OpenningBalanceServices'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

function OpeningBalance(props) {

   const history = useHistory()

   var [loading, setLoading] = useState(false);
   const [listAccount, setListAccount] = useState([]);
   const [render, setRender] = useState(false)

   const convertRupiah = (bilangan) => {
      var number_string = bilangan.toString(),
         sisa = number_string.length % 3,
         rupiah = number_string.substr(0, sisa),
         ribuan = number_string.substr(sisa).match(/\d{3}/g);

      if (ribuan) {
         var separator = sisa ? '.' : '';
         rupiah += separator + ribuan.join('.');
      }

      return rupiah;
   }

   const dateNow = () => {
      var now = new Date();
      var month = (now.getMonth() + 1);
      var day = now.getDate();
      if (month < 10)
         month = "0" + month;
      if (day < 10)
         day = "0" + day;
      var today = now.getFullYear() + '-' + month + '-' + day;
      return today
   }



   useEffect(() => {
      setLoading(true)
      OpenningBalanceServices.listOpenningBalance(props.company.id)
         .then(res => {
            console.log('====================================');
            console.log(res.data);
            console.log('====================================');
            setListAccount(res.data.map(acc => ({
               account_id: acc.id,
               account_number: acc.number_account,
               account_name:acc.account_name,
               category:acc.category_name,
               debit: acc.debit,
               credit:acc.creadit
            })))
            setLoading(false)
         }).catch(err => {
            alert(err)
         })
   }, [render])

   const [inputCredit, setInputCredit] = useState({ index: 0, value: false })
   const [inputDebit, setInputDebit] = useState({ index: 0, value: false })
   const handleOpenInputCredit = (index) => {
      setInputCredit({ index: index, value: true })
   }
   const handleOpenInputDebit = (index) => {
      setInputDebit({ index: index, value: true })
   }

   const handleCloseInputCredit = (index) => {
      var values = [...listAccount]
      if (values[index].credit === "") {
         values[index].credit=0
      }else {
         values[index].credit=values[index].credit-0
      }
      values[index].debit=0
      setListAccount(values)
      setInputCredit({ index: index, value: false })
    }
   const handleCloseInputDebit = (index) => {
      var values = [...listAccount]
      if (values[index].debit === "") {
         values[index].debit = 0
      } else { 
         values[index].debit=values[index].debit-0
      }
      values[index].credit=0
      setListAccount(values)
      setInputDebit({ index: index, value: false })
   }
   const changeValue = (event, index) => { 
      var values = [...listAccount]
     
      values[index][event.target.name]=event.target.value
      setListAccount(values)
   }
   
   const cancelHandler = () => { 
      history.push("/account")
   }

   const updateConversionHandler = () => { 

      var openingBalance = listAccount;
      var accountLine = []
       for (let i = 0; i < openingBalance.length; i++) {
         const element = openingBalance[i];

         if (element.credit !== 0 || element.debit !== 0) { 
            accountLine.push({
               account_id: element.account_id,
               debit: element.debit,
               credit:element.credit
            })
         }
         
      }

      var payload = {
         transaction_date: dateNow(),
         person_id: props.userLogin.id,
         accountLines:accountLine,
      }
      console.log(payload);
      OpenningBalanceServices.setConversionBalance(props.company.id, payload)
         .then(res => { 
            console.log(res);
            alert("success")
            history.push("/account")
         }).catch(err => { 
            alert(err)
         })

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
             
               <div className=" col-lg-12" style={{backgroundColor:"white", padding:"5rem"}}>
               <div className="header container-fluid" >
                  <h5>Accounts</h5>
                  <h3>Opening Balances</h3>
               </div>
                  <div>
                  <hr />
                     <div className="col-lg-12 row mt-4">
                        <div className="col-lg-6">
                           <h5>Account</h5>
                        </div>
                        <div className="col-lg-3">
                           <h5>Debit</h5>
                        </div>
                        <div className="col-lg-3">
                           <h5>Credit</h5>
                        </div>
                     </div>
                     <hr/>
                     <div className="body">
                        {listAccount.map((account, idx) =>
                           <div className="col-lg-12 row" key={account.id}>
                              <div className="col-lg-6 my-1">
                              {account.account_number}   {account.account_name}   
                              </div>
                              <div className="col-lg-3 my-1">
                                 {inputDebit.index === idx && inputDebit.value === true ?
                                    <>
                                       <input type="number" name="debit" value={account.debit} className="form-control changeToInput"
                                          onBlur={() => handleCloseInputDebit(idx)}
                                          onChange={(e) => changeValue(e, idx)}
                                          autoFocus
                                       />
                                       
                                    </>   
                                    :
                                    <>
                                       {account.category === "Depreciation & Amortization" ||
                                          account.category === "Accounts Payable (A/P)" ||
                                          account.category === "Other Current Liabilities" || account.category === "Income" ?
                                          <>
                                             <p className="text-danger font-weight-bold" onClick={() => handleOpenInputDebit(idx)}>{props.company.company_currency.symbol} {convertRupiah(account.debit)}</p>
                                          </>
                                          :
                                          <>
                                               <p className="text-primary font-weight-bold" onClick={() => handleOpenInputDebit(idx)}>{props.company.company_currency.symbol} {convertRupiah(account.debit)}</p>
                                          </>}
                                   
                                    </>}


                              </div>
                              <div className="col-lg-3 my-1">
                                 {inputCredit.index === idx && inputCredit.value === true ?
                                    <>
                                       <input type="number" className="form-control changeToInput"
                                          name="credit" value={account.credit}
                                          onBlur={() => handleCloseInputCredit(idx)}
                                          onChange={(e) => changeValue(e, idx)}
                                          autoFocus
                                       />
                                    </>
                                    :
                                    <>
                                         {account.category === "Depreciation & Amortization" ||
                                          account.category === "Accounts Payable (A/P)" ||
                                          account.category === "Other Current Liabilities" || account.category === "Income" ?
                                          <>
                                             
                                                 <p className="text-primary font-weight-bold" onClick={() => handleOpenInputCredit(idx)}>{props.company.company_currency.symbol} {convertRupiah(account.credit)}</p>
                                          </>
                                          :
                                          <>
                                               <p className="text-danger font-weight-bold" onClick={() => handleOpenInputCredit(idx)}>{props.company.company_currency.symbol} {convertRupiah(account.credit)}</p>
                                          </>}
                                      
                                    </>}
                              </div>
                           </div>

                        )}
     
                     </div>
                     <hr />
                     <div className="action row d-flex justify-content-center">
                        <input type="button" value="Cancel" className="btn btn-danger mr-3" onClick={cancelHandler}/>
                        <input type="button" value="Save Conversion" className="btn btn-primary"
                           onClick={updateConversionHandler}/>
                     </div>
                  </div>
               </div>
            </>}
      </>
   )
}



const mapStateToProps = (state) => ({
   company: state.AuthReducer.company,
   userLogin: state.AuthReducer.user,
   isLogin: state.AuthReducer.isLogin,
})

const mapDispatchToProps = (dispatch) => ({
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})
export default (connect(mapStateToProps, mapDispatchToProps)(OpeningBalance));

