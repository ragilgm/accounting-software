import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoryAccountPServices from '../../services/CategoryAccountServices'
import AccountServices from '../../services/AccountServices'
import TaxServices from '../../services/TaxServices'
import Select from 'react-select'



function EditAccount(props) {
   const history = useHistory()
   const { id } = useParams();

   const [listCategory, setListCategory] = useState([])
   const [listTax, setListTax] = useState([])
   const [name, setName] = useState(null)
   const [description, setDescription] = useState(null)
   const [number, setNumber] = useState(null)
   const [category_name, setCategory_Name] = useState(null)
   const [as_a_child, setAsAChild] = useState(false)
   const [parentName, setParentName] = useState(null)
   const [balance, setBalance] = useState(0)
   const [as_a_parent, setAsAParent] = useState(false)
   const [company_tax_name, setCompanyTaxName] = useState(null)
   const [children_names, setChildrenName] = useState([])
   const [currentChildrenNames, setCurrentChildrenName] = useState([])
   const [customId, setCustomId] = useState(null)
   const [parentId, setParentId] = useState("")
   const [detail, setDetail] = useState("")
   useEffect(() => {

      AccountServices.getAccountById(id)
         .then(res => {
            setBalance(res.data.balance)
            setName(res.data.name)
            setDescription(res.data.description)
            setNumber(res.data.number)
            setCategory_Name(res.data.category.name)
            if (res.data.parent_id !== 0) {
               setAsAChild(true)
               setParentId(res.data.parent_id)

               setParentName(res.data.parent_name)
               setDetail("children")
            }else if (res.data.children.length !== 0) {
               setAsAParent(true)
               setDetail("parent")
            } else { 
               setAsAParent(false)
               setAsAChild(false)
               setDetail("none")
            }

            setCurrentChildrenName(res.data.children.map(d => ({
                  "value": d.name,
                  "label": `(${d.number_account})-${d.name}`
               })))
               setChildrenName(res.data.children.map(d=>(d.name)))
            setCompanyTaxName(res.data.tax_name)

            AccountServices.getAccountByCategoryId(props.company.id, res.data.category.id)
               .then(res => {
                  setRelationAccount(res.data);
               })

            console.log(res.data);
         })



      CategoryAccountPServices.listCategoryAccount()
         .then((res) => {
            setListCategory(res.data.map(d => ({
               "value": d.id,
               "label": d.categoryName
            })));
         });


      TaxServices.listTax()
         .then((res) => {
            setListTax(res.data.map(d => ({
               "value": d.taxName,
               "label": d.taxName
            })))
         })


   }, [])






   const [relationAccount, setRelationAccount] = useState([])

   const HandleChangeCategory = (e) => {
      console.log('====================================');
      console.log(e.value);
      console.log('====================================');
      setCategory_Name(e.label);

      AccountServices.getAccountByCategoryId(props.company.id, e.value)
         .then(res => {
            setRelationAccount(res.data);
            if (res.data.length !== 0) {
               var category = res.data[res.data.length - 1].number_account.substring(0, 1)
               var delimiter = res.data[res.data.length - 1].number_account.substring(1, 2);
               var numberAccount = parseInt(res.data[res.data.length - 1].number_account.substring(2, 10)) + 1;
               if (number === null || number === "") {
                  var sugestNumber = category + delimiter + numberAccount
                  console.log('====================================');
                  console.log(sugestNumber);
                  console.log('====================================');
                  setNumber(sugestNumber)
               }

               console.log(res.data[res.data.length - 1].number_account.substring(2, 10));
            }
         })


   }

   const changeNameHandler = (e) => {
      setName(e.target.value)
   }

   const changeNumberHandler = (e) => {
      setNumber(e.target.value)
   }

   const changeDescriptionHandler = (e) => {
      setDescription(e.target.value)
   }

   const changeParentHandler = (e) => {
      
      setIsChange(true)
      if (e !== null) {
         var a = e.map(c => (
            c.value
         ))
         console.log(a);
         setChildrenName(a)
      }

   }

   const changeDetailHandler = (e) => {
      if (e.value === "parent") {
         setAsAParent(true)
         setAsAChild(false)
      } else if (e.value === "children") {
         setAsAChild(true)
         setAsAParent(false)
      } else {
         setAsAChild(false)
         setAsAParent(false)
      }
   }

   const changeChildrenHandler = (e) => {
      setParentName(e.value)
   }

   const chageTaxHandler = (e) => {
      setCompanyTaxName(e.value)
   }

   const [loading, setLoading] = useState(false)
   const backHandler = () => {
      history.push("/account/transaction/"+id)
   }

   const UpdateAccountHandler = (e) => {
      e.preventDefault();
      var payload = {
         "name": name,
         "description": description,
         "number": number,
         "category_name": category_name,
         "as_a_child": as_a_child,
         "parentName": parentName,
         "as_a_parent": as_a_parent,
         "company_tax_name": company_tax_name,
         "children_names": children_names,
         "custom_id": customId,

      }
      console.log(payload);
      setLoading(true)
      AccountServices.editAccount(id, payload)
         .then(res => {
            console.log(res.data);
            alert("update account success")
            history.push("/account/transaction/"+id)
         }).catch(error => {
            if (error.response.status === 400) {
               console.log(error.response.data.message)
               alert(error.response.data.message);
            } else {
               alert(error.response);
            }
         }).finally(() => {
            setLoading(false);

         })
   }
   const [isChange, setIsChange] = useState(false)

   var detailList = [
      { "value": "none", "label": "None" },
      { "value": "parent", "label": "Header Account Of :" },
      { "value": "children", "label": "Sub Account Of :" },
   ]

   var detailSubaccoount = [
      { "value": "none", "label": "None" },
      { "value": "children", "label": "Sub Account Of :" },
   ]

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
                  <div className="row ">
                     <div className="header">
                        <h3>
                           <button className="btn btn-link"
                              style={{ fontSize: 30 }}
                              onClick={backHandler}>
                              <i className="fas fa-chevron-left"></i>
                           </button> Edit Account</h3>
                     </div>
                     <div className="contact-body col-lg-12 card px-5">
                        <div className="h5 text-center my-5 ">Detail Account</div>
                        <div className="form offset-2">
                           <form autoComplete="off" >

                              <div className="form-group row">
                                 <label htmlFor="name" className="col-sm-2 col-form-label">Account Name <span className="text-danger">*</span>:</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" name="name" className="form-control" value={name} onChange={changeNameHandler} />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="number" className="col-sm-2 col-form-label">Number <span className="text-danger">*</span>:</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" name="number" className="form-control" value={number}
                                       onChange={changeNumberHandler} placeholder="auto" />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="description" className="col-sm-2 col-form-label">Description :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" name="description" className="form-control" value={description}
                                       onChange={changeDescriptionHandler} />
                                 </div>
                              </div>

                              <div className="form-group row">
                                 <label htmlFor="code" className="col-sm-2 col-form-label">Category <span className="text-danger">*</span>:</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">

                                       {category_name === null ?
                                          <>
                                             <Select
                                                options={listCategory}
                                                onChange={HandleChangeCategory}

                                             />
                                          </> :
                                          <>
                                             <Select
                                                value={listCategory.filter(option => option.label === category_name)}
                                                options={listCategory}
                                                onChange={HandleChangeCategory}

                                             />
                                          </>}

                                    </div>
                                 </div>

                              </div>

                              <div className="form-group row">
                                 <label htmlFor="detail" className="col-sm-2 col-form-label">Detail :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    {detail === "" ? <>
                                  
                                    </> : <>
                                          {balance === 0 ? <>
                                             <Select
                                        defaultValue={detailList.filter(option => option.value === detail)}
                                       options={detailList}
                                       onChange={changeDetailHandler}

                                    />
                                          </> : <>
                                          <Select
                                        defaultValue={detailSubaccoount.filter(option => option.value === detail)}
                                       options={detailSubaccoount}
                                       onChange={changeDetailHandler}

                                    />
                                             </>}
                                 
                                    </>}
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="detail" className="col-sm-2 col-form-label"></label>
                                 <div className="col-lg-6 col-sm-10">
                                    {as_a_child ?
                                       <>
                                          <Select
                                             label="Select Detail"
                                             defaultValue={relationAccount.map(d =>
                                                ({ "value": d.name, "label": `(${d.number_account})-${d.name}` })
                                             ).filter(data => data.parent_name === parentName)}
                                             options={relationAccount.filter(data => data.parent_id === 0 && data.name!==name && data.balance===0).map(d =>
                                                ({ "value": d.name, "label": `(${d.number_account})-${d.name}` }))}
                                             onChange={changeChildrenHandler}
                                          />
                                       </>
                                       :
                                       <>
                                       </>
                                    }
                                    {as_a_parent ?
                                       <>
                                          { isChange?<>
                                             <Select
                                                isMulti
                                                defaultValue={relationAccount.filter(data => data.parent_name === parentName).map(d =>
                                                   ({ "value": d.name, "label": `(${d.number_account})-${d.name}` }))}
                                             options={relationAccount.filter(data=> data.name!==name && data.is_parennt===false).map(d =>
                                                ({ "value": d.name, "label": `(${d.number_account})-${d.name}` }))}
                                             className="basic-multi-select"
                                             classNamePrefix="select"
                                             onChange={changeParentHandler}
                                          />
                                          </> : <>
                                          <Select
                                             isMulti
                                             options={relationAccount.filter(data=> data.name!==name && data.is_parennt===false).map(d =>
                                                ({ "value": d.name, "label": `(${d.number_account})-${d.name}` }))}
                                                value={currentChildrenNames}
                                             className="basic-multi-select"
                                             classNamePrefix="select"
                                             onChange={changeParentHandler}
                                          />
                                          </>}
                                       
                                       </>
                                       :
                                       <>
                                       </>}




                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="company_tax_name" className="col-sm-2 col-form-label">Default Account Tax :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <Select
                                       label="Select Tax"
                                       value={listTax.filter(option => option.label === company_tax_name)}
                                       options={listTax}
                                       onChange={chageTaxHandler}
                                    />

                                 </div>
                              </div>

                              <div className="form-group row d-flex justify-content-center">

                                 <div className="col-lg-6">
                                    <input type="button" value="Cancel" className="btn btn-danger button" onClick={backHandler} />
                                 </div>
                                 <div className="col-lg-6">
                                    <input type="button" value="Update" className="btn btn-success button" onClick={UpdateAccountHandler} />
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
export default (connect(mapStateToProps, mapDispatchToProps)(EditAccount));

