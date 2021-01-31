import React, { useState, useEffect } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TableContact from './TableContact'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ContactServices from '../../../services/ContactServices'
import { connect } from 'react-redux'
import { DropzoneDialog } from 'material-ui-dropzone'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as XLSX from 'xlsx'



const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      grow: {
         flexGrow: 1,
      },
      menuButton: {
         marginRight: theme.spacing(2),
      },
      title: {
         display: 'none',
         [theme.breakpoints.up('sm')]: {
            display: 'block',
         },
      },
      search: {
         position: 'relative',
         marginTop: 10,
         borderRadius: theme.shape.borderRadius,
         backgroundColor: fade(theme.palette.common.black, 0.25),
         '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
         },
         marginRight: theme.spacing(2),
         marginLeft: 0,
         width: '100%',
         [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
         },
      },
      searchIcon: {
         padding: theme.spacing(0, 2),
         height: '100%',
         position: 'absolute',
         pointerEvents: 'none',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
      },
      inputRoot: {
         color: 'inherit',
      },
      inputInput: {
         padding: theme.spacing(1, 1, 1, 0),
         paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
         transition: theme.transitions.create('width'),
         width: '100%',
         [theme.breakpoints.up('md')]: {
            width: '20ch',
         },
      },
      sectionDesktop: {
         display: 'none',
         [theme.breakpoints.up('md')]: {
            display: 'flex',
         },
      },
      sectionMobile: {
         display: 'flex',
         [theme.breakpoints.up('md')]: {
            display: 'none',
         },
      },
   }),
);

function PriceRules(props) {

   const [loading, setLoading] = useState(false);

   const [render, setRender] = useState(false)
   const [listContact, setListContact] = useState([])


   useEffect(() => {
      setLoading(true)
      ContactServices.getContactByType(props.company.id, "employee")
         .then(res => {
            console.log(res.data);
            setListContact(res.data)

         }).finally(setLoading(false))



   }, [render])

   const [openDropzone, setOpenDropzone] = useState(false)

   const handleOpenDropzone = () => {
      setOpenDialog(false);
      setOpenDropzone(true)
   }
   const handleCloseDropzone = () => {
      setOpenDropzone(false)
   }

   const importHandler = (file) => {
      const files = file[0]
      setOpenDropzone(false)
      const promise = new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.readAsArrayBuffer(files);

         fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray, { type: "buffer" });
            console.log(wb);
            const wsname = wb.SheetNames[0];
            console.log(wsname);
            const ws = wb.Sheets[wsname];
            console.log(ws);
            const data = XLSX.utils.sheet_to_json(ws, { raw: false });

            console.log(data);

            resolve(data);
         };

         fileReader.onerror = (error) => {
            reject(error);
         };
      });

      promise.then((d) => {
         console.log('====================================');
         console.log(d);
         console.log('====================================');
      });
   };

   const [openDialog, setOpenDialog] = React.useState(false);

   const handleClickOpenDialog = () => {
      setOpenDialog(true);
   };

   const handleCloseDialog = () => {
      setOpenDialog(false);
   };


   

   const [musPaid, setMustPaid] = useState("aktif")
   const [wilReceipt, setWillReceipt] = useState("")

   const setMusPainHandler = () => {
      setMustPaid("aktif")
      setWillReceipt("")
   }
   const willPaidHandler = () => {
      setMustPaid("")
      setWillReceipt("aktif")
   }


   const classes = useStyles();
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
               <div className="tab-pane fade show active" id="customer" role="tabpanel" aria-labelledby="customer-tab">
                  <div className="customer-body mt-5">

                     <div className="supplier-body mt-5">
                        <div className="row">
                           <div className="header col-lg-4 my-2 mt-3">
                           </div>
                           <div className="action col-lg-4 my-2 row">
                              <div className="button-action-import col-lg-6 my-2">
                                 <div>
                                    <button type="button" onClick={handleClickOpenDialog} className="btn btn-primary btn-block">
                                       Import <i className=" ml-3 fas fa-file-excel"></i>
                                    </button>
                                    <Dialog
                                       open={openDialog}
                                       onClose={handleCloseDialog}
                                       aria-labelledby="alert-dialog-title"
                                       aria-describedby="alert-dialog-description"
                                    >
                                       <DialogTitle id="alert-dialog-title" className="text-center">Import Contact</DialogTitle>
                                       <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                             <div className="container px-5 py-2">
                                                <ul>
                                                   <li>1. Download Template <a href="http://sds">download</a></li>
                                                   <li>2. Insert Data. adjust as fied</li>
                                                </ul>
                                             </div>
                                          </DialogContentText>
                                       </DialogContent>
                                       <DialogActions>
                                          <input type="button" className="btn btn-link" onClick={handleCloseDialog} color="primary" autoFocus value="Cancel" />
                                          <input type="button" className="btn btn-link" onClick={handleOpenDropzone} color="primary" value="Next" />
                                       </DialogActions>
                                    </Dialog>
                                    <DropzoneDialog
                                       open={openDropzone}
                                       onSave={importHandler.bind(this)}
                                       acceptedFiles={['image/jpeg', 'image/png', 'image/jpg', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/docx', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                                       showPreviews={true}
                                       maxFileSize={5000000}
                                       onClose={handleCloseDropzone.bind(this)}
                                    />
                                 </div>

                              </div>
                              <div className="button-action-export col-lg-6 my-2">
                                 <button className="btn btn-success btn-block">Export <i className=" ml-3 fas fa-file-excel"></i></button>
                              </div>
                           </div>

                           <div className="search-contact col-lg-4 my-2">
                              <div className={classes.search}>
                                 <div className={classes.searchIcon}>
                                    <SearchIcon />
                                 </div>
                                 <InputBase
                                    placeholder="Search…"
                                    classes={{
                                       root: classes.inputRoot,
                                       input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                 />
                              </div>
                           </div>
                           <div className="table-customer col-lg-12 mt-3">
                              {console.log()}
                              {listContact.length === 0 ?
                                 <div><h5 className="text-center">No Data Record ..</h5></div>
                                 :
                                 <TableContact data={listContact.contact} />

                              }
                           </div>
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
export default (connect(mapStateToProps, mapDispatchToProps)(PriceRules));