import React,{useState, useEffect} from 'react'
import { connect} from 'react-redux'
import CompanyServices from '../../../services/CompanyServices'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableCategory from './TableCategory'
import CategoryProductServices from '../../../services/CategoryProductServices'
import ProductUnitServices from '../../../services/ProductUnitServices'

import TableUnit from './TableUnit'


function ProductServices(props) {


   const [showStock,setShowStock] = useState(props.data.show_stock)
   const [render, setRender] = useState(false)
   const [loading, setLoading] = useState(false)
   const [listCategory, setListCategory] = useState([])
   const [listProductUnit, setListProdictUnit] = useState([])
   
   useEffect(() => { 
      console.log("render bro");
      CategoryProductServices.listCategoryProduct(props.companyId.id)
         .then(res => { 
            console.log(res.data);
            setListCategory(res.data)
         }).catch(err => { 
            console.log(err);
         })
         ProductUnitServices.listProductUnit(props.companyId.id)
         .then(res => { 
            console.log(res.data);
            setListProdictUnit(res.data)
         }).catch(err => { 
            console.log(err);
         })
      
   }, [render])
   

   const AddCategoryProduct = (payload) => { 
      console.log(payload);
      CategoryProductServices.AddCategoryProduct(props.companyId.id, payload)
         .then(res => { 
            setRender(!render)
            alert("Insert Category Successfull")
            console.log(res.data);
         }).catch(err => { alert(err) })

   }
   const AddProductUnit = (payload) => { 
      console.log(payload);
      ProductUnitServices.AddProductUnit(props.companyId.id, payload)
         .then(res => { 
            setRender(!render)
            alert("Insert Unit Successfull")
            console.log(res.data);
         }).catch(err => { alert(err) })

   }

   const deleteCategoryProduct = (id) => { 
      console.log("called");
      CategoryProductServices.DeleteCategoryProduct(id)
         .then(res => { 
            setRender(!render)
            alert("Delete Category Successfull")
            console.log(res.data);
         }).catch(err => { alert(err) })
   }
   const DeleteProductUnit = (id) => { 
      console.log("called");
      ProductUnitServices.DeleteProductUnit(id)
         .then(res => { 
            setRender(!render)
            alert("Delete Unit Successfull")
            console.log(res.data);
         }).catch(err => { alert(err) })
   }

   const updateCategoryProduct = (id, payload) => {
      console.log(payload);
      CategoryProductServices.EditCategoryProduct(id, payload)
         .then(res => { 
            setRender(!render)
            alert("Update Category Successfull")
            console.log(res.data);
         }).catch(err => { alert(err) })

   }

   const updateProductUnit = (id, payload) => {
      console.log(payload);
      ProductUnitServices.EditProductUnit(id, payload)
         .then(res => { 
            setRender(!render)
            alert("Update Unit Successfull")
            console.log(res.data);
         }).catch(err => { alert(err) })

   }

   const onChangeValue = (e) => { 
      var { checked } = e.target;
      setShowStock(checked)
   }

   const updateHandler = e => { 
      e.preventDefault()
      setLoading(true)
      console.log(showStock);
      var payload = {
         show_stock:showStock
      }
      CompanyServices.updateCompanyProductStockSetting(props.companyId.id,payload )
         .then(res => { 
            console.log(res.data);
         }).catch(err => { 
            console.log(err);
         }).finally(() => { 
            props.render()
            setLoading(false)
         })

   }

   const cancelHandler = () => { 
      window.history.go();
   }

   const [openCategory, setOpenCategory] = useState(false);
   const [openUnit, setOpenUnit] = useState(false);

   const handleCloseCategory = () => {
      setOpenCategory(false);
   };
   const handleCloseUnit = () => {
      setOpenUnit(false);
   };

   const handleCategoryOpen = () => { 
      setOpenCategory(true);
   }
   const OpenUnitHandler = () => { 
      setOpenUnit(true);
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
         
         <div className="form">
            <form autoComplete="off" className="row " >
               <div className="salesSetting col-lg-12 col-sm-12">
                  <h5 className="mb-5 my-5">Product & Services</h5>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="logo" className=" col-lg-4 col-sm-12 col-form-label">
                        Show Product Stock :</label>
                        <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                           {showStock ?
                              <>
                                 <input class="form-check-input ml-2 mt-3" type="checkbox" name="show_stock" value="true" checked onChange={onChangeValue}/>
                              </>
                              :
                              <>
                                      <input class="form-check-input ml-2 mt-3"  name="show_stock" type="checkbox" value="true" onChange={onChangeValue}/>
                              </>}
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Category Product :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                                 <div className="text-primary" onClick={handleCategoryOpen}>Setting Category </div>
                                 <Dialog
                                 open={openCategory}
                                 onClose={handleCloseCategory}
                                 aria-labelledby="alert-dialog-title"
                                 aria-describedby="alert-dialog-description"
                              >
                                 <DialogTitle id="alert-dialog-title" className="text-center">Category Setup</DialogTitle>
                                 <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                          <TableCategory data={listCategory} add={AddCategoryProduct}
                                             edit={updateCategoryProduct} delete={deleteCategoryProduct}/>
                                    </DialogContentText>
                                 </DialogContent>
                                 <DialogActions>

                                 </DialogActions>
                              </Dialog>
                        </div>
                     </div>
                  </div>
                  <div className="form-group row  col-lg-12" >
                     <label htmlFor="nickname" className=" col-lg-4 col-sm-12 col-form-label">Product Unit :</label>
                     <div className="col-lg-8 col-sm-12">
                        <div className="col-lg-8 col-sm-12">
                                 <div className="text-primary" onClick={OpenUnitHandler}>Setting Unit </div>
                                 <Dialog
                                 open={openUnit}
                                 onClose={handleCloseUnit}
                                 aria-labelledby="alert-dialog-title"
                                 aria-describedby="alert-dialog-description"
                              >
                                 <DialogTitle id="alert-dialog-title" className="text-center">Unit Setup</DialogTitle>
                                 <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                          <TableUnit data={listProductUnit} add={AddProductUnit}
                                             edit={updateProductUnit} delete={DeleteProductUnit}/>
                                    </DialogContentText>
                                 </DialogContent>
                                 <DialogActions>

                                 </DialogActions>
                              </Dialog>
                        </div>
                     </div>
                  </div>
              
                  <div className="col-lg-12 d-flex justify-content-ceneter mt-4">
                     <div className="col-lg-6">
                        <input type="button" className="btn button btn-danger" value="Cancel" onClick={cancelHandler}/>
                     </div>
                     <div className="col-lg-6">
                        <input type="button" className="btn button btn-primary" value="Update" onClick={updateHandler} />
                     </div>
                  </div>
               </div>
            </form>
         </div>
         </>}
      </>
   )
}


const mapStateToProps = (state) => ({
	companyId:state.AuthReducer.company,
	userLogin:state.AuthReducer.userLogin,
	isLogin:state.AuthReducer.isLogin
 })
 
const mapDispatchToProps = (dispatch) => ({
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload:user, isLogin:true,company:company  }),
})


export default connect(mapStateToProps,mapDispatchToProps)(ProductServices);

