import React, { useState} from 'react'
import * as XLSX from 'xlsx'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function ModalImportAccount(props) {

   const history = useHistory();

   const [fileImport, setFileImport]=useState("")


   const [dataImport, setDataImport] = useState("")

   const ImportFileHandler = (e) => { 
      const files = e.target.files[0];
      console.log(files);
      if (files.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
         alert("File extension not supported..!!")
      } else { 
         setFileImport(files)
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
                  title: "No data record..",
                  icon: "error",
                }); 
            }
         });
      }
   }

   const importDataHandler = () => { 
      const payload = {
         setupType: "import",
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

   return (
      <>
     
         <div className="modal fade" id="importAccount" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
            style={{marginTop:"50px"}}>
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Import Account</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <h6>1. Download template</h6>
                     <small >This file has preset column header required to import your data correctly</small>
                     <br />
                     <br/>
                     <a href="http://localhost:8080/api/v1/importAccount/template"
                        className="btn-sm btn-primary"
                        style={{marginTop:"1rem", borderRadius:"10px"}}>Download Template</a>
                     <br />
                     <br />
                     <h6>2. Copy/Insert your data</h6>
                     <small>Use Spreadsheet application to copy and paste your data (i.e. exported from other application) into Jurnal import template that you just downloaded. Make sure the data that you input corresponds to each column header provided on the import template</small>
                     <br />
                     <small style={{color:"red"}}><b>IMPORTANT!</b></small>
                     <ul>
                        <li>Maximum is 1000 lines of entry (optimal)</li>
                        <li>Do NOT use separator for thousands (i.e. comma (,) or period (.))</li>
                        <li>Use period (.) as decimal separator</li>
                        <li>Do NOT use currency symbol (i.e. Rp., $, etc)</li>
                        <li>Do NOT change columns provided</li>
                     </ul>
                     <br />
                     <h6>3. Upload Excel template</h6>
                     <small>After you finished with step 2, please upload the file. File needs to be in Excel  format and ended with extension .xlsx 
                     </small>
                     <br />
                     <label htmlFor="import" className="btn-sm btn-primary"
                        style={{marginTop:"1rem", borderRadius:"10px", fontWeight:"bold"}}>Import Account</label>
                     <input type="file" name="import" accept=".xls,.xlsx" id="import" hidden onChange={ImportFileHandler} />
                     <p>{fileImport.name}
                        {fileImport !== "" ?
                           <><b className="ml-2"
                              style={{ color: "red" }}
                              onClick={() => {
                                 setFileImport("")
                                 setDataImport("")
                              }}>
                              X</b></> : <></>}</p>
                    
                 </div>
                  <div className="modal-footer">
                     {dataImport === "" ?
                        <>
                        <input type="button" className="btn btn-primary" value="PROCEED" disabled/>
                        </> : <>
                           <input type="button" className="btn btn-primary" value="PROCEED" onClick={importDataHandler} data-dismiss="modal"/>
               
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
export default (connect(mapStateToProps, mapDispatchToProps)(ModalImportAccount));

