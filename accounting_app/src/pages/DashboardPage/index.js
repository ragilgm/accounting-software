import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import {Redirect, withRouter } from "react-router-dom"
import TableDashBoard from './TableDashBoard'
import { GraphicBar, GraphicPie, GraphicDoughnut, GraphicLine } from './Grapic';
import { connect } from 'react-redux'

class DashboardPage extends Component {


  useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };
  render() {
    console.log(this.props);
    if (!this.props.isLogin) { 
      return (<><Redirect push to ="/login"/></>)
    }
    return (
      <div className="dashboad">

        <div className="container">

          <div className="row d-flex flex-wrap">
            <div className="col-lg-3 omzet ">
              <div className="card">
                <h3>Total Omset</h3>
              </div>
            </div>
            <div className="col-lg-3 kas ">
              <div className="card">
                <h3>Total Kas</h3>
              </div>
            </div>
            <div className="col-lg-3 piutang ">
              <div className="card">
                <h3>Total Piutang</h3>
              </div>
            </div>
            <div className="col-lg-3 hutang ">
              <div className="card">
                <h3>Total hutang</h3>
              </div>
            </div>
            <div className="input-append date" id="datepicker" data-date="02-2012" 
              data-date-format="mm-yyyy">

          <input  type="text" readonly="readonly" name="date"/>    
          <span className="add-on"><i className="icon-th"></i></span>      
          </div>  
            <GraphicBar />
            <GraphicPie />    
            <GraphicDoughnut />    
            <GraphicLine />    
            <GraphicPie />    
          </div>
        </div>

        <div className="row">

          <div className="col-lg-12">
            <div className="card">

                <TableDashBoard/>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	listCompanies:state.DataReducer.companies,
	singleCompany:state.DataReducer.company,
	userLogin:state.AuthReducer.userLogin,
	isLogin:state.AuthReducer.isLogin
 })
 
const mapDispatchToProps = (dispatch) => ({
   listCompaniesData: (companies) => dispatch({ type: "COMPANIES", payload:companies  }),
   singleCompany: (company) => dispatch({ type: "COMPANY", payload:company  }),
   loginUser: (user) => dispatch({ type: "LOGIN", payload:user, status:true  }),
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DashboardPage));
