import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { useHistory} from 'react-router-dom'
import AccountServices from '../../services/AccountServices'
import BankTransferServices from '../../services/BankTransferServices'
import TransactionNoFormat from '../../services/TransactionNoFormat'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DropzoneDialog } from 'material-ui-dropzone'


function BankTransfer(props) {

   const history = useHistory()

   
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

   var initialFormat = {
      "companyId": "",
      "type_id": "",
      "startInvoice": "",
      "startNumber": "",
      "endInvoice": "",
      "defaultFormat": false
   }

   const [formatNumber, setFormatNumber] = useState(initialFormat)
   const [openSetting, setOpenSetting] = useState(false)
   const [refundFrom, setREfundFrom] = useState("")
   const [depositToName, setDepositToName] = useState("")
   const [transactionDate, setTransactionDate] = useState(dateNow)
   const [transactionNo, stTransactionNo] = useState("")
   const [memo, setMemo] = useState("")
   const [transferAmmount, setTransferAmmount] = useState("")
   const [transactionNoFormat, setTransactionNoFormat] = useState([])
   const [defaultTransactionNoFormat, setDefaultTransactionNoFormat] = useState("")
   const [listAccount, setListAccount] = useState([])
   const [openFormFormat, setOpenFormFormat] = useState(false)
   const [render, setRender] = useState(false)

   useEffect(() => {
      AccountServices.getAccountByCategoryId(props.company.id, 3)
         .then(res => {
            setREfundFrom(res.data[0].name)
            setDepositToName(res.data[0].name)
            setListAccount(res.data.filter(f=> f.is_parennt===false).map(d => ({
               value: d.name,
               label: `(${d.number_account}) - ${d.name}`
            })))
         })

      TransactionNoFormat.getListTransactionNoFormatByType(props.company.id, 3)
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
   }, [render])

   const [open, setOpen] = useState(false)
   const [attactment, setAttachment] = useState([])

   const handleClose = () => {
      setOpen(false)

   }

   const handleSave = (files) => {
      console.log(files);
      var add = attactment;
      for (let i = 0; i < files.length; i++) {
         const element = files[i];
         add.push(element)
      }
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

   const handleSaveBankTransfer = (e) => {
      e.preventDefault()
      if (transactionNo !== "") {
         var bankTransferRquest = {
            "company_id": props.company.id,
            "refund_from_name": refundFrom,
            "deposit_to_name": depositToName,
            "transaction_date": transactionDate,
            "transaction_no": transactionNo,
            "transaction_number_format": null,
            "memo": memo,
            "transfer_amount": transferAmmount
         }
      } else if(defaultTransactionNoFormat.id===undefined) {
         bankTransferRquest = {
            "company_id": props.company.id,
            "refund_from_name": refundFrom,
            "deposit_to_name": depositToName,
            "transaction_date": transactionDate,
            "transaction_no": null,
            "transaction_number_format": null,
            "memo": memo,
            "transfer_amount": transferAmmount
         }
      } else {
         bankTransferRquest = {
            "company_id": props.company.id,
            "refund_from_name": refundFrom,
            "deposit_to_name": depositToName,
            "transaction_date": transactionDate,
            "transaction_no": null,
            "transaction_number_format": defaultTransactionNoFormat.id,
            "memo": memo,
            "transfer_amount": transferAmmount
         }
      }
      console.log(bankTransferRquest);
      const imageData = new FormData();
      imageData.append("file", attactment)
      console.log(imageData);

      if (bankTransferRquest.refund_from_name === bankTransferRquest.deposit_to_name) { 
         alert("Transaction Failed.! Account Refund and Deposit Not Be Same!")
         return
      }

      if (bankTransferRquest.transfer_amount === 0 || bankTransferRquest.transfer_amount === "") { 
         alert("Transaction Failed.! Transfer Account Not Be Null")
         return
      }

      console.log(bankTransferRquest);
      BankTransferServices.addBankTransfer(bankTransferRquest)
         .then(res => {
            console.log(res.data);
            alert("Transaction Successfull")
            history.push("/banktransfer/detail/"+res.data.id)
         }).catch(err => {
            console.log(err);
            alert("failed")
         })
      // BankTransferServices.uploadAttachment(imageData)
      //    .then(res => { 
      //       console.log(res.data);
      //       alert("success")
      //    }).catch(err => { 
      //       console.log(err);
      //       alert("failed")
      //    })
   }

   const changeTransferFromHandler = (e) => {
      setREfundFrom(e.value)
   }
   const changeDepositToHandler = (e) => {
      setDepositToName(e.value)
   }

   const transferAmmountHandler = (e) => {
      setTransferAmmount(e.target.value)
   }

   const changeTransactionDateHandler = (e) => {
      console.log(e.target.value);
      setTransactionDate(e.target.value)
   }

   const changeTransactionNo = (e) => {
      stTransactionNo(e.target.value)
   }

   const changeMemoHandler = (e) => {
      setMemo(e.target.value)
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

   const changeValue = (e) => {
      if (e.target.type === "checkbox") {
         var { name, checked } = e.target
         setFormatNumber({ ...formatNumber, [name]: checked })
      } else {
         var { name, value } = e.target
         setFormatNumber({ ...formatNumber, [name]: value })
      }
   }

   const [debitIsEditing, setDebitIsEditing] = useState(false)

   const toggleDebitHandler = () => {
      setDebitIsEditing(!debitIsEditing)
   }


   const addNumberFormatHandler = (e) => {
      e.preventDefault()
      var payload = {
         "companyId": props.company.id,
         "type_id": 3,
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
            alert("Set Default Successfull")
         }).catch(err => {
            alert("Set Default Failed")
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
            alert("Delete Format Number Successfull")
         }).catch(err => {
            alert("Delete Format Number Failed")
         }).finally(() => {
            setRender(!render)
            setOpenFormFormat(false)
         })
   }

   return (
      <>
         <div className="container-fluid">
            <div className="hreader">
               <h5>Transaction</h5>
               <h3>Bank Transfer</h3>
            </div>
            <hr />
            <div className="body row offset-2">
               <div className="col-lg-3">
                  <label htmlFor="transferFrom">Transfer From</label>
                  {listAccount.length !== 0 ?
                     <>
                        <Select
                           defaultValue={listAccount.filter(d => (d.value === "Cash"))}
                           options={listAccount}
                           onChange={changeTransferFromHandler}
                        />
                     </> : <></>}
               </div>
               <div className="col-lg-3">
                  <label htmlFor="transferFrom">* Deposit To</label>
                  {listAccount.length !== 0 ?
                     <>
                        <Select
                           defaultValue={listAccount.filter(d => (d.value === "Cash"))}
                           options={listAccount}
                           onChange={changeDepositToHandler}
                        />
                     </> : <></>}
               </div>
               <div className="col-lg-3">
               <label htmlFor="transferFrom">Ammount</label>
               {debitIsEditing ?
                              <>
                                 <input type="number" 
                                    value={transferAmmount}
                                    placeHolder="insert ammount"
                                    onChange={transferAmmountHandler}
                                    className="form-control mt-2"
                                    onBlur={toggleDebitHandler}
                                 />
                              </> :
                              <>
                                     <input type="text" 
                                    value={convertRupiah(transferAmmount)}
                                    placeHolder="insert ammount"
                                    onChange={transferAmmountHandler}
                                    className="form-control mt-2"
                                    onFocus={toggleDebitHandler}
                                 /> 
                              </>}
            

               </div>

            </div>
            <div className="body row mt-5 offset-2">
               <div className="col-lg-3">
                  <label htmlFor="memo">Memo</label>
                  <textarea onChange={changeMemoHandler} id="" cols="30" rows="10" style={{ width: "100%" }} value={memo}></textarea>
               </div>
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
                                          <input type="text" className="form-control" placeholder="1001"
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
               <div className="col-lg-3">
                  <label htmlFor="memo">Transaction Date</label>
                  <input type="date"
                     id="date"
                     label="Transaction Date"
                     defaultValue={dateNow()}
                     className="form-control mt-2"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     onChange={changeTransactionDateHandler}
                  />
               </div>
               <div className="body row mt-5 col-lg-12">
                  <div className="col-lg-3">
                     <button type="button" onClick={handleOpen} className="btn btn-link">
                        Attachment <i className="fa fa-paperclip" aria-hidden="true"></i>
                     </button>

                     <DropzoneDialog
                        open={open}
                        onSave={handleSave}
                        acceptedFiles={['csv', 'xls', 'pdf', 'image/jpeg', 'image/png']}
                        showPreviews={true}
                        maxFileSize={5000000}
                        onClose={handleClose}
                     />
                     {attactment.length === 0 ?
                        <>
                        </> :
                        <>
                           {attactment.map((a, index) =>
                              <div className="col-lg-12 row mt-1 d-flex justify-content-between" style={{ border: "1px solid black", padding: "1rem", borderRadius: ".5rem" }}>
                                 <div>
                                    <div>{a.name}</div>
                                    <div>{a.type}</div>
                                 </div>
                                 <div className="text-danger font-weight-bold" onClick={() => deleteAttachmentHandler(index)}>x</div>



                              </div>
                           )}
                        </>}
                  </div>

               </div>

            </div>
            <hr className="mt-5" />
            <div className="col-lg-12">
               <div className="col-lg-3"></div>
               <div className="col-lg-3"></div>
               <div className="col-lg-3 row">
                  <div className="col-lg-6 ">
                     <input type="button" value="Cancel" className="btn btn-danger btn-block" />
                  </div>
                  <div className="col-lg-6">
                     <input type="button" value="Save" className="btn btn-primary btn-block" onClick={handleSaveBankTransfer} />
                  </div>
               </div>
            </div>
         </div>
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
export default (connect(mapStateToProps, mapDispatchToProps)(BankTransfer));
