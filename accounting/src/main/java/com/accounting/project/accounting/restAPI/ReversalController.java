package com.accounting.project.accounting.restAPI;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.dtoResponse.Reversal.ReversalResponse;
import com.accounting.project.accounting.entity.ReversalBalance;
import com.accounting.project.accounting.entity.TransactionAccountLine;
import com.accounting.project.accounting.repository.ReversalBalanceRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class ReversalController {
	
	@Autowired
	private ReversalBalanceRepository reversalServices;
	
	
	@RequestMapping(value = "/reversal/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getTransaction(@PathVariable("id") int id){
		
		ReversalBalance reversal = reversalServices.getOne(id);
		
		
		ReversalResponse response = new ReversalResponse();
		response.setId(reversal.getId());
		response.setTransaction_no(reversal.getTransaction_no());
		response.setMemo(reversal.getMemo());
		response.setTransaction_date(reversal.getTransaction_date());
		response.setTransaction_status(reversal.getTransaction_status());
		
		List<TransactionAccountLine> transactionLine = new ArrayList<>();
		
		for (TransactionAccountLine line : reversal.getTransaction_account_lines()) {
			if(line.getDescription().equals("Reversal")) {
				TransactionAccountLine transaction = new TransactionAccountLine();
				transaction.setDescription(line.getDescription());
				transaction.setDebit(line.getDebit());
				transaction.setCredit(line.getCredit());
				transaction.setCredit_currency_format(line.getCredit_currency_format());
				transaction.setDebit_currency_format(line.getDebit_currency_format());
				transaction.setAccount_id(line.getAccount_id());
				transaction.setAccountName(line.getAccountName());
				transaction.setAccount_number(line.getAccount_number());
				transactionLine.add(transaction);
			}
		}
		
		response.setTransaction_account_lines(transactionLine);
		response.setTotal_debit(reversal.getTotal_debit());
		response.setTotal_credit(reversal.getTotal_credit());
		response.setTotal_credit_currency_format(reversal.getTotal_credit_currency_format());
		response.setTotal_debit_currency_format(reversal.getTotal_debit_currency_format());
		response.setCreated_at(reversal.getCreated_at());
		response.setUpdated_at(reversal.getUpdated_at());
		response.setCurrency_code(reversal.getCurrency_code());

		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
	
	

}
