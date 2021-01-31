package com.accounting.project.accounting.restAPI;

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

import com.accounting.project.accounting.entity.TransactionNumberFormat;
import com.accounting.project.accounting.repository.TransactionNumberFormatRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class TransactionNumberFormatController {

	@Autowired
	private TransactionNumberFormatRepository formatService;
	
	@RequestMapping(value = "company/{id}/transaction_format/{type_id}", method = RequestMethod.GET)
	public ResponseEntity<?> getListTransactionFormatWithType(@PathVariable("id") int id, @PathVariable("type_id") int type_id){
		List<TransactionNumberFormat> transactionNumberFormats = formatService.getTransactionByTypeId(id,type_id);
		return new ResponseEntity<>(transactionNumberFormats,HttpStatus.OK);
	}

	@RequestMapping(value = "company/transaction_format", method = RequestMethod.POST)
	public ResponseEntity<?> AddTransactionFormat(
			@RequestBody TransactionNumberFormat transactionNumberFormat){
		if(transactionNumberFormat.isDefaultFormat()) {
			List<TransactionNumberFormat> transactionNumberFormats = formatService.getTransactionByTypeId(transactionNumberFormat.getCompanyId(),transactionNumberFormat.getType_id());
			for (TransactionNumberFormat transaction : transactionNumberFormats) {
				transaction.setDefaultFormat(false);
			}
			formatService.saveAll(transactionNumberFormats);
		}
		TransactionNumberFormat transactionNumberFormats = formatService.save(transactionNumberFormat);
		return new ResponseEntity<>(transactionNumberFormats,HttpStatus.OK);
	}
	
	@RequestMapping(value = "company/transaction_format/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editDefaultFormat(@PathVariable("id") int id){
		TransactionNumberFormat transactionNumberFormat = formatService.getOne(id);
		
			List<TransactionNumberFormat> transactionNumberFormats = formatService.getTransactionByTypeId(transactionNumberFormat.getCompanyId(),transactionNumberFormat.getType_id());
			for (TransactionNumberFormat transaction : transactionNumberFormats) {
				transaction.setDefaultFormat(false);
			}
			formatService.saveAll(transactionNumberFormats);
		
		transactionNumberFormat.setDefaultFormat(true);
		
		return new ResponseEntity<>( formatService.save(transactionNumberFormat),HttpStatus.OK);
	}
	
	@RequestMapping(value = "company/transaction_format/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteTransactionFormat(
			@PathVariable("id") int id){
		formatService.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
