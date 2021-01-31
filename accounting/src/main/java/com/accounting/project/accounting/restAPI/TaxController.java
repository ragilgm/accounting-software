package com.accounting.project.accounting.restAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.repository.TaxRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class TaxController {

	@Autowired
	private TaxRepository taxServices;

	
	@RequestMapping(value = "tax", method = RequestMethod.GET)
	public ResponseEntity<?> listTax() {
		return new ResponseEntity<>(taxServices.findAll(), HttpStatus.OK);
	}
	
}
