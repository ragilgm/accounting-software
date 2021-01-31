import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import ContactServices from '../../../services/ContactServices';
import Profile from './Profile'
import './style.css'

function ContactInformation(props) {

   const history = useHistory();

   const { id } = useParams();
   const [loading, setLoading] = useState(false)
   const [profile, setProfile] = useState("")
   const [contactType, setContactType] = useState("")
   const [contactGroup, setContactGroup] = useState("")

   useEffect(() => {
      setLoading(true)
      ContactServices.getContactById(props.company.id, id)
         .then(res => {
            console.log('====================================');
            console.log(res.data);
            console.log('====================================');
            setProfile(res.data)
            setContactType(res.data.contactType)
            setContactGroup(res.data.contactGroup)
         }).finally(() => {
            setLoading(false)
         })

   }, []);

   const editHandler = id => { 
      history.push("/contact/edit/"+id)
   }

   const backHandler = () => {
      history.push("/contact")
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

                     <div className="header col-lg-12">
                        <h3>
                           <button className="btn btn-link"
                              style={{ fontSize: 30 }}
                              onClick={backHandler}>
                              <i className="fas fa-chevron-left"></i>
                              </button> Contact Information
                           </h3>
                        <hr />
                     </div>
                     <div className="profile container col-lg-12  d-flex justify-content-between">
                        <div>
                        <h3>{profile.companyName}</h3>
                           <small>Contact Type : {contactType.name}</small><br />
                           {contactGroup === null ?
                              <>
                                 <small>Contact Group : - </small>
                              </>
                              : <>
                        <small>Contact Group : {contactGroup.groupName}</small>
                              </>}
                        </div>
                        <div>
                           <button style={{ border: "1px solid blue" }} type="submit" className="btn btn-link mr-3" onClick={()=> editHandler(profile.id)} >Edit Profile <i className="fas fa-pencil-alt"></i></button>
                           <button style={{border:"1px solid green"}} type="submit" className="btn btn-link text-success">Create Transaction <i className="fas fa-plus"></i>
                              </button>
                        </div>
                     </div>
                     <div className="contact-info-body col-lg-12 mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                           <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
                           </li>
                           <li className="nav-item" role="presentation">
                              <a className="nav-link" id="transaction-tab" data-toggle="tab" href="#transaction" role="tab" aria-controls="transaction" aria-selected="false">Transaction</a>
                           </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                           <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                              <Profile data={profile}/>

                           </div>
                           <div className="tab-pane fade" id="transaction" role="tabpanel" aria-labelledby="transaction-tab">...</div>
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
export default (connect(mapStateToProps, mapDispatchToProps)(ContactInformation));