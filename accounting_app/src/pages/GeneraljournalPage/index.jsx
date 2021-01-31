import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Select from 'react-select';
import TransactionNoFormat from '../../services/TransactionNoFormat'
import AccountServices from '../../services/AccountServices'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DropzoneDialog } from 'material-ui-dropzone'
import Box from '@material-ui/core/Box';
import JournalEntryServices from '../../services/JournalEntryServices';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'


function GeneralJournalPage(props) {

   const { duplicateFrom } = useParams();
   const { editJournal } = useParams();
   var initialFormat = {
      "companyId": "",
      "type_id": "",
      "startInvoice": "",
      "startNumber": 1001,
      "endInvoice": "",
      "defaultFormat": false
   }
   var initialValues = {
      account_id: "",
      description: "",
      debit: "",
      credit: "",
   }
   var [journalEntries, setJournalEntries] = useState([initialValues])
   var [totalDebit, setTotalDebit] = useState(0)
   var [totalCredit, setTotalCredit] = useState(0)

   const [transactionNoFormat, setTransactionNoFormat] = useState([])
   const [defaultTransactionNoFormat, setDefaultTransactionNoFormat] = useState("")
   const [listAccount, setListAccount] = useState([])
   const [openFormFormat, setOpenFormFormat] = useState(false)
   const [openSetting, setOpenSetting] = useState(false)
   const [render, setRender] = useState(false)
   const [formatNumber, setFormatNumber] = useState(initialFormat)
   const [transactionNo, stTransactionNo] = useState("")
   const [loading, setLoading] = useState(false)
   const [memo, setMemo] = useState("")
   const [isChangeAttachment, setIsChangeAttachment] = useState(false)

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


   var [transactionDate, setTransactionDate] = useState(dateNow)

   useEffect(() => {
      if (editJournal !== "" || editJournal !== undefined) {
         JournalEntryServices.getJournalEntryByTransactionId(editJournal)
            .then(res => {
               console.log(res.data);
               console.log(res.data.attachments.legth);
               var data = []
               res.data.transaction_account_lines.map(d => {
                  var response = {
                     account_id: d.account_id,
                     description: d.description,
                     debit: d.debit,
                     credit: d.credit,
                  }
                  data.push(response)
               })
               setMemo(res.data.memo)
               setJournalEntries(data)
               setTotalDebit(res.data.total_debit)
               setTotalCredit(res.data.total_credit)
               stTransactionNo(res.data.transaction_no_format.replace("#",""))
               setTransactionDate(res.data.transaction_date)

               if (res.data.attachments.length !== 0) {
                  var listAttachment = []
                  res.data.attachments.map(d => {
                     var atc = {
                        name: d,
                        type:"default"
                     }
                     console.log(d);
                     listAttachment.push(atc)

                  })

                  setAttachment(listAttachment)
               }
            })
      }

      if (duplicateFrom !== "" || duplicateFrom !== undefined) {
         JournalEntryServices.getJournalEntryByTransactionId(duplicateFrom)
            .then(res => {
               console.log(res.data);
               var data = []
               res.data.transaction_account_lines.map(d => {
                  var response = {
                     account_id: d.account_id,
                     description: d.description,
                     debit: d.debit,
                     credit: d.credit,
                  }
                  data.push(response)
               })
               setMemo(res.data.memo)
               setJournalEntries(data)
               setTotalDebit(res.data.total_debit)
               setTotalCredit(res.data.total_credit)
            })
      }
      setLoading(true)
      TransactionNoFormat.getListTransactionNoFormatByType(props.company.id, 1)
         .then(res => {
            console.log(res.data);
            setTransactionNoFormat(res.data)
            for (let i = 0; i < res.data.length; i++) {
               const element = res.data[i];
               if (element.defaultFormat === true) {
                  setDefaultTransactionNoFormat(element)
               }
            }
         })

      AccountServices.AccountList(props.company.id)
         .then(res => {
            console.log(res.data);
            setListAccount(res.data.filter(f=>f.parent===false).map(d => ({ value: d.id, label: `(${d.number_account}) - ${d.name}` })))
         }).catch(err => {
            alert(err)
         }).finally(setLoading(false))
   }, [render])

   const [open, setOpen] = useState(false)
   const [attactment, setAttachment] = useState([])

   const handleClose = () => {
      setOpen(false)

   }

   const handleSave = (files) => {
      setIsChangeAttachment(true)
      console.log(files);
      var add = attactment;
      for (let i = 0; i < files.length; i++) {
         const element = files[i];
         add.push(element)
      }
      console.log(add);
      setAttachment(add)
      setOpen(false)
   }


   const handleOpen = () => {
      setOpen(true)
   }

   const deleteAttachmentHandler = (idx) => {
      const values = [...attactment];
      values.splice(idx, 1)
      setAttachment(values)
   }

   const deleteAttachmentEditHandler = (name, index) => { 
      JournalEntryServices.deleteAttachment(editJournal, name)
         .then(() => { 
            console.log("deleted");
            const values = [...attactment];
            values.splice(index, 1)
            setAttachment(values)
         })

   }


   const handleOpenSettingTransactionFormat = () => {
      setOpenSetting(true)
   }

   const handleCloseSetting = () => {
      setOpenSetting(false)
   }

   const changeDefaultTransactionNoFormatHandler = (e) => {
      console.log(e.value);
      setDefaultTransactionNoFormat({ ...defaultTransactionNoFormat, id: e.value })
   }

   const handleOpenFormatTransactionForm = () => {
      setOpenFormFormat(true)
   }

   const handleCloseFormFormat = () => {
      setOpenFormFormat(false)
   }


   const addNumberFormatHandler = (e) => {
      e.preventDefault()

      var payload = {
         "companyId": props.company.id,
         "type_id": 1,
         "startInvoice": formatNumber.startInvoice,
         "startNumber": formatNumber.startNumber,
         "endInvoice": formatNumber.endInvoice,
         "defaultFormat": formatNumber.defaultFormat
      }
      console.log(payload);
      TransactionNoFormat.AddTransactionFormat(payload)
         .then(res => {
            alert("Add Transaction Number Successfull")
         }).catch(err => {
            alert("Add Transaction Number Failed")
         }).finally(() => {
            setRender(!render)
            setOpenFormFormat(false)
         })

   }

   const handleSetDefaultFormatNumber = (e) => {
      e.preventDefault()
      console.log(defaultTransactionNoFormat.id);
      TransactionNoFormat.addDefaultFormat(defaultTransactionNoFormat.id)
         .then(res => {
            swal({
               text: "Set Default Successfull",
               icon: "success",
            });
         }).catch(err => {
            swal({
               text: "Set Default Failed",
               icon: "failed",
            });
         }).finally(() => {
            setRender(!render)
            setOpenFormFormat(false)
         })
   }

   const handleDeleteFormatNumber = (e) => {
      e.preventDefault()
      console.log(defaultTransactionNoFormat.id);
      TransactionNoFormat.DeleteDefaultFormat(defaultTransactionNoFormat.id)
         .then(res => {
            swal({
               text: "Delete Successfull",
               icon: "success",
            });
         }).catch(err => {
            swal({
               text: "Delete Failed",
               icon: "failed",
            });
         }).finally(() => {
            setRender(!render)
            setOpenFormFormat(false)
         })
   }


   const history = useHistory();





   const CangeDateValue = (e) => {
      setTransactionDate(e.target.value)
      console.log(e.target.value);
   }




   const handleChangeInput = (index, event) => {
      var values = [...journalEntries]

      if (event.target === undefined) {
         values[index].account_id = event.value;
      } else {
         values[index][event.target.name] = event.target.value
      }
      console.log(event);
      setJournalEntries(values)

      var credit = 0;
      var debit = 0;
      for (let i = 0; i < journalEntries.length; i++) {
         if (journalEntries[i].credit) {
            credit += parseInt(journalEntries[i].credit)
         }
         if (journalEntries[i].debit) {
            debit += parseInt(journalEntries[i].debit)
         }

      }

      setTotalCredit(credit)
      setTotalDebit(debit)

   };

   const handleAddFiled = () => {
      setJournalEntries([...journalEntries, {
         account_id: "",
         description: "",
         debit: "",
         credit: "",
      }])
   }


   const handleRemoveField = (index) => {
      const values = [...journalEntries];
      if (values.length === 1) {
         return;
      }
      values.splice(index, 1)
      setJournalEntries(values)
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

   const handleCancel = () => {
      history.push("/account")
   }

   const EditJournalEntryHandler = () => {

      if (totalCredit !== totalDebit) {
         swal({
            text: "Transaction Failed, Credit and Debit Must Be Same.!",
            icon: "error",
         });
         return;
      }
      if (totalCredit === 0 && totalDebit === 0) {
         swal({
            text: "Transaction Failed, Credit and Debit Not Be null.!",
            icon: "error",
         });
         return;
      }

      for (let i = 0; i < journalEntries.length; i++) {
         if (journalEntries[i].debit === "" && journalEntries[i].credit === "") {
            const values = [...journalEntries];
            if (values.length === 1) {
               return
            }
            values.splice(i, 1)
            setJournalEntries(values)
         }
         if (journalEntries[i].account_id === "") {
            const values = [...journalEntries];
            if (values.length === 1) {
               return
            }
            values.splice(i, 1)
            setJournalEntries(values)
         }
      }

      for (let i = 0; i < journalEntries.length; i++) {
         var checkduplikat = journalEntries[i]
         // eslint-disable-next-line no-loop-func
         var checkAccount = journalEntries.filter(journal => journal.account_id === checkduplikat.account_id);
         if (checkAccount.length > 1) { 
            swal({
               text: "Transaction Failed, There are 2 same accounts and different transactions",
               icon: "error",
            });
            return;
         }
      

      }

     var trxNo = transactionNo.split("/",3)
  

      var journalEntryRequet = {
         "company_id": props.company.id,
         "transaction_lines": journalEntries,
         "transaction_date": transactionDate,
         "transaction_number_format": transactionNo,
         "memo": memo,
      }

      if (trxNo.length >= 2) {
         journalEntryRequet.transaction_no = trxNo[1]
      } else { 
         journalEntryRequet.transaction_no = transactionNo
      }

      console.log(journalEntryRequet);
      console.log(isChangeAttachment);
      console.log(attactment);
      
      JournalEntryServices.editJournalEntry(editJournal,journalEntryRequet)
         .then(res => {
            if (attactment.length !== 0 && isChangeAttachment===true) {
               const attachmentFile = new FormData();
               for (let index = 0; index < attactment.length; index++) {
                  const file = attactment[index];
                  if (file.type !== "default") { 
                     attachmentFile.append("attachment", file)
                  }
               }
               console.log(attactment);
               console.log(attachmentFile);
               JournalEntryServices.addAttachment(res.data.id, attachmentFile)
                  .then(response => {
                     swal({
                        text: "Transaction Successfull",
                        icon: "success",
                     });
                     history.push("/journal-entries/" + res.data.id)
                  }).catch(err => {
                     swal({
                        text: "rows cannot be blank",
                        icon: "error",
                     });
                  })
            } else {
               swal({
                  text: "Transaction Successfull",
                  icon: "success",
               });
               history.push("/journal-entries/" + res.data.id)
            }
         }).catch(err => {
            swal({
               text: "rows cannot be blank",
               icon: "error",
            });
         })
      
    }

   const JournalEntryHandler = () => {

      if (totalCredit !== totalDebit) {
         swal({
            text: "Transaction Failed, Credit and Debit Must Be Same.!",
            icon: "error",
         });
         return;
      }
      if (totalCredit === 0 && totalDebit === 0) {
         swal({
            text: "Transaction Failed, Credit and Debit Not Be null.!",
            icon: "error",
         });
         return;
      }

      for (let i = 0; i < journalEntries.length; i++) {


         if (journalEntries[i].debit === "" && journalEntries[i].credit === "") {
            const values = [...journalEntries];
            if (values.length === 1) {
               return
            }
            values.splice(i, 1)
            setJournalEntries(values)
         }
         if (journalEntries[i].account_id === "" || journalEntries[i].account_id === 0) {
            const values = [...journalEntries];
            if (values.length === 1) {
               return
            }
            values.splice(i, 1)
            setJournalEntries(values)
         }
      }
      for (let i = 0; i < journalEntries.length; i++) {
         var checkduplikat = journalEntries[i]
         // eslint-disable-next-line no-loop-func
         var checkAccount = journalEntries.filter(journal => journal.account_id === checkduplikat.account_id);
         if (checkAccount.length > 1) { 
            swal({
               text: "Transaction Failed, There are 2 same accounts and different transactions",
               icon: "error",
            });
            return;
         }
      

      }

      if (transactionNo !== "") {
         var journalEntryRequet = {
            "company_id": props.company.id,
            "transaction_lines": journalEntries,
            "transaction_date": transactionDate,
            "transaction_no": transactionNo,
            "transaction_number_format": null,
            "memo": memo,
         }
      } else if (defaultTransactionNoFormat.id === undefined) {
         journalEntryRequet = {
            "company_id": props.company.id,
            "transaction_lines": journalEntries,
            "transaction_date": transactionDate,
            "transaction_no": null,
            "transaction_number_format": null,
            "memo": memo,
         }
      } else {
         journalEntryRequet = {
            "company_id": props.company.id,
            "transaction_lines": journalEntries,
            "transaction_date": transactionDate,
            "transaction_no": null,
            "transaction_number_format": defaultTransactionNoFormat.id,
            "memo": memo,
         }
      }


      console.log(journalEntryRequet);
      JournalEntryServices.saveJournalEntry(journalEntryRequet)
         .then(res => {
            if (attactment.length !== 0) {
               const attachmentFile = new FormData();
               for (let index = 0; index < attactment.length; index++) {
                  const file = attactment[index];
                  attachmentFile.append("attachment", file)
               }
               console.log(attactment);
               console.log(attachmentFile);
               JournalEntryServices.addAttachment(res.data.id, attachmentFile)
                  .then(response => {
                     swal({
                        text: "Transaction Successfull",
                        icon: "success",
                     });
                     history.push("/journal-entries/" + res.data.id)
                  }).catch(err => {
                     swal({
                        text: "rows cannot be blank",
                        icon: "error",
                     });
                  })
            } else {
               swal({
                  text: "Transaction Successfull",
                  icon: "success",
               });
               history.push("/journal-entries/" + res.data.id)
            }
         }).catch(err => {
            swal({
               text: "rows cannot be blank",
               icon: "error",
            });
         })

   }


   const changeTransactionNo = (e) => {
      stTransactionNo(e.target.value)
   }

   const changeValue = (e) => {
      if (e.target.type === "checkbox") {
         var { name, checked } = e.target
         setFormatNumber({ ...formatNumber, [name]: checked })
      } else {
         var { value } = e.target
         setFormatNumber({ ...formatNumber, [e.target.name]: value })
      }
   }

   const [creditIsEditing, setCreditIsEditing] = useState(false)

   const toggleCreditCloseHandler = (index) => {
      var values = [...journalEntries]

      if (values[index].debit !== "" && values[index].credit !== "") {
         values[index].debit = "";
      }
      setJournalEntries(values)
      var credit = 0;
      var debit = 0;
      for (let i = 0; i < journalEntries.length; i++) {
         if (journalEntries[i].credit) {
            credit += parseInt(journalEntries[i].credit)
         }
         if (journalEntries[i].debit) {
            debit += parseInt(journalEntries[i].debit)
         }

      }

      if (values[journalEntries.length - 1].account_id !== "" && values[journalEntries.length - 1].credit !== "") {
         setJournalEntries([...journalEntries, {
            account_id: "",
            description: "",
            debit: "",
            credit: "",
         }])
      }

      setTotalCredit(credit)
      setTotalDebit(debit)
      setCreditIsEditing(false)
   }

   const toggleCreditOpenHandler = () => {
      setCreditIsEditing(true)
   }
   const [debitIsEditing, setDebitIsEditing] = useState(false)

   const toggleCloseDebitHandler = (index) => {
      var values = [...journalEntries]

      if (values[index].debit !== "" && values[index].credit !== "") {
         values[index].credit = "";
      }
      setJournalEntries(values)
      var credit = 0;
      var debit = 0;
      for (let i = 0; i < journalEntries.length; i++) {
         if (journalEntries[i].credit) {
            credit += parseInt(journalEntries[i].credit)
         }
         if (journalEntries[i].debit) {
            debit += parseInt(journalEntries[i].debit)
         }

      }

      if (values[journalEntries.length - 1].account_id !== "" && values[journalEntries.length - 1].debit !== "") {
         setJournalEntries([...journalEntries, {
            account_id: "",
            description: "",
            debit: "",
            credit: "",
         }])
      }

      setTotalCredit(credit)
      setTotalDebit(debit)
      setDebitIsEditing(false)
   }

   const toggleOpenDebitHandler = () => {
      setDebitIsEditing(true)
   }

   const changeMemoHandler = (e) => {
      const { value } = e.target
      setMemo(value)
   }


   return (
      <>
         {loading ? <>
            <div id="bg-loading" className="bg-loading" >
               <div id="loading" className="loading"></div>
            </div>
         </> :
            <>

               <div className="general-journal">
                  <div className="title">
                     <h5>Transaction</h5>
                     <h3>General Journal</h3>
                     <hr />
                  </div>
                  <div className="header d-flex justify-content-between">
                     <div className="row col-lg-8">
                        <div className="col-lg-3">
                           <label htmlFor="memo">Transaction No. <i className="fas fa-cogs text-primary" onClick={handleOpenSettingTransactionFormat}></i></label>
                           {transactionNoFormat.length > 0 ?
                              <>
                                 <input type="text" className="form-control mt-2" value={transactionNo} placeholder={`${defaultTransactionNoFormat.startInvoice}[auto]${defaultTransactionNoFormat.endInvoice}`} onChange={changeTransactionNo} />
                              </>
                              :
                              <>
                                 <input type="text" className="form-control mt-2" value={transactionNo} placeholder="[auto]"
                                    onChange={changeTransactionNo} />
                              </>}

                           <Dialog
                              open={openSetting}
                              onClose={handleCloseSetting}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                           >
                              <DialogTitle id="alert-dialog-title" className="text-center">Transaction Number </DialogTitle>
                              <DialogContent>
                                 <DialogContentText id="alert-dialog-description">
                                    <div className="co-lg-12" style={{ width: 500, height: 300 }}>

                                       {openFormFormat ?
                                          <>
                                             <div className="form-group row">
                                                <label htmlFor="format" className="col-lg-4">Format</label>
                                                <div className="col-lg-3">
                                                   <input type="text" className="form-control" placeholder="e.g. INV/"
                                                      name="startInvoice"
                                                      value={formatNumber.startInvoice} onChange={changeValue} />
                                                </div>
                                                <div className="col-lg-2">
                                                   <input type="text" className="form-control" placeholder="no" disabled />
                                                </div>
                                                <div className="col-lg-3">
                                                   <input type="text" className="form-control" placeholder="e.g. /IX"
                                                      name="endInvoice"
                                                      value={formatNumber.endInvoice} onChange={changeValue} />
                                                </div>
                                             </div>
                                             <div className="form-group row">
                                                <label htmlFor="format" className="col-lg-4">Start Number From</label>
                                                <div className="col-lg-8">
                                                   <input type="text" className="form-control"
                                                      name="startNumber" value={formatNumber.startNumber} onChange={changeValue} />
                                                   <small style={{ color: "black" }}>*Number will be automatically incremented</small>
                                                </div>
                                             </div>
                                             <div className="form-group row">
                                                <label htmlFor="format" className="col-lg-4">Set Default Format</label>
                                                <div className="col-lg-8">
                                                   <input type="checkbox" name="defaultFormat" value="true" onChange={changeValue} />
                                                </div>
                                             </div>
                                             <div className="row d-flex justify-content-center">
                                                <input type="button" className="btn btn-danger mr-3" value="Cancel" onClick={handleCloseFormFormat} />
                                                <input type="button" className="btn btn-primary " value="Save" onClick={addNumberFormatHandler} />
                                             </div>
                                          </> : <>
                                             <div className="form-group row">
                                                <label htmlFor="format" className="col-lg-4">Format</label>
                                                <div className="col-lg-6">
                                                   <Select
                                                      defaultValue={transactionNoFormat.filter(data => data.defaultFormat === true).map(d =>
                                                         ({ "value": d.id, "label": `${d.startInvoice}[auto]${d.endInvoice}` }))}
                                                      options={transactionNoFormat.map(d =>
                                                         ({ "value": d.id, "label": `${d.startInvoice}[auto]${d.endInvoice}` }))}
                                                      className="basic-multi-select"
                                                      classNamePrefix="select"
                                                      onChange={changeDefaultTransactionNoFormatHandler}
                                                   />

                                                </div>
                                             </div>



                                          </>}


                                    </div>
                                 </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                 {openFormFormat ? <></> : <>
                                    <input type="button" className="btn btn-danger mr-3" value="Delete"
                                       onClick={handleDeleteFormatNumber} />
                                    <input type="button" className="btn btn-success mr-3" value="Add New" onClick={handleOpenFormatTransactionForm} />
                                    <input type="button" className="btn btn-primary " value="Set As Default"
                                       onClick={handleSetDefaultFormatNumber} />
                                 </>}

                              </DialogActions>
                           </Dialog>


                        </div>
                        <div className="pay-later col-lg-3">
                           <label htmlFor="">Transaction Date</label>
                           <input type="date"
                              id="date"
                              label="Transaction Date"
                              onChange={CangeDateValue}
                              defaultValue={dateNow()}

                              className="form-control mt-2"
                              InputLabelProps={{
                                 shrink: true,
                              }} />
                        </div>
                     </div>
                  </div>
                  <hr />

                  <div className="account-expenses col-lg-12 mt-5">
                     <div className="title col-lg-12 row">
                        <div className="col-lg-3">
                           <h6 >Account</h6>
                        </div>
                        <div className="col-lg-4">
                           <h6>Description</h6>
                        </div>
                        <div className="col-lg-2">
                           <h6>Debit</h6>
                        </div>
                        <div className="col-lg-2">
                           <h6>Credit</h6>
                        </div>
                        <div className="col-lg-1">

                        </div>
                     </div>
                     <div>

                        {journalEntries.map((input, index) =>
                           <div key={index} className="col-lg-12 row">
                              <div className="col-lg-3">

                                 <Select
                                    value={listAccount.filter(ac => input.account_id === ac.value )}
                                    options={listAccount}
                                    onChange={(event) => handleChangeInput(index, event)}
                                 />
                              </div>

                              <div className="col-lg-4">
                                 <input type="text" name="description"
                                    value={input.description}
                                    placeHolder="Description"
                                    onChange={(event) => handleChangeInput(index, event)}
                                    className="form-control mt-2"
                                 />
                              </div>
                              <div className="col-lg-2">
                                 {debitIsEditing ?
                                    <>
                                       <input type="number" name="debit"
                                          value={input.debit}
                                          placeHolder="Debit"
                                          onChange={(event) => handleChangeInput(index, event)}
                                          className="form-control mt-2"
                                          onBlur={() => toggleCloseDebitHandler(index)}
                                       />
                                    </> :
                                    <>
                                       <input type="text" name="debit"
                                          value={convertRupiah(input.debit)}
                                          placeHolder="Debit"
                                          onChange={(event) => handleChangeInput(index, event)}
                                          className="form-control mt-2"
                                          onFocus={() => toggleOpenDebitHandler(index)}
                                       />
                                    </>}

                              </div>

                              <div className="col-lg-2">
                                 {creditIsEditing ? <>
                                    <input type="number" name="credit"
                                       value={input.credit}
                                       placeHolder="Credit"
                                       onChange={(event) => handleChangeInput(index, event)}
                                       onBlur={() => toggleCreditCloseHandler(index)}
                                       className="form-control mt-2" />
                                 </> : <>
                                       <input type="text" name="credit"
                                          value={convertRupiah(input.credit)}
                                          placeHolder="Credit"
                                          onChange={(event) => handleChangeInput(index, event)}
                                          onFocus={() => toggleCreditOpenHandler(index)}
                                          className="form-control mt-2" />
                                    </>}
                              </div>
                              <div className="col-lg-1">
                                 <div>
                                    <input type="button" className="btn btn-danger mt-2 mr-2" onClick={() => handleRemoveField(index)} value="-" />
                                    <input type="button" className="btn btn-primary mt-2" onClick={() => handleAddFiled()} value="+" />
                                 </div>

                              </div>
                           </div>
                        )}
                        <div className="row">

                           <div className="col-lg-4 mt-5">
                              <label htmlFor="">Memo</label>
                              <textarea onChange={changeMemoHandler} id="" rows="5" className="form-control" name={memo}></textarea>
                           </div>
                           <div className="col-lg-8 mt-5 row">
                              <div className="col-lg-6 mt-5">
                                 <h5>Total Debit : {props.company.company_currency.symbol} {convertRupiah(totalDebit)}</h5>
                              </div>
                              <div className="col-lg-6 mt-5">
                                 <h5>Total Credit : {props.company.company_currency.symbol} {convertRupiah(totalCredit)}</h5>
                              </div>
                           </div>
                           <div className="body row my-3 col-lg-12">
                              <div className="col-lg-3">
                                 <button type="button" onClick={handleOpen} className="btn btn-link">
                                    Attachment <i className="fa fa-paperclip" aria-hidden="true"></i>
                                 </button>

                                 <DropzoneDialog
                                    open={open}
                                    onSave={handleSave}
                                    acceptedFiles={['csv', 'xls', 'application/pdf', 'image/jpeg', 'image/png']}
                                    showPreviews={true}
                                    maxFileSize={5000000}
                                    onClose={handleClose}
                                 />
                                 {attactment.length === 0 ?
                                    <>
                                    </> :
                                    <>
                                       {attactment.map((a, index) =>
                                          <div className="col-lg-12 row mt-2 d-flex justify-content-between" style={{ border: "1px solid black", padding: "1rem", borderRadius: ".5rem" }}>
                                             <div>
                                                <div>{a.name}</div>
                                             </div>
                                             {a.type === "default" ? <>
                                             <div className="text-danger font-weight-bold" onClick={() => deleteAttachmentEditHandler(a.name)}>x</div>
                                             </> : <>
                                             <div className="text-danger font-weight-bold" onClick={() => deleteAttachmentHandler(index)}>x</div>
                                                </>}



                                          </div>
                                       )}
                                    </>}
                              </div>
                           </div>

                        </div>


                     </div>
                  </div>



                  <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                     {editJournal === undefined ? <>
                        <Box p={1} >
                           <input type="button" className="btn btn-primary" variant="contained" color="primary" onClick={JournalEntryHandler} value=" Create Journal +" />
                        </Box>
                     </> :

                        <>
                           <Box p={1} >
                              <input type="button" className="btn btn-primary" variant="contained" color="primary" onClick={EditJournalEntryHandler} value=" Edit Journal +" />
                           </Box>
                        </>}


                     <Box p={1} >
                        <input type="button" className="btn btn-danger" variant="contained" color="secondary" onClick={handleCancel} value=" Cancel" />


                     </Box>

                  </Box>


               </div>
            </>}
      </>
   )
}


const mapStateToProps = (state) => ({
   company: state.AuthReducer.company,
   userLogin: state.AuthReducer.userLogin,
   isLogin: state.AuthReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload: user, isLogin: true, company: company }),
})
export default (connect(mapStateToProps, mapDispatchToProps)(GeneralJournalPage));

