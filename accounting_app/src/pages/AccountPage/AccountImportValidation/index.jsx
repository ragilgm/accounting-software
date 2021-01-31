import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import AccountServices from '../../../services/AccountServices'
import CategoryAccountServices from '../../../services/CategoryAccountServices'
import Select from 'react-select';
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function AccountImportValidataion(props) {

   const history = useHistory()

   const [accountImport, setAccountImport] = useState([])
   const [listAccount, setListAccount] = useState([])
   const [listCategory, setListCategory] = useState([])
   const [headerAccount, setHeaderAccount] = useState([])
   const [headerByCategory, setHeaderByCategory]=useState([])

   const [render, setRender] = useState(false)

   useEffect(() => {

      AccountServices.AccountList(props.company.id)
         .then(res => {
            console.log(res.data);
            setListAccount(res.data);
            setHeaderAccount(res.data.filter(f=> f.parent===false).map(d => ({ value: d.number_account, label: `(${d.number_account}) - ${d.name}` })))
         })
      
      setAccountImport(props.dataImport.data)

      CategoryAccountServices.listCategoryAccount()
         .then(res => {
            console.log(res.data);
            setListCategory(res.data.map(d => ({ value: d.id, label: ` ${d.categoryName} ` })))
    
          })
   }, [render])

   const [inputIsEditing, setInputIsEditing] = useState(false)

   const toggleDebitHandler = () => {
      setInputIsEditing(!inputIsEditing)
   }


   const importAccountHandler = () => {

      const dataImport = accountImport.filter(acc => acc.importStatus===true)
      const failed = accountImport.filter(acc => acc.importStatus===false)

      console.log('====================================');
      console.log(dataImport);
      console.log('====================================');
      var payload = {
         "setupType": "import",
         "data":dataImport
      }
      if (dataImport.length === 0) { 
         swal("Import Failed", "Please check your data again..!");
         return
      } else {
         AccountServices.importAccount(props.company.id, payload).then(res => {
            swal("Status", "Success : "+dataImport.length+", Failed : "+failed.length,);
            props.importAccount("")

            history.push("/account")
         }).catch(err => {
            alert(err)
         })
      }


   }

   const cancelHandler = () => {
      history.push("/account")
      props.importAccount("")
   }

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


   const changeValue = (e, idx,label) => {
      var values = [...accountImport]


      if (e.value !== undefined) {
         if (label === "category") { 
            values[idx].categoryNumber = e.value
         }
         if (label === "header") { 
            values[idx].headerAccountNumber = e.value
         }
      } else { 
         values[idx][e.target.name] = e.target.value
      }

      
      setAccountImport(values)
   }

   const checkValid = (e, idx, label) => { 
      setInputIsEditing(!inputIsEditing)
      var values = [...accountImport]
      for (let i = 0; i < values.length; i++) {
         const element = values[i];
         element.importStatus = false

         console.log(listCategory);

         var checkAccountName = listAccount.find(x=>x.name===element.accountName)
         var checkAccountNumber = listAccount.find(x=>x.number_account===element.accountNumber)
         var headerAccountNumber = listAccount.find(x => x.number_account === element.headerAccountNumber)
         var checkCategoryAccount = listCategory.find(x => x.value === parseInt(element.categoryNumber))
         console.log(headerAccountNumber);
         if (element.headerAccountNumber !== "") {
            if (checkAccountName === undefined && checkAccountNumber === undefined && headerAccountNumber !== undefined && checkCategoryAccount!==undefined) {
               element.importStatus = true
            }
         } else {
            if (checkAccountName === undefined && checkAccountNumber === undefined && checkCategoryAccount!==undefined) {
               element.importStatus = true
            } 
          }
      }
      setAccountImport(values)
   }

   const deleteHandler = (idx) => { 
      const values = [...accountImport];
      values.splice(idx, 1)
      setAccountImport(values)
      if (values.length === 0) {
         props.importAccount("")
      } else { 
         props.importAccount(values)
      }
   }

   if (props.dataImport === "") {
      return (<><Redirect push to="/account" /></>)
   } else {

      return (
         <>
            <div className="container-fluid">
               <div className="header">
                  <div className="col-lg-12 row justify-content-between">
                     <div >
                        <h3>Import - Account</h3>
                     </div>
                     <div className="row">
                        <div className="mr-3">
                           <input type="button" value="Cancel" className="btn btn-danger" onClick={cancelHandler} />
                        </div>
                        <div>

                           <input type="button" value="Import" className="btn btn-success" onClick={importAccountHandler} />
                        </div>

                     </div>
                  </div>
                  <hr />
               </div>
               <p><i>Please review your data:</i></p>
               <div className="col-lg-12 row">
                  <div className="col-lg-1 text-center" style={{fontWeight:"bold"}}>
                     #
                  </div>
                  <div className="col-lg-2 text-center" style={{fontWeight:"bold"}}>
                     Acc Name
                  </div>
                  <div className="col-lg-1 text-center" style={{fontWeight:"bold"}}>
                     Acc Num
                  </div>
                  <div className="col-lg-1 text-center" style={{fontWeight:"bold"}}>
                     Description
                  </div>
                  <div className="col-lg-2 text-center" style={{fontWeight:"bold"}}>
                     Category Acc
                  </div>
                  <div className="col-lg-1 text-center" style={{fontWeight:"bold"}}>
                     Balance
                  </div>
                  <div className="col-lg-1 text-center" style={{fontWeight:"bold"}}>
                     DTN
                  </div>
                  <div className="col-lg-2 text-center" style={{fontWeight:"bold"}}>
                     Header
                  </div>
                  <div className="col-lg-1 text-center" style={{fontWeight:"bold"}}>
                     Action
                  </div>
               </div>

               

               {accountImport.map((d, idx) =>
                  <div className="col-lg-12 row my-4" key={idx}>
                     {d.importStatus ?
                        <>
                           <div className="col-lg-1" key={idx} style={{ borderBottom: "2px solid green", padding: "5px" }}>
                              {idx + 1}
                           </div>
                           <div className="col-lg-2" style={{ borderBottom: "2px solid green", padding: "5px" }}>
                              <input type="text" className="form-control" value={d.accountName} name="accountName" onChange={(e) => changeValue(e, idx)} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid green", padding: "5px" }}>
                              
                              <input type="number" name="accountNumber" className="form-control" value={d.accountNumber} onChange={(e)=>changeValue(e, idx)} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid green", padding: "5px" }}>
                              <input type="text" name="description" className="form-control" value={d.description} onChange={(e)=>changeValue(e, idx)} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-2" style={{ borderBottom: "2px solid green", padding: "5px" }}>
                           <Select
                                 value={listCategory.find(ac => ac.value === parseInt(d.categoryNumber))}
                                 options={listCategory}
                                 onChange={(e) => changeValue(e, idx, "category")}
                                 onBlur={(e)=>checkValid(e, idx,"category")}
                              />
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid green", padding: "5px" }}>
                          
                           {inputIsEditing ?
                              <>
                                 <input type="number" 
                                    value={d.openingBalance}
                                    placeHolder="insert ammount"
                                    onChange={(e)=>changeValue(e, idx)}
                                    className="form-control mt-2"
                                    onBlur={(e)=>checkValid(e, idx)}
                                       name="openingBalance"
                                 />
                              </> :
                              <>
                                     <input type="text" 
                                   value={convertRupiah(d.openingBalance)}
                                    placeHolder="insert ammount"
                                    onChange={(e)=>changeValue(e, idx)}
                                       className="form-control mt-2"
                                       name="openingBalance"
                                    onFocus={toggleDebitHandler}
                                 /> 
                              </>}
                          
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid green", padding: "5px" }}>
                              <input type="text" name="defaultTaxName" className="form-control" value={d.defaultTaxName} onChange={(e)=>changeValue(e, idx)} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-2" style={{ borderBottom: "2px solid green", padding: "5px" }}>
                                 <Select
                                 value={headerAccount.find(ac => ac.value === parseInt(d.headerAccountNumber))}
                                 options={headerAccount}
                                 onChange={(e) => changeValue(e, idx, "header")}
                                 onBlur={(e) => checkValid(e, idx, "header")}
                              />
                           </div>
                           <div className="col-lg-1 text-center mt-3">
                              <i className="fas fa-trash" onClick={()=>deleteHandler(idx)}></i>
                           </div>
                        </> :
                        <>
                            <div className="col-lg-1" key={idx} style={{ borderBottom: "2px solid red", padding: "5px" }}>
                              {idx + 1}
                           </div>
                           <div className="col-lg-2" style={{ borderBottom: "2px solid red", padding: "5px" }}>
                              <input type="text" name="accountName" onChange={(e)=>changeValue(e, idx)} className="form-control" value={d.accountName} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid red", padding: "5px" }}>
                              <input type="number" name="accountNumber" onChange={(e)=>changeValue(e, idx)} className="form-control" value={d.accountNumber} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid red", padding: "5px" }}>
                              <input type="text" name="description" onChange={(e)=>changeValue(e, idx)} className="form-control" value={d.description} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-2" style={{ borderBottom: "2px solid red", padding: "5px" }}>
                           <Select
                                    value={listCategory.find(ac => ac.value === parseInt(d.categoryNumber))}
                                    options={listCategory}
                                 onChange={(e) => changeValue(e, idx,"category")}
                                 onBlur={(e)=>checkValid(e, idx,"category")}
                              />
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid red", padding: "5px" }}>


                           {inputIsEditing ?
                              <>
                                 <input type="number" 
                                    value={d.openingBalance}
                                    placeHolder="insert ammount"
                                    onChange={(e)=>changeValue(e, idx)}
                                    className="form-control mt-2"
                                    onBlur={(e)=>checkValid(e, idx)}
                                       name="openingBalance"
                                 />
                              </> :
                              <>
                                     <input type="text" 
                                   value={convertRupiah(d.openingBalance)}
                                    placeHolder="insert ammount"
                                    onChange={(e)=>changeValue(e, idx)}
                                       className="form-control mt-2"
                                       name="openingBalance"
                                    onFocus={toggleDebitHandler}
                                 /> 
                              </>}
{/* 
                              <input type="text" name="openingBalance" className="form-control"  onBlur={(e)=>checkValid(e, idx)} /> */}
                           </div>
                           <div className="col-lg-1" style={{ borderBottom: "2px solid red", padding: "5px" }}>
                              <input type="text" name="defaultTaxName" onChange={(e)=>changeValue(e, idx)} className="form-control" value={d.defaultTaxName} onBlur={(e)=>checkValid(e, idx)} />
                           </div>
                           <div className="col-lg-2" style={{ borderBottom: "2px solid red", padding: "5px" }}>

                           <Select
                                    value={headerAccount.find(ac => ac.value === parseInt(d.headerAccountNumber))}
                                    options={headerAccount}
                                 onChange={(e) => changeValue(e, idx, "header")}
                                 onBlur={(e)=>checkValid(e, idx)} 
                              />
                           </div>
                           <div className="col-lg-1 text-center mt-3">
                              <i className="fas fa-trash" onClick={()=>deleteHandler(idx)}></i>
                           </div>
                        </>}



                  </div>
               )}


            </div>
         </>
      )
   }
}

const mapStateToProps = (state) => ({
   company: state.AuthReducer.company,
   dataImport: state.DataReducer.statementImportAccount
})

const mapDispatchToProps = (dispatch) => ({
   importAccount: (statementImport) => dispatch({ type: "IMPORTACCOUNT", payload: statementImport })
})
export default (connect(mapStateToProps, mapDispatchToProps)(AccountImportValidataion));

