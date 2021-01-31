import React, { useState} from 'react'
import { useHistory} from 'react-router-dom'
import './style.css'
import Button from '@material-ui/core/Button';




function ContactPage(props) {

   const history = useHistory()

   const addNewContactHandler = () => { 
      history.push("/contact/new")
   }


   const customerHandler = () => { 
      history.push("/contact/customer")
   }
   const supplierHandler = () => { 
      history.push("/contact/supplier")
   }
   const employeeHandler = () => { 
      history.push("/contact/employee")
   }
   const othersHandler = () => { 
      history.push("/contact/others")
   }
   const allTypeHandler = () => { 
      history.push("/contact/all-type")
   }

   return (
      <div className="contact-page col-lg-12 col-sm-12">
         <div className="header row d-flex justify-content-between">
            <div>
            <h3>Contact</h3>
            </div>
            <div>
               <Button onClick={addNewContactHandler} color="primary" autoFocus className="mr-3" style={{backgroundColor:'lightblue', fontWeight:"bold"}}>
                                    Add New   <i className="fas fa-plus ml-3" style={{ fontSize: 12 }} ></i>
               </Button>
            </div>
         </div>
         <hr />
         <div className="contact-body">

            <ul className="nav nav-tabs" id="myTab" role="tablist">
               {/* customer tab */}
               <li className="nav-item" onClick={customerHandler}>
                  {props.page === "customer" ?
                     <>
                  <div className="nav-link active" data-toggle="tab"  role="tab" aria-controls="customer" aria-selected="false">Customer</div>
                     </>
                     :
                     <>
                        <div className="nav-link"  href="#customer" role="tab" aria-controls="customer" aria-selected="false">Customer</div>
                     </>}
               </li>
               {/* customer tab */}
               {/* Supplier tab */}
               <li className="nav-item" onClick={supplierHandler}>
               {props.page === "supplier" ?
                     <>
                  <div className="nav-link active" data-toggle="tab"  role="tab" aria-controls="supplier" aria-selected="false">Supplier</div>
                     </>
                     :
                     <>
                        <div className="nav-link"   role="tab" aria-controls="supplier" aria-selected="false">Supplier</div>
                     </>}
               </li>
               {/* Supplier tab */}
               {/* Employees tab */}
               <li className="nav-item" onClick={employeeHandler}>
               {props.page === "employee" ?
                     <>
                  <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="employee" aria-selected="false">Employee</div>
                     </>
                     :
                     <>
                        <div className="nav-link" role="tab" aria-controls="employee" aria-selected="false">Employee</div>
                     </>}
               </li>
               {/* Employees tab */}
               {/* other tab */}
               <li className="nav-item" onClick={othersHandler}>
               {props.page === "others" ?
                     <>
                  <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="others" aria-selected="false">Others</div>
                     </>
                     :
                     <>
                        <div className="nav-link"  href="#others" role="tab" aria-controls="others" aria-selected="false">Others</div>
                     </>}
               </li>
               {/* other tab */}
               {/* all type tab */}
               <li className="nav-item" onClick={allTypeHandler}>
               {props.page === "all-type" ?
                     <>
                  <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="all-type" aria-selected="false">All Type</div>
                     </>
                     :
                     <>
                        <div className="nav-link"  href="#all-type" role="tab" aria-controls="all-type" aria-selected="false">All Type</div>
                     </>}
               </li>
               {/* all type tab */}
            </ul>
            <div className="tab-content" id="myTabContent">
               {/* customer body */}
               
               {props.children}
               {/* employees body */}
               {/* other body */}
               <div className="tab-pane fade" id="other" role="tabpanel" aria-labelledby="other-tab">...</div>
               {/* other body */}
               {/* all type body */}
               <div className="tab-pane fade" id="type" role="tabpanel" aria-labelledby="type-tab">...</div>
               {/* all type body */}
            </div>
         </div>
      </div>
   )
}

export default ContactPage
