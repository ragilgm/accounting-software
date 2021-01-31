import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import CategoryAccountServices from '../../../services/CategoryAccountServices'
import ContactGroupServices from '../../../services/ContactGroupServices';
import PaymentTermsServices from '../../../services/PaymentTermServices';
import ContactServices from '../../../services/ContactServices';
import swal from 'sweetalert';


function AddContact(props) {

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
                  accountName:res.data.mappings[0].account.account_name,
                  maximumValue: res.data.mappings[0].maximumValue
               }
            
               var initialPayable = {
                  accountId: res.data.mappings[1].account.id,
                  accountName:res.data.mappings[1].account.account_name,
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
      history.push("/contact")
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
      console.log(name,value);
      setPaymentTerm({ [name]:value})
   }

   const changeMappingReceivable = (e) => {
      var { value, name } = e.target
      setMappingReceivable({...mappingReceivable ,[name]:value})
   }
   const changeMappingPayable = (e) => {
      var { value, name } = e.target
      setMappingPayable({...mappingPayable, [name]:value })
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


   const editHandler  = async (e) => {
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

   const changeNickNameHandler = (e) => {
      setNickName(e.target.value)
   }

   const changeFullnameHandler = (e) => {
      setFullname(e.target.value)
   }

   const changeEmailHandler = (e) => {
      setEmail(e.target.value)
   }

   const changeInformationHandler = (e) => {
      setInformation(e.target.value)
   }

   const changeCompanyNameHandler = (e) => {
      setConmpanyName(e.target.value)
   }

   const changeHandphoneHandler = (e) => {
      setHandphone(e.target.value)
   }

   const changeTelephoneHandler = (e) => {
      setTelephone(e.target.value)
   }

   const changeFaxHadler = (e) => {
      setFax(e.target.value)
   }

   const changeNpwpHandler = (e) => {
      setNpwp(e.target.value)
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
                           </button> Create Contact</h3>
                     </div>
                     <div className="contact-body col-lg-12 mt-2 card px-5">
                        <div className="h5"><i className="far fa-user mr-3 my-5"></i>Contact Information</div>
                        <div className="form">
                           <form autoComplete="off" >
                              <div className="form-group row">
                                 <label htmlFor="nickname" className="col-sm-2 col-form-label">Nick Name :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" className="form-control" id="nickname" name="nickname" value={nickname} placeholder="Nick Name" onChange={changeNickNameHandler} />
                                 </div>
                              </div>
         
                              <div className="form-group row">
                                 <div className="col-sm-2">Contact Type :</div>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">
                                       <select className="form-control" name="name" onChange={handleContactType}>
                                          {id !== undefined && contactType!==null ?
                                             <option value={contactType.id} selected>{contactType.name}</option>
                                             :
                                             <option value="" selected>Select Type..</option>
                                          }
                                          {options.map((contact,idx) =>
                                             <option key={idx} value={contact.value}>{contact.label}</option>
                                          )}
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2">Contact Group :</div>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">

                                       <select className="form-control" onChange={handleChangeListGroup}>
                                          {id !== undefined && currentGroup !==null?
                                             <option value={currentGroup.id} selected>{currentGroup.groupName}</option>
                                             :
                                             <option value="" selected>Select Group..</option>
                                          }
                                          {listGroupSelect.map(group =>
                                             <option value={group.value}>{group.label}</option>
                                          )}
                                       </select>


                                    </div>
                                 </div>
                              </div>
                              <div className="h5"><i className="fas fa-briefcase mr-3 my-5"></i>General Information</div>
                              <div className="form-group row">
                                 <label htmlFor="fullname" className="col-sm-2 col-form-label">Full Name :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" className="form-control" id="fullname" name="fullname"
                                       value={fullname} placeholder="Full Name"
                                       onChange={changeFullnameHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="type" className="col-sm-2 col-form-label">Identity :</label>
                                 <div className="col-lg-3 col-sm-10">
                                    <div className="input-group mb-3">
                                       <select className="form-control" name="identityName" onChange={changeValueIdentity}>
                                          {id !== undefined ?
                                             <option value={identity.id} selected>{identity.identityName}</option>
                                             :
                                             <option value="" selected>Select Type..</option>
                                          }
                                          {optionIdendity.map((identity, idx) =>
                                             <option key={idx} value={identity.value}>{identity.label}</option>
                                          )}
                                       </select>

                                    </div>
                                 </div>
                                 <div className="col-lg-3 col-sm-10">
                                    <input type="number" className="form-control" name="identityNumber" placeholder="No Identity" value={identity.identityNumber} onChange={changeValueIdentity} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="email" className="col-sm-2 col-form-label">Email :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="email" className="form-control" id="email" name="email"
                                       value={email} placeholder="Full Name" onChange={changeEmailHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="Information" className="col-sm-2 col-form-label">Information :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" className="form-control" id="Information" name="information" placeholder="Information"
                                       value={information} onChange={changeInformationHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="companyName" className="col-sm-2 col-form-label">Company Name :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" className="form-control" id="companyName" name="companyName" placeholder="Company Name " value={companyName} onChange={changeCompanyNameHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="handphone" className="col-sm-2 col-form-label">Handphone :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="number" className="form-control" id="handphone"
                                       value={handphone}
                                       name="handphone" placeholder="Handphone" onChange={changeHandphoneHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="telphone" className="col-sm-2 col-form-label">Telephone :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="number" className="form-control" id="telphone"
                                       name="telephone" value={telephone} placeholder="Telephone " onChange={changeTelephoneHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="fax" className="col-sm-2 col-form-label">Fax :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="number" className="form-control" id="fax" name="fax"
                                       value={fax} placeholder="Fax " onChange={changeFaxHadler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="npwp" className="col-sm-2 col-form-label">NPWP :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="number" className="form-control" id="npwp" name="npwp" placeholder="npwp"
                                       value={npwp} onChange={changeNpwpHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="billingAddress" className="col-sm-2 col-form-label">Billing Address :</label>
                              </div>
                              {billingAddress.map((addr, idx) =>
                                 < div key={idx}>
                                    <div className="form-group row">
                                       <div className="col-lg-6 col-sm-10 offset-2">
                                          <input type="text" className="form-control" name="billingAddress" value={addr.billingAddress} placeholder="Billing Address " onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-lg-2 col-sm-10 offset-2">
                                          <input type="number" className="form-control" name="number" value={addr.number} placeholder="Number " onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-1 col-sm-10">
                                          <input type="number" className="form-control" id="rt" name="neigbourhood"
                                             value={addr.neigbourhood} placeholder="Neigbourhood" onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-1 col-sm-10">
                                          <input type="number" className="form-control" id="hamlet" name="hamlet" value={addr.hamlet} placeholder="Hamlet " onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-2 col-sm-10">
                                          <input type="number" className="form-control" name="postalCode" placeholder="Postal Code " value={addr.postalCode} onChange={(event) =>
                                             handleChangeBillingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-lg-3 col-sm-10 offset-2">
                                          <input type="text" className="form-control" name="urbanVillage" placeholder="
                                                      Urban Villange " value={addr.urbanVillage}
                                             onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-3 col-sm-10">
                                          <input type="text" className="form-control" name="subDistrict" value={addr.subDistrict} placeholder="Sub District "
                                             onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-lg-3 col-sm-10 offset-2">
                                          <input type="text" className="form-control" id="city" name="district" value={addr.district} placeholder="District "
                                             onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-3 col-sm-10">
                                          <input type="text" className="form-control" id="province" name="province" placeholder="Province " value={addr.province}
                                             onChange={(event) => handleChangeBillingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    {billingAddress.length > 1 ?
                                       <div className="offset-3 mr-5">
                                          <input type="button" value="add address +" className="btn 
                                                btn-link my-2"  onClick={handleNewBillingAddress}
                                          />

                                          <input type="button" value="remove address -" className="btn btn-link my-2 text-danger ml-2" onClick={() => handleRemoveBillingAddress(idx)} />
                                       </div>
                                       :
                                       <div className="offset-4">
                                          <input type="button" value="add address +" className="btn btn-link my-2" onClick={handleNewBillingAddress} />
                                       </div>
                                    }
                                 </div>

                              )}
                              <div className="form-group row">
                                 <label htmlFor="shippingAddress" className="col-sm-2 col-form-label">Shipping Address :</label>
                              </div>
                              {shippingAddress.map((shipping, idx) =>
                                 < div key={shipping.id}>
                                    <div className="form-group row">
                                       <div className="col-lg-6 col-sm-10 offset-2">
                                          <input type="text" className="form-control" id="shippingAddress" name="shippingAddress" value={shipping.shippingAddress} placeholder="Shipping Address " onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-lg-2 col-sm-10 offset-2">
                                          <input type="number" className="form-control" id="number" name="number" value={shipping.number} placeholder="Number " onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-1 col-sm-10">
                                          <input type="number" className="form-control" name="neigbourhood"
                                             value={shipping.neigbourhood} placeholder="Neigbourhood" onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-1 col-sm-10">
                                          <input type="number" className="form-control" name="hamlet" value={shipping.hamlet} placeholder="Hamlet " onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-2 col-sm-10">
                                          <input type="number" className="form-control" id="zip-code" name="postalCode" placeholder="Postal Code " value={shipping.postalCode} onChange={(event) =>
                                             handleChangeShippingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-lg-3 col-sm-10 offset-2">
                                          <input type="text" className="form-control" name="urbanVillage" placeholder="
                                                      Urban Village " value={shipping.urbanVillage}
                                             onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-3 col-sm-10">
                                          <input type="text" className="form-control" id="Sub District" name="subDistrict" value={shipping.subDistrict} placeholder="Sub District "
                                             onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-lg-3 col-sm-10 offset-2">
                                          <input type="text" className="form-control" id="city" name="district" value={shipping.district} placeholder="district "
                                             onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                       <div className="col-lg-3 col-sm-10">
                                          <input type="text" className="form-control" id="province" name="province" placeholder="Province " value={shipping.province}
                                             onChange={(event) => handleChangeShippingAddress(idx, event)} />
                                       </div>
                                    </div>
                                    {shippingAddress.length > 1 ?
                                       <div className="offset-3 mr-5">
                                          <input type="button" value="add address +" className="btn 
                                                btn-link my-2"  onClick={handleNewShippingAddress}
                                          />

                                          <input type="button" value="remove address -" className="btn btn-link my-2 text-danger ml-2" onClick={() => handleRemoveShippingAddress(idx)} />
                                       </div>
                                       :
                                       <div className="offset-4">
                                          <input type="button" value="add address +" className="btn btn-link my-2" onClick={handleNewShippingAddress} />
                                       </div>
                                    }
                                 </div>

                              )}

                              <div className="d-flex justify-content-between col-lg-8 col-sm-10">
                                 <div className="h5"><i className="fas fa-university mr-3 my-5"></i>Bank Information</div>
                                 {bankOpen ?
                                    <>
                                       <div className="mr-3 my-5" onClick={handleBankInformation}><i className="fas fa-angle-up" style={{ fontSize: 20, color: "blue" }}></i></div>
                                    </>
                                    :
                                    <>
                                       <div className="mr-3 my-5" onClick={handleBankInformation}><i className="fas fa-angle-down animate__animated animate__bounce animate__infinite" style={{ fontSize: 20, color: "blue" }}></i></div>
                                    </>
                                 }

                              </div>
                              {bankOpen ?
                                 <>
                                    {bank.map((b, idx) =>
                                       <div>
                                          <div className="form-group row">
                                             <label htmlFor="bankName" className="col-sm-2 col-form-label">Bank Name:</label>
                                             <div className="col-lg-6 col-sm-10">
                                                <input type="text" className="form-control" id="bankName" name="bankName" value={b.bankName} placeholder="Bank Name" onChange={(event) => handleChangeBank(idx, event)} />
                                             </div>
                                          </div>
                                          <div className="form-group row">
                                             <label htmlFor="brancOffice" className="col-sm-2 col-form-label">Branch Office:</label>
                                             <div className="col-lg-6 col-sm-10">
                                                <input type="text" className="form-control" id="brancOffice" name="branchOffice"
                                                   value={b.branchOffice}
                                                   placeholder="Branch Office"
                                                   onChange={(event) => handleChangeBank(idx, event)} />
                                             </div>
                                          </div>
                                          <div className="form-group row">
                                             <label htmlFor="accountName" className="col-sm-2 col-form-label">Account Name:</label>
                                             <div className="col-lg-6 col-sm-10">
                                                <input type="text" className="form-control" id="accountName" name="accountName"
                                                   value={b.accountName}
                                                   placeholder="Account Name"
                                                   onChange={(event) => handleChangeBank(idx, event)} />
                                             </div>
                                          </div>
                                          <div className="form-group row">
                                             <label htmlFor="accountNumber" className="col-sm-2 col-form-label">Account Number:</label>
                                             <div className="col-lg-6 col-sm-10">
                                                <input type="number" className="form-control" id="accountNumber" name="accountNumber"
                                                   value={b.accountNumber}
                                                   placeholder="Account Number"
                                                   onChange={(event) => handleChangeBank(idx, event)} />
                                             </div>
                                          </div>
                                          {bank.length > 1 ?
                                             <div className="offset-3 mr-5">
                                                <input type="button" value="add Bank +" className="btn btn-link my-2" onClick={handleNewBank} />

                                                <input type="button" value="remove Bank -" className="btn btn-link my-2 text-danger ml-2" onClick={() => handleRemoveBank(idx)} />
                                             </div>
                                             :
                                             <div className="offset-4">
                                                <input type="button" value="add Bank +" className="btn btn-link my-2" onClick={handleNewBank} />
                                             </div>
                                          }
                                       </div>
                                    )}
                                 </>
                                 :
                                 <></>
                              }

                              <div className="d-flex justify-content-between col-lg-8 col-sm-10">
                                 <div className="h5"><i className="fas fa-map-signs mr-3 my-5"></i>Account Mapping</div>
                                 {mappingOpen ?
                                    <>
                                       <div className="mr-3 my-5" onClick={handleMapping}><i className="fas fa-angle-up" style={{ fontSize: 20, color: "blue" }}></i></div>
                                    </>
                                    :
                                    <>
                                       <div className="mr-3 my-5" onClick={handleMapping}><i className="fas fa-angle-down animate__animated animate__bounce animate__infinite" style={{ fontSize: 20, color: "blue" }}></i></div>
                                    </>
                                 }
                              </div>
                              {mappingOpen ?
                                 <>
                                    <div className="form-group row">
                                       <label htmlFor="accountReceivable" className="col-sm-2 col-form-label">
                                          accounts receivable :</label>
                                       <div className="col-lg-6 col-sm-10">
                                          <div className="input-group mb-3">
                                             <select className="form-control" name="accountId" onChange={changeMappingReceivable}>
                                                {id !== undefined ?
                                                   <option value={mappingReceivable.id} selected>{mappingReceivable.accountName}</option>
                                                   :
                                                   <option value="" selected>Select Type..</option>
                                                }
                                                {listAccountReceivable.map(account =>
                                                   <option value={account.value}>{account.label}</option>
                                                )}
                                             </select>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <label htmlFor="identity" className="col-sm-2 col-form-label">
                                          accounts payable :</label>
                                       <div className="col-lg-6 col-sm-10">
                                          <div className="input-group mb-3">
                                             <select className="form-control" name="accountId" onChange={changeMappingPayable}>
                                                {id !== undefined ?
                                                   <option value={mappingPayable.id} selected>{mappingPayable.accountName}</option>
                                                   :
                                                   <option value="" selected>Select Type..</option>
                                                }
                                                {listAccountPayable.map(account =>
                                                   <option value={account.value}>{account.label}</option>
                                                )}
                                             </select>

                                          </div>
                                       </div>
                                    </div>
                                    {receivableType ?
                                       <>
                                          <div className="form-group row">
                                             <label htmlFor="identity" className="col-sm-2 col-form-label">

                                                Maximum Accounts Receivable :</label>
                                             <div className="ml-5">
                                                <input className="form-check-input" type="checkbox" id="receivable" name="receivable" onClick={activateReceivable} />
                                                <label className="form-check-label" htmlFor="receivable">
                                                   activate maximum receivable
                               </label>
                                             </div>
                                             {receivableOpen ?
                                                <>
                                                   <div className="col-lg-3 col-sm-10">
                                                      <input type="number" className="form-control" name="maximumValue" value={mappingReceivable.maximumValue} placeholder="Rp." onChange={changeMappingReceivable} />
                                                   </div>
                                                </> :
                                                <>
                                                </>}
                                          </div>
                                       </> :
                                       <>
                                       </>}
                                    {payableType ?
                                       <>
                                          <div className="form-group row">
                                             <label htmlFor="payable" className="col-sm-2 col-form-label">


                                                maximum accounts payable :</label>
                                             <div className="ml-5">
                                                <input className="form-check-input" type="checkbox" id="payable" name="maximumValue" value={changeValuePayable} onClick={activatePayable} />
                                                <label className="form-check-label" htmlFor="payable">

                                                   activate maximum payable
                               </label>
                                             </div>
                                             {payableOpen ?
                                                <>
                                                   <div className="col-lg-3 col-sm-10">
                                                      <input type="number" className="form-control" placeholder="Insert Value" onChange={changeMappingPayable} />
                                                   </div>
                                                </>
                                                : <>
                                                </>}

                                          </div>
                                       </> :
                                       <>
                                       </>
                                    }

                                    <div className="form-group row">
                                       <label htmlFor="identity" className="col-sm-2 col-form-label">
                                          Main Payment Terms :</label>
                                       <div className="col-lg-6 col-sm-10">
                                          <div className="input-group mb-3">
                                          <select className="form-control" name="id" onChange={changeValueTerm}>
                                                {id !== undefined ?
                                                   <option value={paymentTerm.id} selected>{paymentTerm.name}</option>
                                                   :
                                                   <option value="" selected>Select Term..</option>
                                                }
                                                {listTerm.map(term =>
                                                   <option value={term.value}>{term.label}</option>
                                                )}
                                             </select>
                                           
                                          </div>
                                       </div>
                                    </div>
                                 </>
                                 :
                                 <></>}

                              <div className="form-group row d-flex justify-content-center">
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
export default (connect(mapStateToProps, mapDispatchToProps)(AddContact));

