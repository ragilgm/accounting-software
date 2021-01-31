package com.accounting.project.accounting.restAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.repository.TerminatedRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class InvoiceTermController {
	
	@Autowired
	private TerminatedRepository terminrepository;
	
	
	@RequestMapping(value = "terms/{company_id}", method = RequestMethod.GET)
	public ResponseEntity<?> listTerm(@PathVariable("company_id") int company_id){
		return new ResponseEntity<>(terminrepository.findAllTermin(company_id), HttpStatus.OK);
	}
	
	

}
