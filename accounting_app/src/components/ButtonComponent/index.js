import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
  createStyles({
   button: {
      marginBottom:"2rem",
      paddingTop:".5rem",
        paddingBottom: ".5rem",
        paddingRight: "2rem",
        paddingLeft: "2rem",
        backgroundColor: "green",
        color: "white",
        fontWeight: "bold",
        marginRight:"1rem"
   }
  }),
);
function ButtonComponent(props) {
   const classes = useStyles();
   const { labelButton,onClickEvent} = props
   return (
      <>
         <Button variant="contained" className={classes.button}  onClick={onClickEvent}>
            {labelButton}
         </Button>
      </>
   )
}

export default ButtonComponent
