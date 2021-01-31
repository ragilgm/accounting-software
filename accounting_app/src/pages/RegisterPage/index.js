import React, { Component } from 'react';
import { withRouter } from 'react-router';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import UsersServices from '../../services/UsersServices';
import CompanyServices from '../../services/CompanyServices';
import swal from 'sweetalert'
import Input from '@material-ui/core/Input';

class RegisterPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			companyId: "",
			name:"",
			username: "",
			password: "",
			email: "",
			companies: [],
			loading:false
		}
	}

	componentDidMount() {
		this.setState({loading:true})
		CompanyServices.Companies()
			.then(res => {
				this.setState({ companies: res.data })
			
			}).finally(
				this.setState({loading:false})
			);
	}


	loginPage = () => {
		this.props.history.push("/login")
	}


	handleChange = (e) => {
		this.setState({ companyId: e.target.value })
	}
	changeValue = (e) => {
		console.log(e.target.value);
		this.setState({ [e.target.name]: e.target.value })
	}

	registerHandler = () => {
		var { name,companyId, username, password, email } = this.state
		var register = {
			"name":name,
			"username": username,
			"password": password,
			"email": email,
		}
		UsersServices.RegisterUser(companyId, register)
			.then(res => {
				swal({
					title: "Registration Successfull..",
					text:"Please Wait From Verification from admin",
					icon: "success",
				 });
				this.props.history.push("/login")
			}).catch(err => {
				swal({
					title: "Registration Failed .. :(",
					text:"Username Already Registered!",
					icon: "error",
				 });
			});
	}

	render() {
		if (this.state.loading) {
			return (
				<>
					<div id="bg-loading" className="bg-loading" >
						<div id="loading" className="loading"></div>
					</div>
				</>)
		}
		return (
				<div className="container">
			<div className="register-wrapper">
					<div className="row">
						<div className="card register col-lg-6">
							<div className="col-lg-12 text-center mb-2">
								<h3>	Register Page</h3>
							</div>
							<form>



								<div className="row">
									<div className="col-lg-12 px-5 mb-2">
										<FormControl className="select-company">
											<InputLabel id="demo-simple-select-label">Company</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												onChange={this.handleChange}
											>
												{this.state.companies.map(company =>
													<MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
												)}
											</Select>
										</FormControl>
									</div>
									<div className="col-lg-12 px-5 mb-2">

									<FormControl className="my-2" fullWidth>
										<InputLabel htmlFor="standard-adornment-amount">Full Name</InputLabel>
										<Input
											name="name"
											type="text"
											value={this.state.name}
											onChange={this.changeValue}
											/>
									</FormControl>
									</div>
									<div className="col-lg-12 px-5 mb-2">

									<FormControl className="my-2" fullWidth>
										<InputLabel htmlFor="standard-adornment-amount">Username</InputLabel>
										<Input
											name="username"
											type="text"
											value={this.state.username}
											onChange={this.changeValue}
											/>
									</FormControl>
									</div>
									<div className="col-lg-12 px-5 mb-2">

									<FormControl className="my-2" fullWidth>
										<InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
										<Input
											name="email"
											type="email"
											value={this.state.email}
											onChange={this.changeValue}
											/>
									</FormControl>
									</div>
									<div className="col-lg-12 px-5 mb-2">

									<FormControl className="my-2" fullWidth>
										<InputLabel htmlFor="standard-adornment-amount">Password</InputLabel>
										<Input
											name="password"
											type="password"
											value={this.state.password}
											onChange={this.changeValue}
											/>
									</FormControl>
									</div>
									
									<div className="col-lg-12 px-5 my-5 row">
										<div  className="col-lg-5 col-md-5 col-sm-5 col-5">
										<input type="button" value="Register" className="btn  btn-success btn-block " onClick={this.registerHandler} />
										</div>
										<div className="col-lg-5 col-md-5 col-sm-5 col-5">
										<input type="button" value="Cancel" className="btn btn-danger btn-block ml-3 " onClick={this.loginPage} />
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default withRouter(RegisterPage);
