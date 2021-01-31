import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import CategoryAccountServices from '../../../services/CategoryAccountServices'
import ContactGroupServices from '../../../services/ContactGroupServices';
import PaymentTermsServices from '../../../services/PaymentTermServices';
import ContactServices from '../../../services/ContactServices';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';


function NewWarhouse(props) {

   var initialReceivables = {
      accountId: "",
      maximumValue: ""
   }

   var initialPayable = {
      accountId: "",
      maximumValue: ""
   }


   var initialBillingAdress = {
      billingAddress: "",
      number: "",
      neigbourhood: "",
      hamlet: "",
      postalCode: "",
      urbanVillage: "",
      subDistrict: "",
      district: "",
      province: ""
   }

   var initialShippingAdress = {
      shippingAddress: "",
      number: "",
      neigbourhood: "",
      hamlet: "",
      postalCode: "",
      urbanVillage: "",
      subDistrict: "",
      district: "",
      province: ""
   }

   var initialBank = {
      bankName: "",
      branchOffice: "",
      accountName: "",
      accountNumber: ""
   }

   var initialIdentity = {
      identityName: "",
      identityNumber: "",
   }

   var listAccount = [
      { label: "a", value: "a" }
   ]



   const history = useHistory()
   const { id } = useParams();
   const [loading, setLoading] = useState(false);
   const [ar, setAr] = useState([]);
   const [ap, setAp] = useState([]);
   const [terms, setTerms] = useState([]);
   const [render, setRender] = useState(false)
   const [groupId, setGroupId] = useState("")
   const [contactType, setContactType] = useState("")
   const [nickname, setNickName] = useState("")
   const [fullname, setFullname] = useState("")
   const [handphone, setHandphone] = useState("")
   const [email, setEmail] = useState("")
   const [information, setInformation] = useState("")
   const [companyName, setConmpanyName] = useState("")
   const [telephone, setTelephone] = useState("")
   const [npwp, setNpwp] = useState("")
   const [fax, setFax] = useState("")
   const [paymentTerm, setPaymentTerm] = useState("")
   const [identity, setIdentity] = useState(initialIdentity)
   const [mappingReceivable, setMappingReceivable] = useState(initialReceivables);
   const [mappingPayable, setMappingPayable] = useState(initialPayable);
   const [bank, setBank] = useState([initialBank])
   const [billingAddress, setBillingAddress] = useState([initialBillingAdress])
   const [shippingAddress, setShippingAddress] = useState([initialShippingAdress])
   const [bankOpen, setBankOpen] = useState(false)
   const [mappingOpen, setMappingOpen] = useState(false);
   const [payableOpen, setPayableOpen] = useState(false);
   const [receivableOpen, setReceivableOpen] = useState(false);
   const [receivableType, setReceivableType] = useState(false)
   const [payableType, setPayableType] = useState(false)
   const [listGroup, setListGroup] = useState([])


   const options = [
      { value: 'customer', label: 'Customer' },
      { value: 'supplier', label: 'Supplier' },
      { value: 'employee', label: 'Employee' },
      { value: 'others', label: 'Others' }
   ]

   const optionIdendity = [
      { value: 'KTP', label: 'KTP' },
      { value: 'Passport', label: 'Passport' },
      { value: 'SIM', label: 'SIM' },
   ]


   const [currentGroup, setCurrentGroup] = useState("")





   useEffect(() => {
      setLoading(true)
      if (id !== undefined) {
         ContactServices.getContactById(props.company.id, id)
            .then(res => {
               console.log(res.data);
               var initialReceivables = {
                  accountId: res.data.mappings[0].account.id,
                  accountName: res.data.mappings[0].account.account_name,
                  maximumValue: res.data.mappings[0].maximumValue
               }

               var initialPayable = {
                  accountId: res.data.mappings[1].account.id,
                  accountName: res.data.mappings[1].account.account_name,
                  maximumValue: res.data.mappings[1].maximumValue
               }

               var initialIdentity = {
                  identityName: res.data.identity.identityName,
                  identityNumber: res.data.identity.identityNumber,
               }
               if (res.data.mappings[0].maximumValue !== 0) {
                  setReceivableOpen(true)
                  setReceivableType(true)
               }
               if (res.data.mappings[1].maximumValue !== 0) {
                  setPayableOpen(true)
                  setPayableType(true)
               }
               if (res.data.contactGroup !== null) {
                  setGroupId(res.data.contactGroup.id)
               } else {
                  setGroupId(res.data.contactGroup)
               }


               setBank(res.data.bankAccount)
               setBillingAddress(res.data.billingAddresses)
               setShippingAddress(res.data.shippingAddresses)
               setCurrentGroup(res.data.contactGroup)
               setIdentity(initialIdentity)
               setContactType(res.data.contactType)
               setNickName(res.data.nickname)
               setFullname(res.data.fullname)
               setHandphone(res.data.handphone)
               setEmail(res.data.email)
               setInformation(res.data.information)
               setConmpanyName(res.data.companyName)
               setTelephone(res.data.telephone)
               setNpwp(res.data.npwp)
               setFax(res.data.fax)
               setPaymentTerm(res.data.paymentTerm)
               setMappingReceivable(initialReceivables)
               setMappingPayable(initialPayable)
            }).finally(() => {
               setLoading(false)
            })
      }
      setLoading(true)
      CategoryAccountServices.getCategoryByCode(props.company.id, "1")
         .then(res => {
            setAr(res.data.account)
         }).catch(err => {
            alert(err)
            console.log(err);
         })
         .finally(setLoading(false))
      setLoading(true)
      CategoryAccountServices.getCategoryByCode(props.company.id, "8")
         .then(res => {
            setAp(res.data.account)
         }).catch(err => {
            alert(err)
            console.log(err);
         }).finally(setLoading(false))
      setLoading(true)
      PaymentTermsServices.listTerms(props.company.id)
         .then(res => {
            setTerms(res.data)
         }).catch(err => {
            console.log(err);
            alert(err)
         }).finally(setLoading(false))
   }, [render])

   const backHandler = () => {
      history.push("/warehouse")
   }





   const changeValueIdentity = e => {
      var { value, name } = e.target;
      setIdentity({
         ...identity,
         [name]: value
      })


   }


   const handleChangeBank = (index, event) => {
      console.log(index, event.target.value)
      var values = [...bank]
      values[index][event.target.name] = event.target.value
      setBank(values)
   };

   const changeValuePayable = (e) => {
      var { name, value } = e.target;
      setMappingPayable({ [name]: value })
   }

   const handleChangeBillingAddress = (index, event) => {
      console.log(index, event.target.value)
      var values = [...billingAddress]
      values[index][event.target.name] = event.target.value
      setBillingAddress(values)
   };
   const handleChangeShippingAddress = (index, event) => {
      console.log(index, event.target.value)
      var values = [...shippingAddress]
      values[index][event.target.name] = event.target.value
      setShippingAddress(values)
   };



   const handleContactType = (e) => {
      var { name, value } = e.target;
      console.log(name, value);
      if (e === null) {
         return
      }
      if (value === "customer") {
         setReceivableType(true)
         setPayableType(false)
      } else if (value === "supplier") {
         setPayableType(true)
         setReceivableType(false)
      } else {
         return
      }
      ContactGroupServices.getContactGroupByType(props.company.id, value)
         .then(res => {
            setListGroup(res.data)
         })

      setContactType({ [name]: value })
   }

   const activateReceivable = () => {
      setReceivableOpen(!receivableOpen);
   }
   const activatePayable = () => {
      setPayableOpen(!payableOpen);
   }

   const handleNewBillingAddress = () => {
      setBillingAddress([...billingAddress, initialBillingAdress])
   }
   const handleNewShippingAddress = () => {
      setShippingAddress([...shippingAddress, initialShippingAdress])
   }
   const handleRemoveBillingAddress = (index) => {
      const values = [...billingAddress];
      if (values.length === 1) {
         return;
      }
      values.splice(index, 1)
      setBillingAddress(values)
   }
   const handleRemoveShippingAddress = (index) => {
      const values = [...shippingAddress];
      if (values.length === 1) {
         return;
      }
      values.splice(index, 1)
      setShippingAddress(values)
   }
   const handleNewBank = () => {
      setBank([...bank, initialBank])
   }
   const handleRemoveBank = (index) => {
      const values = [...bank];
      if (values.length === 1) {
         return;
      }
      values.splice(index, 1)
      setBank(values)
   }

   const handleBankInformation = () => {
      setBankOpen(!bankOpen)
   }
   const handleMapping = () => {
      setMappingOpen(!mappingOpen)
   }

   const submitHandler = async (e) => {
      e.preventDefault()
      if (mappingReceivable.accountId === "" || mappingReceivable.accountId === null
         || mappingPayable.accountId === "" || mappingPayable.accountId === null) {
         swal({
            title: "Account Mapping Can't Empty!",
            icon: "error"
         });
         return
      }
      if (contactType.name === "" || contactType === "") {
         swal({
            title: "Contact Type Can't Empty!",
            icon: "error"
         });
         return
      }



      setLoading(true)
      var pelod = {
         "typeContact": contactType.name,
         "nickname": nickname,
         "groupId": groupId,
         "fullname": fullname,
         "identity": identity,
         "email": email,
         "information": information,
         "companyName": companyName,
         "handphone": handphone,
         "telephone": telephone,
         "npwp": npwp,
         "fax": fax,
         "billingAddresses": billingAddress,
         "shippingAddresses": shippingAddress,
         "bankAccount": bank,
         "receivable": mappingReceivable.accountId,
         "receivableValue": mappingReceivable.maximumValue,
         "payable": mappingPayable.accountId,
         "payableValue": mappingPayable.maximumValue,
         "termId": paymentTerm.id
      }

      console.log(pelod);

      await ContactServices.addNewContact(props.company.id, pelod)
         .then(res => {
            swal({
               title: "Insert Data Sucessfull!",
               icon: "success"
            });
            setBillingAddress([initialBillingAdress])
            setShippingAddress([initialShippingAdress])
            history.push('/contact')
         }).catch(err => {
            console.log(err.message);
            swal({
               title: err,
               icon: "error"
            });
         }).finally(() => {
            setLoading(false)
            setRender(!render)
         }

         )

   }

   const changeValueTerm = (e) => {
      var { name, value } = e.target
      console.log(name, value);
      setPaymentTerm({ [name]: value })
   }

   const changeMappingReceivable = (e) => {
      var { value, name } = e.target
      setMappingReceivable({ ...mappingReceivable, [name]: value })
   }
   const changeMappingPayable = (e) => {
      var { value, name } = e.target
      setMappingPayable({ ...mappingPayable, [name]: value })
   }


   let listGroupSelect = listGroup.map(function (group) {
      return { value: group.id, label: group.groupName };
   })
   let listTerm = terms.map(function (term) {
      return { value: term.id, label: term.name + "-" + `(${term.term})` };
   })
   let listAccountReceivable = ar.map(function (account) {
      return { value: account.id, label: `${account.account_code} - (${account.account_name})` };
   })
   let listAccountPayable = ap.map(function (account) {
      return { value: account.id, label: `${account.account_code} - (${account.account_name})` };
   })

   const handleChangeListGroup = (e) => {
      console.log(e.target.value);
      setGroupId(e.target.value)
   }


   const editHandler = async (e) => {
      e.preventDefault();
      setLoading(true)
      var pelod = {
         "typeContact": contactType.name,
         "nickname": nickname,
         "groupId": groupId,
         "fullname": fullname,
         "identity": identity,
         "email": email,
         "information": information,
         "companyName": companyName,
         "handphone": handphone,
         "telephone": telephone,
         "npwp": npwp,
         "fax": fax,
         "billingAddresses": billingAddress,
         "shippingAddresses": shippingAddress,
         "bankAccount": bank,
         "receivable": mappingReceivable.accountId,
         "receivableValue": mappingReceivable.maximumValue,
         "payable": mappingPayable.accountId,
         "payableValue": mappingPayable.maximumValue,
         "termId": paymentTerm.id
      }

      await ContactServices.editContact(props.company.id, id, pelod)
         .then(res => {
            swal({
               title: "Insert Data Sucessfull!",
               icon: "success"
            });
            setBillingAddress([initialBillingAdress])
            setShippingAddress([initialShippingAdress])
            history.push('/contact')
         }).catch(err => {
            console.log(err.message);
            swal({
               title: err,
               icon: "error"
            });
         }).finally(() => {
            setLoading(false)
            setRender(!render)
         }

         )
   }

   const [priceSetting, setPriceSetting] = useState("aktif")
   const [productBudle, setProductBundle] = useState("")

   const priceSettingHandler = () => {
      setPriceSetting("aktif")
      setProductBundle("")
   }

   const productBudleHandler = () => {
      setPriceSetting("")
      setProductBundle("aktif")
   }

   var initialProduct = {
      product: "",
      qty: "",
      price: ""
   }

   const [productAdd, setProductAdd] = useState([initialProduct])
   const addNewProductHandler = (e) => {
      setProductAdd([...productAdd, initialProduct])
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


               <div className="container">
                  <div className="row">
                     <div className="header">
                        <h3>
                           <button className="btn btn-link"
                              style={{ fontSize: 30 }}
                              onClick={backHandler}>
                              <i className="fas fa-chevron-left"></i>
                           </button> Create New Warehouse</h3>
                     </div>
                     <div className="contact-body col-lg-12 mt-2 card px-5 ">
                        <div className="form">
                           <form autoComplete="off" >

                              <div className="form-group row">
                                 <div className="col-sm-2">Name :</div>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">
                                       <input type="text" className="form-control" id="name" name="name"
                                          value="" placeholder="Warehouse Name"
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2">
                                    Code :</div>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">

                                       <input type="text" className="form-control" id="code" name="code"
                                          value="" placeholder="Code"
                                       />


                                    </div>
                                 </div>
                              </div>

                              <div className="form-group row">
                                 <div className="col-sm-2">
                                    Address :</div>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">

                                    <input type="text" className="form-control" id="address" name="address"
                                          value="" placeholder="address"
                                       />


                                    </div>
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2">
                                    Information :</div>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">

                                    <input type="text" className="form-control" id="information" name="information"
                                          value="" placeholder="information"
                                       />


                                    </div>
                                 </div>
                              </div>

                           

                              <div className="form-group row d-flex justify-content-center my-5">
                                 <div className="col-lg-2 col-sm-10 ">
                                    <button type="submit" className="btn btn-link text-danger" onClick={backHandler}>Cancel</button>
                                 </div>
                                 <div className="col-lg-2 col-sm-10 ">
                                    {id !== undefined ?
                                       <>
                                          <button type="submit" className="btn btn-link text-primary" onClick={editHandler}>Update</button>
                                       </> : <>
                                          <button type="submit" className="btn btn-link text-primary" onClick={submitHandler}>Save</button>

                                       </>
                                    }
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>

                  </div>
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
export default (connect(mapStateToProps, mapDispatchToProps)(NewWarhouse));

