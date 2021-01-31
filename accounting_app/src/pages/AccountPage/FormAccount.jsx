import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoryAccountPServices from '../../services/CategoryAccountServices'
import AccountServices from '../../services/AccountServices'
import TaxServices from '../../services/TaxServices'
import Select from 'react-select'
import swal from 'sweetalert'



function FormAccount(props) {
   const history = useHistory()


   const [listCategory, setListCategory] = useState([])
   const [listTax, setListTax] = useState([])
   useEffect(() => {
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



   const [name, setName] = useState(null)
   const [description, setDescription] = useState(null)
   const [number, setNumber] = useState(null)
   const [category_name, setCategory_Name] = useState(null)
   const [as_a_child, setAsAChild] = useState(false)
   const [parentName, setParentName] = useState(null)
   const [as_a_parent, setAsAParent] = useState(false)
   const [company_tax_name, setCompanyTaxName] = useState(null)
   const [children_names, setChildrenName] = useState([])



   const [relationAccount, setRelationAccount] = useState([])

   const HandleChangeCategory = (e) => {
      console.log('====================================');
      console.log(e.value);
      console.log('====================================');
      setCategory_Name(e.label);


      AccountServices.getAccountByCategoryId(props.company.id,e.value)
         .then(res => {
            console.log(res.data);
            setRelationAccount(res.data);
            if (res.data.length !== 0) { 
               var category = res.data[res.data.length - 1].number_account.substring(0, 1)
               var delimiter = res.data[res.data.length - 1].number_account.substring(1,2);
               var numberAccount = parseInt(res.data[res.data.length - 1].number_account.substring(2, 10)) + 1;
               if (number===null || number==="") { 
                  var sugestNumber = category + delimiter + numberAccount
                  console.log('====================================');
                  console.log(sugestNumber);
                  console.log('====================================');
                  setNumber(sugestNumber)
               }
             
               console.log(res.data[res.data.length-1].number_account.substring(2,10));
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
      history.push("/account")
   }

   const addNewAccountHandler = (e) => { 
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
      
      }
      console.log(payload);
      setLoading(true)
      AccountServices.addNewAccount(props.company.id,payload)
         .then(res => { 
            console.log(res.data);
            swal({
               title: "New account has been created..",
               icon: "success",
             }); 
            history.push("/account")
         }).catch(error => { 
            if (error.response.status === 400) {
               console.log(error.response.data.message)
               swal({
                  title: error.response.data.message.toString(),
                  icon: "error",
                }); 
      
            } else { 
               swal({
                  title: error.response.toString(),
                  icon: "error",
                }); 
      
            }
         }).finally(() => { 
            setLoading(false);
      
         })
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
                  <div className="row ">
                     <div className="header">
                        <h3>
                           <button className="btn btn-link"
                              style={{ fontSize: 30 }}
                              onClick={backHandler}>
                              <i className="fas fa-chevron-left"></i>
                           </button> Create Account</h3>
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
                                       onChange={changeNumberHandler} placeholder="auto"/>
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="description" className="col-sm-2 col-form-label">Description :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <input type="text" name="description" className="form-control" value={description}
                                       onChange={changeDescriptionHandler} />
                                 </div>
                              </div>
                              {children_names.length === 0 ?
                                 <>
                                      <div className="form-group row">
                                 <label htmlFor="code" className="col-sm-2 col-form-label">Category <span className="text-danger">*</span>:</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">

                                       <Select
                                          label="Single Category"
                                          options={listCategory}
                                          onChange={HandleChangeCategory}

                                       />

                                    </div>
                                 </div>

                              </div>
                                 </> : <>
                                 <div className="form-group row">
                                 <label htmlFor="code" className="col-sm-2 col-form-label">Category <span className="text-danger">*</span>:</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <div className="input-group mb-3">

                                       <Select
                                          label="Single Category"
                                          options={listCategory}
                                          onChange={HandleChangeCategory}
                                          
                                       />

                                    </div>
                                 </div>

                              </div>
                                 </>}
                              <div className="form-group row">
                                 <label htmlFor="detail" className="col-sm-2 col-form-label">Detail :</label>
                                 <div className="col-lg-6 col-sm-10">
                                    <Select
                                       label="Select Detail"
                                       options={[
                                          { "value": "", "label": "None" },
                                          { "value": "parent", "label": "Header Account Of :" },
                                          { "value": "children", "label": "Sub Account Of :" },
                                       ]}
                                       onChange={changeDetailHandler}

                                    />
                                 </div>
                              </div>
                              <div className="form-group row">
                                 <label htmlFor="detail" className="col-sm-2 col-form-label"></label>
                                 <div className="col-lg-6 col-sm-10">
                                    {as_a_child ?
                                       <>
                                          <Select
                                             label="Select Detail"
                                             options={relationAccount.filter(data => data.parent_id === 0 && data.balance===0).map(d => 
                                                ({"value":d.name, "label":`(${d.number_account})-${d.name}`}))}
                                             onChange={changeChildrenHandler}
                                          />
                                       </>
                                       :
                                       <>
                                       </>
                                    }
                                    {as_a_parent ?
                                       <>
                                          <Select
                                             isMulti
                                             name=""
                                             options={relationAccount.filter(d=>d.is_parennt===false).map(d => 
                                                ({ "value": d.name, "label": `(${d.number_account})-${d.name}` }))
                                             }
                                             className="basic-multi-select"
                                             classNamePrefix="select"
                                             onChange={ changeParentHandler}
                                          />
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
                                       options={listTax}
                                       onChange={ chageTaxHandler}
                                    />

                                 </div>
                              </div>

                              <div className="form-group row d-flex justify-content-center">

                                 <div className="col-lg-6">
                                    <input type="button" value="Cancel" className="btn btn-danger button" onClick={ backHandler}/>
                                 </div>
                                 <div className="col-lg-6">
                                    <input type="button" value="Save" className="btn btn-success button" onClick={addNewAccountHandler}/>
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
export default (connect(mapStateToProps, mapDispatchToProps)(FormAccount));

