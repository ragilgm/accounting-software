import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const StyledMenu = withStyles({
   paper: {
     border: '1px solid #d3d4d5',
   },
 })((props) => (
   <Menu
     elevation={0}
     getContentAnchorEl={null}
     anchorOrigin={{
       vertical: 'bottom',
       horizontal: 'center',
     }}
     transformOrigin={{
       vertical: 'top',
       horizontal: 'center',
     }}
     {...props}
   />
 ));
 
 const StyledMenuItem = withStyles((theme) => ({
   root: {
     '&:focus': {
       backgroundColor: theme.palette.primary.main,
       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
         color: theme.palette.common.white,
       },
     },
   },
 }))(MenuItem);

function ProductPage(props) {

   const history = useHistory()


   const servicesHandler = () => {
      history.push("/services")
   }
   const warehouseHandler = () => {
      history.push("/warehouse")
   }
   const priceRulesHandler = () => {
      history.push("/price-rules")
   }

   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const newProductHandler = () => { 
      history.push("/product/new")
   }
   const newWarhouseHandler = () => { 
      history.push("/warehouse/new")
   }
   const stockAdjustmentSetupHandler = () => { 
      history.push("/stock-adjustment/setup")
   }
   const NewTransferWarehouse = () => { 
      history.push("/warehouse-transfers/new")
   }

   const NewPriceRulesHandler = () => { 
      history.push("/price-rules/new")
   }


   return (
      <div className="product-page col-lg-12 col-sm-12">
         <div className="header row d-flex justify-content-between">
            <div>
               <h3>Product</h3>
            </div>
            <div>
               <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
               >
                  Add New +
      </Button>
               <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
               >
                  <small className="mx-2 text-secondary">Product</small>
            
                  <StyledMenuItem onClick={newProductHandler}>
                     <ListItemText primary="New Product" />
                  </StyledMenuItem>
                  <hr />
                  <small className="mx-2 text-secondary">Warehouse</small>
                  <StyledMenuItem>
                  </StyledMenuItem>
                  <StyledMenuItem onClick={newWarhouseHandler}>
                     <ListItemText primary="New Warehouse" />
                     </StyledMenuItem>
                     
                  <StyledMenuItem onClick={stockAdjustmentSetupHandler}>
                     <ListItemText primary="Stock Adjustment" />
                  </StyledMenuItem>
                  <StyledMenuItem onClick={NewTransferWarehouse}>
                     <ListItemText primary="Transfer Warehouse" />
                  </StyledMenuItem>
                  <hr />
                  <small className="mx-2 text-secondary">Price Rules</small>
                  <StyledMenuItem onClick={NewPriceRulesHandler}>
                     <ListItemText primary="New Price Rules" />
                  </StyledMenuItem>
               </StyledMenu>

            </div>
         </div>
         <hr />
         <div className="product-body">

            <ul className="nav nav-tabs" id="myTab" role="tablist">
               {/* services tab */}
               <li className="nav-item" onClick={servicesHandler}>
                  {props.page === "services" ?
                     <>
                        <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="services" aria-selected="false">Product & Services</div>
                     </>
                     :
                     <>
                        <div className="nav-link" href="#services" role="tab" aria-controls="services" aria-selected="false">Product & Services</div>
                     </>}
               </li>
               {/* services tab */}
               {/* warehouse tab */}
               <li className="nav-item" onClick={warehouseHandler}>
                  {props.page === "warehouse" ?
                     <>
                        <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="warehouse" aria-selected="false">Warehouse</div>
                     </>
                     :
                     <>
                        <div className="nav-link" role="tab" aria-controls="warehouse" aria-selected="false">Warehouse</div>
                     </>}
               </li>
               {/* warehouse tab */}
               {/* price-ruless tab */}
               <li className="nav-item" onClick={priceRulesHandler}>
                  {props.page === "price-rules" ?
                     <>
                        <div className="nav-link active" data-toggle="tab" role="tab" aria-controls="price-rules" aria-selected="false">Price Rules</div>
                     </>
                     :
                     <>
                        <div className="nav-link" role="tab" aria-controls="price-rules" aria-selected="false">Price Rules</div>
                     </>}
               </li>
               {/* price-ruless tab */}

            </ul>
            <div className="tab-content" id="myTabContent">
               {/* services body */}

               {props.children}
               {/* price-ruless body */}
               {/* other body */}

            </div>
         </div>
      </div>
   )
}

export default ProductPage
