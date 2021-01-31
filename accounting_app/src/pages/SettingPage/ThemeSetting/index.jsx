import React from 'react'
import { connect} from 'react-redux'

function ThemeSetting(props) {
   const basicHandler =  () => { 
      props.theme("basic")
      alert("Please Reload For Apply Your Change")
   }

   const darkulaHandler = () => { 
      props.theme("darcula")
      alert("Please Reload For Apply Your Change")
   }

   return (
      <>
         <div className="container">
         <h5 className="mb-5 my-5">Theme Setting</h5>
         <div className="row">
               <div className="box col-lg-3 mx-2 basic"  onClick={basicHandler}>
                  <h5 className="text-center mt-4 mb-4" >Basic</h5>
            </div>
               <div className="box col-lg-3 mx-2 dracula" style={{ backgroundColor: "grey", color: "white" }} onClick={darkulaHandler}>
               <h5 className="text-center mt-4 mb-4 ">Dracula</h5>
            </div>
       
         </div>
       </div>
      </>
   )
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  swithTheme: (themeName) => dispatch({ type: "theme", payload: themeName }),
})


export default connect(mapStateToProps,mapDispatchToProps)(ThemeSetting);

