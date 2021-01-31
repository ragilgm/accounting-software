import React from 'react'
import {useHistory} from 'react-router-dom'

function UserDetail() {

   const history = useHistory()

   const backHandler = () => {
      history.push("/setting")
   }

   return (
      <>
         <div className="container">
            <div className="header">
               <h3>
                  <button className="btn btn-link"
                     style={{ fontSize: 30 }}
                     onClick={backHandler}>
                     <i className="fas fa-chevron-left"></i>
                  </button> Back</h3>
            </div>
            <div className="card">
               <div className="col-lg-12">
                  <h3 className="text-center">User Detail</h3>
                  <h5>Name </h5>
               </div>
            </div>

         </div>
      </>
   )
}

export default UserDetail
