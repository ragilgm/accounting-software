import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { useParams } from 'react-router-dom'

function PdfViewer() {
   const { file } = useParams()
   return (
      <div className="App" style={{backgroundColor:"white"}}>
         <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
            <div id="pdfviewer">
               <Viewer fileUrl={"http://localhost:8080/api/v1/journal-entry/attachment/pdf/"+file}/>
            </div>
         </Worker>
      </div>
   );
}

export default PdfViewer
