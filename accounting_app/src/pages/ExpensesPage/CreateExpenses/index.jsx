import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
// import { AttachmentComponent } from '../../components'
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      textField: {
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
         width: 200,
      },
      table: {
         minWidth: 650,
      },
      formControl: {
         margin: theme.spacing(1),
         minWidth: 300,
      },
      selectEmpty: {
         marginTop: theme.spacing(2),
      },
      root: {
         '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
         },
         container: {
            display: 'flex',
            flexWrap: 'wrap',
         },

      },
   }),
);

function CreateExpenses() {


   const history = useHistory();
   var [listAccount, setListAccount] = useState()

   var initialValues = {
      account: "",
      description: "",
      debit: "",
      credit: "",
   }

   var [journalEntries, setJournalEntries] = useState([initialValues])
   var [totalDebit, setTotalDebit] = useState(0)
   var [totalCredit, setTotalCredit] = useState(0)

   const classes = useStyles();
   const [render, setRender] = useState(false);

   const [selectedDate, setSelectedDate] = React.useState(
      new Date('2014-08-18T21:11:54'),
   )

   const handleDateChange = () => {
      setSelectedDate();
   };

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

   const handleChangeInput = (index, event) => {

      var values = [...journalEntries]
      values[index][event.target.name] = event.target.value
      if (isNaN(values[index].credit) || isNaN(values[index].debit)) {
         alert("your type is not of number")
         return;
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

      setTotalCredit(credit)
      setTotalDebit(debit)

   };

   const handleAddFiled = () => {
      console.log("called");
      setJournalEntries([...journalEntries, {
         account: "",
         description: "",
         debit: "",
         credit: "",
      }])
   }


   const handleRemoveField = (index) => {
      console.log(index);
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
      history.push("/expenses")
   }

   const handleSubmt = () => {
      history.push("/general-journey/new/transaction")
   }

   const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
   ]

   const [discount, setDiscount] = useState(false)

   const addDiscountHandler = () => { 
      setDiscount(!discount)
   }

   return (
      <>
         <div className="general-journal">
            <div className="title">
               <h3>Create Expenses</h3>
               <hr />
            </div>
            <div className="header d-flex justify-content-between">
               <div className="row col-lg-8">
                  <div className="form-group col-lg-3">
                     <label htmlFor="">Pay From</label>
                     <Select
                        defaultValue={options[2]}
                        name="colors"
                        options={options}

                     />
                  </div>
                  <div className="pay-later col-lg-3 mt-5">
                     <input type="checkbox" />
                     <label htmlFor="" className="ml-3">Pay Later</label>
                  </div>
               </div>
               <div className="ammount text-center mt-3">
                  <h3>Total : (IDR) Rp.1000.000.000</h3>
               </div>
            </div>
            <hr />
            <div className="body col-lg-12 col-sm-10 row">
               <div className="form-group col-lg-3">
                  <label htmlFor="">Received</label>
                  <Select
                     defaultValue={options[2]}
                     name="colors"
                     options={options}

                  />
               </div>
               <div className="form-group col-lg-3">
                  <label htmlFor="">Transaction Date</label>
                  <input type="text"
                     id="date"
                     label="Transaction Date"
                     type="date"
                     defaultValue={dateNow()}
                     className="form-control mt-2"
                     InputLabelProps={{
                        shrink: true,
                     }} />
               </div>
               <div className="form-group col-lg-3">
                  <label htmlFor="">Payment Method</label>
                  <Select
                     defaultValue={options[2]}
                     name="colors"
                     options={options}

                  />
               </div>
               <div className="form-group col-lg-3">
                  <label htmlFor="">Expenses Number</label>
                  <input type="text" className="form-control mt-2" />
               </div>
               <div className="form-group col-lg-3">
                  <label htmlFor="">Billing Address</label>
                  <textarea name="" id="" rows="5" className="form-control"></textarea>
               </div>
            </div>
            <hr />
            <div className="account-expenses col-lg-12 mt-5">
               <div className="title col-lg-12 row">
                  <div className="col-lg-3">
                     <div className="h5">Account</div>
                  </div>
                  <div className="col-lg-3">
                     <h5>Description</h5>
                  </div>
                  <div className="col-lg-2">
                     <h5>Tax</h5>
                  </div>
                  <div className="col-lg-2">
                     <h5>Total</h5>
                  </div>
                  <div className="col-lg-1">

                  </div>
               </div>
               <div>

                  {journalEntries.map((input, index) =>
                     <div key={index} className="col-lg-12 row">
                        <div className="col-lg-3">

                           <Select
                              defaultValue={options[2]}
                              name="colors"
                              options={options}

                           />
                        </div>

                        <div className="col-lg-3">
                           <input type="text" name="description"
                              value={input.description}
                              placeHolder="Description"
                              onChange={(event) => handleChangeInput(index, event)}
                              className="form-control mt-2"
                           />
                        </div>
                        <div className="col-lg-2">
                           <input type="text" name="debit"
                              value={input.debit}
                              placeHolder="Debit"
                              onChange={(event) => handleChangeInput(index, event)}
                              className="form-control mt-2"
                           />
                        </div>

                        <div className="col-lg-2">
                           <input type="text" name="credit"
                              value={input.credit}
                              placeHolder="Credit"
                              onChange={(event) => handleChangeInput(index, event)}
                              className="form-control mt-2" />
                        </div>
                        <div className="col-lg-2">
                           <div>
                              <button className="btn btn-link" onClick={() => handleRemoveField(index)} ><i class="fas fa-minus text-danger" style={{ fontSize: 12 }} ></i></button>
                              <button className="btn btn-link" onClick={() => handleAddFiled()}>
                                 <i class="fas fa-plus text-primary" style={{ fontSize: 12 }} ></i>
                              </button>
                           </div>

                        </div>
                     </div>
                  )}

               </div>
            </div>

            <div className="col-lg-12 d-flex justify-content-between mt-5">
               <div className="memo col-lg-6">
                  <div>Memo</div>
                  <div>
                     <textarea name="" id="" cols="50" rows="5"></textarea>
                  </div>
                  <div>
                     {/* <AttachmentComponent /> */}
                  </div>
               </div>
               <div className="calculation col-lg-6">
                  <div className="col-lg-12 row mt-3">
                     <div className="col-lg-5">
                        <h6>Sub Total</h6>
                     </div>
                     <div className="font-weight-bold col-lg-7">Rp.{convertRupiah(totalCredit)}</div>
                  </div>
                  <div className="col-lg-12 row mt-3">
                     <div className="font-weight-bold col-lg-5">
                        <h6>Total</h6>
                     </div>
                     <div className="font-weight-bold col-lg-7">Rp.{convertRupiah(totalCredit)}</div>
                  </div>
                  <div className="col-lg-12 row mt-3">
                     <div className="font-weight-bold col-lg-5">
                        <div className="row">
                           <div className="col-lg-6">
                              <h6 >Discount</h6>
                            </div>
                           <div className="col-lg-6">
                              <div className=" text-primary" onClick={addDiscountHandler}>
                                 {discount ?
                                    <>
                                 Add <i className="fas fa-caret-up ml-2 text-primary"></i>
                                    </> :
                                    <>
                                    Add <i className="fas fa-caret-down ml-2 text-primary"></i>
                                    </>}
                              </div>
                            </div>
                        </div>
                        {discount ? <>
                           <div className="col-lg-12 row mt-2">
                           <div className="col-lg-8">
                              <input type="number" className="form-control"/>
                           </div>
                           <div className="col-lg-4">
                              <div className=" text-primary text-center font-weight-bold"><h5>%</h5></div>
                           </div>
                       </div>
                        <div className="col-lg-12 row">
                           <div className="col-lg-8">
                           
                           </div>
                           <div className="col-lg-4">
                              <div className=" text-primary text-center">(Rp.)</div>
                           </div>
                       </div>
                        </> : <>
                        </>}
                     </div>
                     <div className="font-weight-bold col-lg-7">Rp.{convertRupiah(totalCredit)}</div>
                  </div>
                  <div className="col-lg-12 row mt-3">
                     <div className="font-weight-bold col-lg-5 mt-3">
                        <h3>Total</h3>
                     </div>
                     <div className="font-weight-bold col-lg-7 mt-3">
                        <h3>
                           Rp.{convertRupiah(totalCredit)}
                        </h3>
                     </div>
                  </div>

               </div>
            </div>




            <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
               <Box p={1} >
                  <Button variant="contained" color="primary" onClick={handleSubmt} >
                    Create New Expenses
                 </Button>

               </Box>
               <Box p={1} >
                  <Button variant="contained" color="secondary" onClick={handleCancel}>
                     Cancel
                </Button>
               </Box>

            </Box>


         </div>

      </>
   )
}

export default CreateExpenses
