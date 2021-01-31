import React from 'react'
import { useParams } from 'react-router-dom'
function ImageViewer() {

   const { image } = useParams()

   return (
      <div style={{width:600, height:600, margin:"auto", marginTop:"3rem"}}>
         <img src={"http://localhost:8080/api/v1/journal-entry/attachment/image/" + image} alt="" srcset=""
            style={{ width:"100%"}}
         />
      </div>
   )
}

export default ImageViewer
