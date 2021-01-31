import React, { useState} from 'react'
import * as XLSX from 'xlsx'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function JournalImport(props) {

   const history = useHistory();

   const [fileImport, setFileImport]=useState("")
   const [dataImport, setDataImport] = useState("")

   const dateNow = (date) => {
      var now = new Date(date);
      var month = (now.getMonth() + 1);
      var day = now.getDate();
      if (month < 10)
         month = "0" + month;
      if (day < 10)
         day = "0" + day;
      var today = now.getFullYear() + '-' + month + '-' + day;
      return today
   }

   const journalImportHandler = (e) => { 
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
                     "transactionNumber": data.transactionNumber,
                     "transactionDate": dateNow(data.transactionDate),
                     "accountNumber": data.accountNumber,
                     "description": data.description,
                     "debit": data.debit,
                     "credit": data.credit,
                     "memo": data.memo
                  }
                  if (payload.transactionNumber === undefined) {
                     payload.transactionNumber = ""
                  }
                  if (payload.transactionDate === undefined) { 
                     payload.transactionDate =""
                  }
                  if (payload.accountNumber === undefined) { 
                     payload.accountNumber =""
                  }
                  if (payload.description === undefined) { 
                     payload.description =""
                  }
                  if (payload.debit === undefined || parseInt(payload.debit)==="NaN") { 
                     payload.debit =0
                  }
                  
                  if (payload.credit === undefined || parseInt(payload.credit)==="NaN") { 
                   
                     payload.credit =0
                  }
                  if (payload.memo === undefined) { 
                     payload.memo =""
                  }
                 
                  dataMap.push(payload);

               })
               var transactionNumber = [];
               var transactionLines = []

               for (let index = 0; index < dataMap.length; index++) {
                  const element = dataMap[index];
                     var s = transactionNumber.filter(texx => texx === element.transactionNumber)
                  if (s.length === 0) { 
                     transactionNumber.push(element.transactionNumber)
                  }
               }

               for (let index = 0; index < transactionNumber.length; index++) {
                  const trxNo = transactionNumber[index];
                  var transactionLone = dataMap.filter(trxLine => trxLine.transactionNumber === trxNo)
                  var totalDebit = 0;
                  var totalCredit = 0;
                  var accountSame = false;

                  for (let j = 0; j < transactionLone.length; j++) {
                     const countTotal = transactionLone[j];
                     totalDebit+=parseInt(countTotal.debit)
                     totalCredit += parseInt(countTotal.credit)
                  } 

                  var checkAccountSame = transactionNumber.filter(data => data.accountNumber === transactionNumber[index].accountNumber)
                  
                  if (checkAccountSame.length === transactionNumber.length) {
                     accountSame=true
                  } else {
                     accountSame=false
                  }
                  

                  var journalEntryRequet = {
                     "company_id": props.company.id,
                     "transaction_lines": transactionLone,
                     "transaction_date": dateNow(transactionLone[0].transactionDate),
                     "transaction_no": trxNo,
                     "transaction_number_format": null,
                     "memo": transactionLone[0].memo,
                     "totalDebit": totalDebit,
                     "totalCredit":totalCredit
                  }
                  if (totalDebit === totalCredit && accountSame===false) {
                     journalEntryRequet.transactionStatus = true
                  } else { 
                     journalEntryRequet.transactionStatus = false
                  }

                  transactionLines.push(journalEntryRequet)


               }
               setDataImport(transactionLines)

              
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
      console.log(dataImport);
      props.importJournalEntry(dataImport)
      setFileImport("")
      setDataImport("")
      swal({
         title: "Import Success",
         icon: "success",
       });
      history.push("/import/journal-entry-validation")
      
   }

   const removeFIleImportHandler = () => { 
      setFileImport("")
      setDataImport("")
   }

   return (
      <>
     
         <div className="modal fade" id="importJournal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
            style={{marginTop:"50px"}}>
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Import Journal Entry</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <h6>1. Download template</h6>
                     <small >This file has preset column header required to import your data correctly</small>
                     <br />
                     <br/>
                     <a href="http://localhost:8080/api/v1/importJournalEntry/template"
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
                     <label htmlFor="journal" className="btn-sm btn-primary"
                        style={{marginTop:"1rem", borderRadius:"10px", fontWeight:"bold"}}>Import Journal</label>
                     <input type="file" accept=".xls,.xlsx" id="journal" hidden
                        onChange={journalImportHandler} />
                     <p>{fileImport.name}
                        {fileImport !== "" ?
                           <><b className="ml-2"
                              style={{ color: "red" }}
                              onClick={removeFIleImportHandler}>
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
   importJournalEntry: (statementImport) => dispatch({type:"IMPORTJOURNALENTRY", payload:statementImport}),
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})
export default (connect(mapStateToProps, mapDispatchToProps)(JournalImport));

