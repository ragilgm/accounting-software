import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect} from 'react-redux'

function Logout(props) {
      props.logoutUser()
   return (
      <>
         <Redirect push to="/login" />
      </>
   )
}

const mapStateToProps = (state) => ({
 })
 
const mapDispatchToProps = (dispatch) => ({
   logoutUser: () => dispatch({ type: "LOGOUT", isLogin:false  }),
})


export default connect(mapStateToProps,mapDispatchToProps)(Logout);
