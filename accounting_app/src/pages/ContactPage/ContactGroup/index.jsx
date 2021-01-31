import React, { useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableContactGroup from './TableContactGroup'

function ContactGroup(props) {
   const [openDialog, setOpenDialog] = useState(true);

   const handleCloseDialog = () => {
      setOpenDialog(false);
   };

   return (
      <>
         <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title" className="text-center">Contact Group</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  <TableContactGroup/>
               </DialogContentText>
            </DialogContent>
            <DialogActions>

            </DialogActions>
         </Dialog>
      </>
   )
}

export default ContactGroup
