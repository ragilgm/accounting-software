import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './style.css'

class Progress extends Component {
   constructor(props) {
      super(props);
      this.state = {
         activeStep: 0,
         step:[]
      }
   }

    handleNext = () => {
       this.setState({activeStep:this.state.activeStep+1})
    };
  
     handleBack = () => {
      this.setState({activeStep:this.state.activeStep-1})
    };
  
     handleReset = () => {
      this.setState({activeStep:this.state.activeStep+0})
    };

   componentDidMount() { 
      console.log(this.props.progress)
      this.setState({step:this.props.stepValue, activeStep:this.props.progress})
   }

   useStyles = makeStyles((theme) => ({
      root: {
         width: '100%',
      },
      backButton: {
         marginRight: theme.spacing(1),
      },
      instructions: {
         marginTop: theme.spacing(1),
         marginBottom: theme.spacing(1),
      },
   }));

   render() {
      return (
         <div>
            <div className={this.useStyles.root}>
               <Stepper activeStep={this.props.progress} alternativeLabel value={this.props.progress}>
                  {this.state.step.map((label) => (
                     <Step key={label.step}>
                        <StepLabel>{label.value}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               <div>
               </div>
            </div>
         </div>
      );
   }
}

export default Progress;



