import React, { useState, useEffect} from 'react'
import TableUser from './TableUser'



function UserSettingPage(props) {

   const isRender = () => { 
      console.log("Called");
      props.render()
   }

   

   return (
      <>
         
            <h5 className="mb-5 my-5">User Settings</h5>
            {props.data.user !== "" ? <>
            <TableUser data={props.data.user} render={isRender}/>
            </> :
               <></>}
         
      </>
   )
}

export default UserSettingPage
