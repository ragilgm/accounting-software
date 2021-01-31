import React, { useState, useEffect } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TableProductServices from './TableProductServices'
import StockAdjustment from './StockAdjustment'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ContactServices from '../../../services/ContactServices'
import { connect } from 'react-redux'
import { DropzoneDialog } from 'material-ui-dropzone'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as XLSX from 'xlsx'
import './style.css'


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

function ProductServices(props) {

   const [loading, setLoading] = useState(false);

   const [render, setRender] = useState(false)
   const [listContact, setListContact] = useState([])


   useEffect(() => {
      setLoading(true)
      ContactServices.getContactByType(props.company.id, "customer")
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

   const [dialogContactGroup, setDialogContactGroup] = React.useState(false);
   const handleContactGroupOpen = () => {
      setDialogContactGroup(true)
   }
   const handleContactGroupClose = () => {
      setDialogContactGroup(false)
   }

   const initialGroup = {
      groupName: "",
      type: "customer",
   }

   const [group, setGroup] = useState(initialGroup)

   const handleChangeGroupName = (e) => {
      const { name, value } = e.target
      setGroup({
         ...group,
         [name]: value
      })
   }

   const [formAddGroup, setFormAddGroup] = useState(false);

   const AddNewGroupOpen = () => {
      setFormAddGroup(true)
   }
   const AddNewGroupClose = () => {
      setFormAddGroup(false)
   }

   const [currentId, setCurrentId] = useState("")

   
   const addNewGroupSubmit = (e) => {
      // if (group.groupName === "") {
      //    swal({
      //       title: "name is required!",
      //       icon: "error"
      //    });
      //    return;
      // }
      // e.preventDefault();
      // ContactGroupServices.addNewContactGroup(props.company.id, group)
      //    .then(res => {
      //       swal({
      //          title: "Yeay .. new group has been added!",
      //          icon: "success"
      //       });
      //       setGroup(initialGroup)
      //       setFormAddGroup(false)
      //       setRender(!render)
      //    })
   }


   const EditContactGroup = (id) => { 
      // setFormAddGroup(true)
      // for (let i = 0; i < contactGroup.length; i++) {
      //    const element = contactGroup[i];
      //    if (element.id === id) { 
      //       setCurrentId(element.id)
      //       setGroup({
      //          ...group,
      //          "groupName": element.groupName
      //       })
      //       break;
      //    }
         
      // }
   }


   const updateGroupHandler = () => { 
      // ContactGroupServices.editContactGroup(props.company.id, currentId, group)
      //    .then(res => { 
      //       swal({
      //          title: " Update Successfull!",
      //          icon: "success"
      //       });
      //       setCurrentId("")
      //       setGroup(initialGroup)
      //       setFormAddGroup(false)
      //       setRender(!render)
      //    }).catch(err => { 
      //       swal({
      //          title: " Update Failed!",
      //          icon: "erorr"
      //       });
      //    })
   }

   const deleteContactGroup = (id) => { 
      // swal({
      //    title: "Are you sure?",
      //    text: "Once deleted, you will not be able to recover !",
      //    icon: "warning",
      //    buttons: true,
      //    dangerMode: true,
      //  })
      //  .then((willDelete) => {
      //     if (willDelete) {
      //       ContactGroupServices.deleteContactGroup(id)
      //       .then(res => { 
      //          setRender(!render)
      //       })
      //      swal(" Your data file has been deleted!", {
      //        icon: "success",
      //      });
      //    } else {
      //      swal("Your data still safe!");
      //    }
      //  });

   }

   const [q, setQ] = useState("")

   function SeachData(rows) {
      return rows.filter(row => row.companyName.toLowerCase().indexOf(q) > -1 ||
         row.fullname.toLowerCase().indexOf(q) > -1 ||
         row.email.toLowerCase().indexOf(q) > -1 ||
         row.handphone.indexOf(q) > -1 ||
         row.telephone.indexOf(q) > -1 ||
         row.npwp.indexOf(q) > -1 ||
         row.information.indexOf(q) > -1);
   }

   const [productServices, serProductServices] = useState("aktif")
   const [stockAdjustment, setStockAdjustment] = useState("")

   const productServicesHandler = () => {
      serProductServices("aktif")
      setStockAdjustment("")
   }


   const stockAdjustmentHandler = () => {
      serProductServices("")
      setStockAdjustment("aktif")
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
                     <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                        <h5>Summary </h5>
                        <button className="btn btn-link" style={{ fontSize: 15 }} onClick={handleContactGroupOpen}>Category Product <i className="fas fa-cogs"></i></button>
                        <Dialog
                           open={dialogContactGroup}
                           onClose={handleContactGroupClose}
                           aria-labelledby="alert-dialog-title"
                           aria-describedby="alert-dialog-description"
                        >
                           <DialogTitle id="alert-dialog-title" className="text-center font-weight-bold">List Category
                              <div className="my-3">
                                 <Button onClick={AddNewGroupOpen} color="primary" autoFocus>
                                    Add New   <i className="fas fa-plus ml-3" style={{ fontSize: 12 }} ></i>
                                 </Button>
                              </div>
                           </DialogTitle>
                           <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                 {formAddGroup ?
                                    <div className="row d-flex justify-content-center" >
                                       <div className="">

                                          <TextField
                                             id="filled-group-input"
                                             label="Group Name"
                                             type="text"
                                             name="groupName"
                                             value={group.groupName}
                                             onChange={handleChangeGroupName}
                                          />
                                       </div>

                                       {currentId === "" ?
                                          <button className="btn btn-link ml-5" onClick={addNewGroupSubmit}> Add <i className="fas fa-plus ml-3" style={{ fontSize: 12 }} ></i></button>
                                          :
                                          <button className="btn btn-link ml-5" onClick={updateGroupHandler}> Update <i className="fas fa-plus ml-3" style={{ fontSize: 12 }} ></i></button>
                                       }
                                       <button className="btn btn-link text-danger" onClick={AddNewGroupClose}> Cancel <i className="ml-3 fas fa-times"></i></button>
                                    </div>
                                    :
                                    <></>
                                 }
                                 {/* <TableContactGroup contactGroup={contactGroup} edit={EditContactGroup} delete={deleteContactGroup} /> */}

                              </DialogContentText>
                           </DialogContent>
                        </Dialog>
                     </div>
                     <div className="line"></div>
                     <div className="row mt-3">
                        <div className="product ">
                           <div className=" stock-available my-2">
                              <h5 className="text-center"> 8 Type</h5>
                              <p className="text-center"> Stock Available</p>
                           </div>
                        </div>
                        <div className="product ">
                           <div className="stock-will-be-empty my-2">
                              <h5 className="text-center"> 8 Type</h5>
                              <p className="text-center"> Stock Will Be Empty</p>
                           </div>
                        </div>
                        <div className="product ">
                           <div className="stock-empty my-2">
                              <h5 className="text-center"> 8 Type</h5>
                              <p className="text-center"> Stock Empty</p>
                           </div>
                        </div>
                        <div className="product ">
                           <div className="warehouse-list my-2">
                              <h5 className="text-center"> 8 Type</h5>
                              <p className="text-center"> Warehouse List</p>
                           </div>
                        </div>
                     </div>

                     <div className="supplier-body mt-5">
                        <div className="row">
                           <div className="header col-lg-4 col-sm-4 my-2 mt-3">
                              <button className="btn button btn-btn-primary" id={productServices} onClick={productServicesHandler}>Product & Serivces</button>
                              <button className="btn button btn-btn-primary" id={stockAdjustment} onClick={stockAdjustmentHandler}>Stock Adjustment</button>
                           </div>
                           <div className="action col-lg-4 col-sm-4 my-2 row">
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

                           <div className="search-contact col-lg-4 col-sm-4 my-2">
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
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                 />
                              </div>
                           </div>
                           <div className="table-customer col-lg-12 mt-3">
                              {console.log()}
                              {listContact.length === 0 ?
                                 <div><h3 className="text-center">No Data Record ..</h3></div>
                                 :
                                 <>
                                    {productServices === "aktif" ?
                                       <>
                                          <TableProductServices data={SeachData(listContact.contact)} />
                                       </>
                                       :
                                       <>
                                          <StockAdjustment data={SeachData(listContact.contact)} />
                                       </>
                                    }
                                 </>

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
export default (connect(mapStateToProps, mapDispatchToProps)(ProductServices));