import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function ModalResetAccount(props) {

   const history = useHistory()

   const [fileName, setFileName] = useState("")
   const [dataImport, setDataImport] = useState("")

   const resetHandler = () => { 
     const payload = {
         setupType: "reset",
         data:dataImport
         
      }
      console.log(payload);
      props.importAccount(payload)
      swal({
         title: "Import Success..",
         icon: "success",
       }); 
      history.push("/import/account-import-validation")
   }

   const resetFileHandler = (e) => { 
      const files = e.target.files[0];
      console.log(files);
      if (files.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
         alert("File extension not supported..!!")
      } else { 
         setFileName(files)
         const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(files);
   
            fileReader.onload = (e) => {
               const bufferArray = e.target.result;
   
               const wb = XLSX.read(bufferArray, { type: "buffer" });
               const wsname = wb.SheetNames[0];
               console.log(wsname);
               const ws = wb.Sheets[wsname];
               console.log(ws);
               const data = XLSX.utils.sheet_to_json(ws, { raw: false });
               resolve(data);
            };
   
            fileReader.onerror = (error) => {
               reject(error);
            };
         });
         promise.then((d) => {
            console.log(d);
           
            if (d.length !== 0) {
               var dataMap = []
               d.map(data => { 
                  var payload = {
                     "accountName": data.accountName,
                     "accountNumber": data.accountNumber,
                     "categoryNumber": data.categoryNumber,
                     "defaultTaxName": data.defaultTaxName,
                     "description": data.description,
                     "headerAccountNumber": data.headerAccountNumber,
                     "openingBalance": data.openingBalance
                  }
                  if (payload.accountName === undefined) {
                     payload.accountName = ""
                  }
                  if (payload.accountNumber === undefined) { 
                     payload.accountNumber =""
                  }
                  if (payload.categoryNumber === undefined) { 
                     payload.categoryNumber =""
                  }
                  if (payload.defaultTaxName === undefined) { 
                     payload.defaultTaxName =""
                  }
                  if (payload.description === undefined) { 
                     payload.description =""
                  }
                  if (payload.headerAccountNumber === undefined) { 
                     payload.headerAccountNumber =""
                  }
                  if (payload.openingBalance === undefined) { 
                     payload.openingBalance =0
                  }
                  dataMap.push(payload);

               })

               var listAccount = props.listAccount;
               var listCategory = props.listCategory;

               for (let i = 0; i < dataMap.length; i++) {
                  const element = dataMap[i];
                  element.importStatus = false

                  var checkAccountName = listAccount.find(x=>x.name===element.accountName)
                  var checkAccountNumber = listAccount.find(x=>x.number_account===element.accountNumber)
                  var headerAccountNumber = listAccount.find(x => x.number_account === element.headerAccountNumber)
                  var checkCategoryNumber = listCategory.find(x => x.id === parseInt(element.categoryNumber))
                  
                  

                  if (element.headerAccountNumber !== "") {
                     if (checkAccountName === undefined && checkAccountNumber === undefined && headerAccountNumber !== undefined && checkCategoryNumber!==undefined) {
                        element.importStatus = true
                     } 
                     
                  } else {
                     if (checkAccountName === undefined && checkAccountNumber === undefined && checkCategoryNumber!==undefined) {
                        element.importStatus = true
                     }  
                  }

                    

               }

               setDataImport(dataMap)
              
            } else {    
               swal({
                  title: "No data record ..",
                  icon: "error",
                }); 
            }
         });
      }
   }

   return (
      <>

         <div className="modal fade" id="resetAccount" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
            style={{ marginTop: "50px" }}>
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Reset Chart Of Account</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <div className="col-lg-12 text-center">

                        <i className="fas fa-paste"
                           style={{ fontSize: "200px", color: "grey" }}></i>
                        <br />
                        <p className="text-center mt-3">
                           To reset start by uploading a file containing your own COA or download the template (if you don't have it)
                        </p>

                     </div>
                     <div className="col-lg-12 row">
                        <div className="col-lg-6" style={{ textAlign: "center", alignItems: "center" }}>
                           <a href="http://localhost:8080/api/v1/importAccount/template"
                        className="btn btn-primary"
                        style={{borderRadius:"1rem"}}>Download Template</a>
                        
                        </div>
                        <div className="col-lg-6" style={{ textAlign: "center", alignItems: "center" }}>
                           <label htmlFor="reset" className="btn btn-primary"
                              style={{borderRadius:"1rem", fontWeight:"bold"}}>Upload File</label>
                           <input type="file" id="reset" name="reset" accept=".xlsx"  hidden onChange={resetFileHandler} />
                           <p>{fileName.name}
                              {fileName === "" ? <></> :
                                 <>
                                    <i style={{ color: "red", marginLeft: "1rem" }}
                                       onClick={() => {
                                          setDataImport("")
                                          setFileName("")
                                       }}>X</i>
                                 </>}
                           </p>
                        </div>

                     </div>

                  </div>
                  <div className="modal-footer">
                  {dataImport === "" ?
                        <>
                        <input type="button" className="btn btn-primary" value="PROCEED" disabled/>
                        </> : <>
                           <input type="button" className="btn btn-primary" value="RESET" onClick={resetHandler} data-dismiss="modal"/>
               
                        </>}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}


const mapStateToProps = (state) => ({
   company: state.AuthReducer.company,
   importAccount:state.DataReducer.listAccount
})

const mapDispatchToProps = (dispatch) => ({
   importAccount: (statementImport) => dispatch({type:"IMPORTACCOUNT", payload:statementImport}),
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})
export default (connect(mapStateToProps, mapDispatchToProps)(ModalResetAccount));
