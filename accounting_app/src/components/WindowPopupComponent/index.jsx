import React, { useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function WindowPopupComponent(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   };
  
  
  useEffect(() => { 
    console.log(props);
    setOpen(props.popup)
  }, [props.popup])
  
   const { labelButton,title} = props

  return (
     <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <div className="col-lg-12 px-5 py-5 ">
          <DialogTitle id="alert-dialog-title" className="font-weight-bold text-center">{title}</DialogTitle>
        <DialogContent className="mt-3">
            {props.children}
        </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
