package com.accounting.project.accounting.restAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.entity.OpeningBalance;

import com.accounting.project.accounting.repository.OpeningBalanceRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class OpeningBalanceController {
	
	@Autowired
	private OpeningBalanceRepository openingBalanceServices;
	
	
	@RequestMapping(value = "/opening_balance/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getTransaction(@PathVariable("id") int id){
		
		OpeningBalance openingBalance = openingBalanceServices.getOne(id);
		
		return new ResponseEntity<>(openingBalance, HttpStatus.OK);
	}
	
	
	
	

}
