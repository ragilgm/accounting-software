import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AccountServices from '../../../services/AccountServices'
import Select from 'react-select';
import JournalEntryServices from '../../../services/JournalEntryServices'
import { Redirect } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'


function JournalImportValidation(props) {

   const history = useHistory()

   const [dataImport, setDataImport] = useState([])


   const [render, setRender] = useState(false)

   const [isEditing, setIsEditing] = useState(false)

   const [listAccount, setListAccount] = useState([])

   useState(() => {
      AccountServices.AccountList(props.company.id).then(res => {
         setListAccount(res.data.map(d => ({ value: d.number_account, label: `(${d.number_account}) - ${d.name}` })))
      })
      setDataImport(props.importJournal)

      console.log('====================================');
      console.log(props.importJournal);
      console.log('====================================');
   }, [render])

   const changeValue = (e, idx, index) => {
      var values = [...dataImport]
      if (e.value !== undefined) {
         values[index].transaction_lines[idx].accountNumber = e.value
         setDataImport(values)
      } else {
         values[index].transaction_lines[idx][e.target.name] = e.target.value
         setDataImport(values)
      }
  
      var accountSame = false;
      var transactionSame = false;
      for (let i = 0; i < values[index].transaction_lines.length; i++) {
         const element = values[index].transaction_lines[i];
         var a = values[index].transaction_lines.filter(line => line.accountNumber === element.accountNumber && line.transaction_no === element.transaction_no)
         if (a.length === 1) {
            accountSame = false
         } else {
            accountSame = true
         }

        
         var b = values[index].transaction_lines.filter(line => line.transactionNumber === element.transactionNumber)

         if (b.length > 1) {
            transactionSame = true
         } else {
            transactionSame = false
         }

      }
      if (values[index].totalCredit === values[index].totalDebit && accountSame === false && transactionSame === true) {
         values[index].transactionStatus = true
      } else {
         values[index].transactionStatus = false
      }

  
      setDataImport(values)

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

   const imputBlur = (name, idx, index) => {

      var values = [...dataImport]
      if (name === "debit") {
         if (values[index].transaction_lines[idx].debit !== "" || values[index].transaction_lines[idx].debit !== 0) {
            values[index].transaction_lines[idx].credit = 0;
         }
      }

      if (name === "credit") {
         if (values[index].transaction_lines[idx].credit !== "" || values[index].transaction_lines[idx].credit !== 0) {
            values[index].transaction_lines[idx].debit = 0;
         }
      }
      var totalDebit = 0;
      var totalCredit = 0;
      for (let i = 0; i < values[index].transaction_lines.length; i++) {
         const element = values[index].transaction_lines[i];
         totalDebit += parseInt(element.debit)
         totalCredit += parseInt(element.credit);
      }
      values[index].totalCredit = totalCredit;
      values[index].totalDebit = totalDebit;
      setDataImport(values)
      var accountSame = false;
      var transactionSame = false;
      for (let i = 0; i < values[index].transaction_lines.length; i++) {
         const element = values[index].transaction_lines[i];
         var a = values[index].transaction_lines.filter(line => line.accountNumber === element.accountNumber && line.transaction_no === element.transaction_no)
         console.log(a);
         if (a.length === 1) {
            accountSame = false
         } else {
            accountSame = true
         }

        
         var b = values[index].transaction_lines.filter(line => line.transactionNumber === element.transactionNumber)
   
         if (b.length > 1) {
            transactionSame = true
         } else {
            transactionSame = false
         }

      }
      if (values[index].totalCredit === values[index].totalDebit && accountSame === false && transactionSame === true) {
         values[index].transactionStatus = true
      } else {
         values[index].transactionStatus = false
      }

      console.log(accountSame);  
      setDataImport(values)
      setIsEditing(false)
   }

   const imputFocus = () => {
      setIsEditing(true)
   }

   const importHandler = () => {
      var payload = [];
      var failed = []

      for (let index = 0; index < dataImport.length; index++) {
         const element = dataImport[index];
       
         if (element.transactionStatus === true) {
            payload.push(element)
         } else {
            failed.push(element)
         }

      }

      JournalEntryServices.importjournalEntry(payload)
         .then(res => {
            console.log(res.data);
            swal("Status", "Success : "+dataImport.length+", Failed : "+failed.length,);
            props.importJournalEntry("")
            history.push("/account")
         }).catch(err => {
            alert("Import Failed")
         })
   }

   if (props.importJournal === "") {
      return (<><Redirect push to="/account" /></>)
   } else {

      return (
         <>
            <div className="container-fluid" >
               <div className="header">
                  <h3>Import - Journal Entry</h3>
                  <hr />
               </div>
               <div className="row justify-content-between container-fluid">
                  <p>Please review your data:</p>
                  <div className="">
                     <input type="button" value="cancel" className="btn btn-danger mr-3" />
                     <input type="button" value="Import" className="btn btn-primary" onClick={importHandler} />
                  </div>
               </div>

               <hr />
               <div style={{ overflow: "auto", whiteSpace: "nowrap", flexDirection: "row", position: "absolute", justifyContent: "space-between", maxWidth: "90vw" }}>

                  <div style={{ marginBottom: "5rem" }} >

                     <div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "2rem", fontWeight: "bold" }}>#</div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "7rem", fontWeight: "bold" }} >Transaction Number *</div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "7rem", fontWeight: "bold" }}>Transaction Date *</div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "7rem", fontWeight: "bold" }}>Account Code *</div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "8rem", fontWeight: "bold" }}>Description</div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "9rem", fontWeight: "bold" }}>Debit *</div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "9rem", fontWeight: "bold" }}>Credit *</div>
                        <div style={{ display: "inline-block", margin: "10px", marginRight: "7rem", fontWeight: "bold" }}>Memo</div>
                     </div>
                     {dataImport.map((d, index) =>
                        <div key={index}  >

                           {d.transactionStatus ?
                              <>
                                 <div >
                                    {d.transaction_lines.map((data, idx) =>
                                       <div key={idx} >
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "2rem", fontWeight: "bold" }} >{idx + 1}</div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "5rem", fontWeight: "bold", border: "2px solid green", padding: "5px" }} >
                                             <input type="number" className="form-control" name="transactionNumber" value={data.transactionNumber} onChange={(e) => changeValue(e, idx, index)} style={{ backgroundColor: "rgba(255, 212, 207,0.7)" }} />
                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "3rem", fontWeight: "bold", border: "2px solid green", padding: "5px" }}>
                                             <input type="date" className="form-control" name="transactionDate" value={data.transactionDate} onChange={(e) => changeValue(e, idx, index)} /></div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "2rem", fontWeight: "bold", border: "2px solid green", padding: "5px" }} className="col-lg-2">
                                             <Select
                                                value={listAccount.filter(ac => data.accountNumber === ac.value)}
                                                options={listAccount}
                                                onChange={(e) => changeValue(e, idx, index)}

                                             />
                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "1rem", fontWeight: "bold", border: "2px solid green", padding: "5px" }}>
                                             <input type="text" className="form-control" name="description" value={data.description} onChange={(e) => changeValue(e, idx, index)} /></div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "1rem", fontWeight: "bold", border: "2px solid green", padding: "5px" }}>
                                             {isEditing ?
                                                <>
                                                   <input type="text" className="form-control" name="debit" value={data.debit}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onBlur={(e) => imputBlur(e.target.name, idx, index)} />
                                                </> :
                                                <>
                                                   <input type="text" className="form-control" name="debit" value={convertRupiah(data.debit)}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onFocus={() => imputFocus()} />
                                                </>}

                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "1rem", fontWeight: "bold", border: "2px solid green", padding: "5px" }}>
                                             {isEditing ?
                                                <>
                                                   <input type="number" className="form-control" name="credit" value={data.credit}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onBlur={(e) => imputBlur(e.target.name, idx, index)} />
                                                </> :
                                                <>
                                                   <input type="number" className="form-control" name="credit" value={convertRupiah(data.credit)}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onFocus={() => imputFocus()} />
                                                </>}
                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "7rem", fontWeight: "bold", border: "2px solid green", padding: "5px" }}>
                                             <input type="text" className="form-control" name="memo" value={data.memo}
                                                onChange={(e) => changeValue(e, idx, index)} /></div>
                                       </div>
                                    )}
                                 </div>
                              </> :
                              <>
                                 <div  >
                                    {d.transaction_lines.map((data, idx) =>
                                       <div key={idx} >
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "2rem", fontWeight: "bold" }}>{idx + 1}</div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "5rem", fontWeight: "bold", border: "2px solid red", padding: "5px" }} >
                                             <input type="number" className="form-control" name="transactionNumber" value={data.transactionNumber} onChange={(e) => changeValue(e, idx, index)} />
                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "3rem", fontWeight: "bold", border: "2px solid red", padding: "5px" }} >
                                             <input type="date" className="form-control" name="transactionDate" value={data.transactionDate} onChange={(e) => changeValue(e, idx, index)} /></div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "2rem", fontWeight: "bold", border: "2px solid red", padding: "5px" }} className="col-lg-2">

                                             <Select
                                                value={listAccount.filter(ac => data.accountNumber === ac.value)}
                                                options={listAccount}
                                                onChange={(e) => changeValue(e, idx, index)}

                                             />
                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "1rem", fontWeight: "bold", border: "2px solid red", padding: "5px" }}>
                                             <input type="text" className="form-control" name="description" value={data.description} onChange={(e) => changeValue(e, idx, index)} /></div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "1rem", fontWeight: "bold", border: "2px solid red", padding: "5px" }}>
                                             {isEditing ?
                                                <>
                                                   <input type="text" className="form-control" name="debit" value={data.debit}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onBlur={(e) => imputBlur(e.target.name, idx, index)} />
                                                </> :
                                                <>
                                                   <input type="text" className="form-control" name="debit" value={convertRupiah(data.debit)}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onFocus={() => imputFocus()} />
                                                </>}

                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "1rem", fontWeight: "bold", border: "2px solid red", padding: "5px" }}>
                                             {isEditing ?
                                                <>
                                                   <input type="number" className="form-control" name="credit" value={data.credit}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onBlur={(e) => imputBlur(e.target.name, idx, index)} />
                                                </> :
                                                <>
                                                   <input type="number" className="form-control" name="credit" value={convertRupiah(data.credit)}
                                                      onChange={(e) => changeValue(e, idx, index)}
                                                      onFocus={() => imputFocus()} />
                                                </>}
                                          </div>
                                          <div style={{ display: "inline-block", margin: "10px", marginRight: "7rem", fontWeight: "bold", border: "2px solid red", padding: "5px" }}>
                                             <input type="text" className="form-control" name="memo" value={data.memo}
                                                onChange={(e) => changeValue(e, idx, index)} /></div>
                                       </div>
                                    )}
                                 </div>
                              </>}

                        </div>

                     )}



                  </div>
               </div>
            </div>


         </>
      )
   }
}

const mapStateToProps = (state) => ({
   company: state.AuthReducer.company,
   importJournal: state.DataReducer.dataJournalEntryImport
})

const mapDispatchToProps = (dispatch) => ({
   importJournalEntry: (statementImport) => dispatch({ type: "IMPORTJOURNALENTRY", payload: statementImport }),
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})
export default (connect(mapStateToProps, mapDispatchToProps)(JournalImportValidation));

