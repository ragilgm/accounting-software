import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import CompanyServices from '../../services/CompanyServices';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect} from 'react-redux'
import './style.css'
import Input from '@material-ui/core/Input';
import UsersServices from '../../services/UsersServices';
import swal from 'sweetalert'

class LoginPages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			companyId: "",
			companies:[],
			username: "",
			password: "",
			email: "",
			role: "",
			logo: "",
			loading:false
		}
	}

	componentDidMount() { 
		this.setState({loading:true})
		CompanyServices.Companies()
			.then(res => { 
				console.log(res.data)
				this.setState({loading:false})
			  this.setState({companies:res.data})
		  });
	 }
	 

	registerPage = () => {
		this.props.history.push("/register")
	}
	loginHandler = (id) => {
		var company = ""
		CompanyServices.Company(id)
			.then(res => { 
				var user = {
					"username": this.state.username,
					"password": this.state.password,
				}
				company=res.data
				UsersServices.LoginUser(res.data.id, user)
					.then(res => { 
						
						swal({
							title: "Login Successfull..",
							icon: "success",
						 });
						this.props.loginUser(res.data, company)
						this.props.history.push("/home")
					}).catch(err=> {
						swal({
							title: "Login failed.. :(",
							icon: "error",
						 });
					})
			})
	}

	handleChange = (event) => {
		 console.log(event.target.value);
		this.setState({ companyId: event.target.value });
		if (event.target.value === this.state.companies[0].id) {
			this.setState({ logo: "./logo.jpg" })
		} 

	 };

	changeValue = (e) => { 
		this.setState({[e.target.name]:e.target.value})
	}
	
	render() {
		if (this.props.isLogin) { 
			return (<><Redirect push to ="/home"/></>)
		}
		if (this.state.loading) {
			return (
				<>
					<div id="bg-loading" className="bg-loading" >
						<div id="loading" className="loading"></div>
					</div>
				</>)
		 }
		return (
			<>
			<div className="wrapper-login px-5">
				<div className="container">
					<div className="row ">
						<div className="logo-company col-lg-12">
							<img src={this.state.logo} alt="" />
						</div>
						
						<div className=" menu  d-flex justify-content-center col-md-3 col-sm-3 col-lg-3 col-xl-3">
						<FormControl className="select-company menu-company">
							<InputLabel id="men-company">Select Company</InputLabel>
							<Select
								labelId="men-company"
								id="company"
								onChange={this.handleChange}
							>
							{this.state.companies.map(company => 
								<MenuItem key={company.id} value={company.id}>{company.name} - {company.company_currency.code}</MenuItem>
									)}
							</Select>
							</FormControl>
						</div>
					</div>
						<div className="card login col-lg-4 col-md-8 col-sm-8 px-5">
						<h3 className="text-center">Login User</h3>
						<form>
						<FormControl className="my-2" fullWidth>
						<InputLabel htmlFor="standard-adornment-amount">Username</InputLabel>
						<Input
							name="username"
									type="text"     
									value={this.state.username}  
									onChange={this.changeValue}
						/>
						</FormControl>
				
						<FormControl className="my-2" fullWidth>
						<InputLabel htmlFor="standard-adornment-amount">Password</InputLabel>
						<Input
							name="password"
									type="password"     
									value={this.state.password}  
									onChange={this.changeValue}
						/>
							</FormControl>
							
							<input type="button" value="Login" className="btn  btn-primary" onClick={()=>this.loginHandler(this.state.companyId)}/>
							<input type="button" value="Register" className="btn btn-success ml-3" onClick={this.registerPage}/>
						</form>
						</div>
				</div>

			</div>
			</>
		);
	}
}


const mapStateToProps = (state) => ({
	companyId:state.AuthReducer.company,
	userLogin:state.AuthReducer.userLogin,
	isLogin:state.AuthReducer.isLogin
 })
 
const mapDispatchToProps = (dispatch) => ({
   loginUser: (user, company) => dispatch({ type: "LOGIN", payload:user, isLogin:true,company:company  }),
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginPages));
