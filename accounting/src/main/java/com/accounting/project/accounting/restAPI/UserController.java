package com.accounting.project.accounting.restAPI;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.dtoRequest.LoginRequsest;
import com.accounting.project.accounting.dtoRequest.user.RegisterRequest;
import com.accounting.project.accounting.dtoRequest.user.UpdateUserRequest;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.User;
import com.accounting.project.accounting.exception.ErrorDetails;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;
import com.accounting.project.accounting.repository.impl.UserRepositoryImpl;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class UserController {
	
	@Autowired
	private UserRepositoryImpl userRepo;
	
	
	@Autowired
	private CompanyRepositoryImpl companyRepo;
	
	
	@RequestMapping(value = "company/{company_id}/users", method = RequestMethod.GET)
	public ResponseEntity<?> findAllUser(@PathVariable("company_id") int company_id){
		Company list = companyRepo.findById(company_id);
		
		return new ResponseEntity<>(list.getUser(),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/company/users/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> findUserById(@PathVariable("id") int id){
		User user = userRepo.findById(id);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@RequestMapping(value = "company/{company_id}/users/register", method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@PathVariable("company_id") int company_id, @RequestBody RegisterRequest user){
		User userRegister = new User(user.getName(),user.getUsername(), user.getPassword(), user.getEmail(), "not seted", "not active", new Date(), null);

			Company company = companyRepo.findById(company_id);
			for(User u :company.getUser()) {
				if(u.getUsername().equals(user.getUsername())) {
					return new ResponseEntity<>(new ErrorDetails(new Date(), 
							"register failed", 
							"username sudah tersedia, silahkan login..."), 
					HttpStatus.BAD_REQUEST);
				}
			}
			companyRepo.addUser(company_id, userRegister);	
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@RequestMapping(value = "company/{company_id}/users/default", method = RequestMethod.POST)
	public ResponseEntity<?> createDefaultUser(@PathVariable("company_id") int company_id, @RequestBody RegisterRequest user){
		User userRegister = new User(user.getName(),user.getUsername(), user.getPassword(), user.getEmail(), "admin", "active", new Date(), null);
		
		Company company = companyRepo.findById(company_id);
		for(User u :company.getUser()) {
			if(u.getUsername().equals(user.getUsername())) {
				return new ResponseEntity<>(new ErrorDetails(new Date(), 
						"register failed", 
						"username sudah tersedia, silahkan login..."), 
						HttpStatus.BAD_REQUEST);
			}
		}
		companyRepo.addUser(company_id, userRegister);	
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	
	@RequestMapping(value = "company/{company_id}/users/login", method = RequestMethod.POST)
	public ResponseEntity<?> loginUser(@PathVariable("company_id") int company_id,@RequestBody LoginRequsest request){
		Company company = companyRepo.findById(company_id);
		List<User> listUser = company.getUser();
		User userlogin = null;
		for(User user : listUser) {
			if(user.getUsername().equals(request.getUsername()) && user.getPassword().equals(request.getPassword())) {
				userlogin = user;
			}
		}
		if(userlogin !=null) {
			if(userlogin.getActive().equals("not active")) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}else {
				return new ResponseEntity<>(userlogin,HttpStatus.OK);
			}
		}else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editUser(@PathVariable("id") int id, @RequestBody UpdateUserRequest request){
		System.out.println(request.getActive());
		User user = new User();
		System.out.println(request.getName());
		System.err.println(request.getUsername());
		System.out.println(request.getPassword());
		System.out.println(request.getActive());
		user.setName(request.getName());
		user.setUsername(request.getUsername());
		user.setPassword(request.getPassword());
		user.setEmail(request.getEmail());
		user.setRole( request.getRole());
		user.setActive(request.getActive());
		
		return new ResponseEntity<>(userRepo.editUser(id, user), HttpStatus.OK);
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable("id") int id){
		userRepo.deleteUser(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}


}
