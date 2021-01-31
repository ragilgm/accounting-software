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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.dtoResponse.account.CategoryResponse;
import com.accounting.project.accounting.dtoResponse.account.ChildrenResponse;
import com.accounting.project.accounting.dtoResponse.account.CompanyResponse;
import com.accounting.project.accounting.dtoResponse.account.SingleAccountResponse;
import com.accounting.project.accounting.dtoResponse.account.TransactionResponse;
import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.Transaction;
import com.accounting.project.accounting.repository.TransactionRepository;
import com.accounting.project.accounting.repository.impl.AccountRepositoryImpl;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;
import com.accounting.project.accounting.utils.BalanceFormat;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class TransactionController {
	
	@Autowired
	private AccountRepositoryImpl accountServices;
	
	@Autowired
	private TransactionRepository transactonServices;
	
	@Autowired
	private CompanyRepositoryImpl companyServices;
	
	
	@RequestMapping(value = "account/{account_id}/transaction", method = RequestMethod.GET)
	public ResponseEntity<?> filterTransactionByDate(@PathVariable("account_id") int account_id,
			@RequestParam("from") String from ,@RequestParam("to") String to) {
		
		System.out.println(from);
		System.out.println(to);
		
		Account account = accountServices.findAccountById(account_id);
		SingleAccountResponse response = new SingleAccountResponse();
		response.setId(	account.getId());
		response.setName(account.getName());
		response.setDescription(account.getDescription());
		response.setNumber(account.getNumber_account());
		response.setCompany_id(account.getCompany_id());
		response.setOpening_balance(String.valueOf(account.getOpening_balance()));
		response.setStart_balance(String.valueOf(account.getStart_balance()));
		response.setOpening_balance(null);
		response.setStart_balance(null);
		if(account.getParent_id()!=0) {
			
			Account parent = accountServices.findAccountById(account.getParent_id());
			if(parent!=null) {
				response.setParent_name(parent.getName());
				response.setParent_id(parent.getId());
			}
			}
		response.setTax_name(account.getDefault_company_tax_name());
		response.setCreated_at(account.getCreated_at()); 
		response.setParent_id(account.getParent_id());
		response.setIs_lock(account.isLock());
		response.setDeleted_at(account.getDelete_at());
		response.setBalance(account.getEndBalance());
		List<ChildrenResponse> listChildren = new ArrayList<>();

		List<Account> childrens = accountServices.findByParentId(account.getCompany_id(), account.getId());
		for (Account childrenAccount : childrens) {
			ChildrenResponse a = new ChildrenResponse();
			a.setId(childrenAccount.getId());
			a.setName(childrenAccount.getName());
			a.setDescription(childrenAccount.getDescription());
			a.setNumber_account(childrenAccount.getNumber_account());
			a.setLock(childrenAccount.isLock());
			a.setParent(childrenAccount.isParent());
			a.setCurrency_code(childrenAccount.getCurrency_code());
			a.setCategory(childrenAccount.getCategory());
			a.setCategory_id(childrenAccount.getCategory_id());
			a.setCompany_id(childrenAccount.getCompany_id());
			a.setTaxName(childrenAccount.getDefault_company_tax_name());
			a.setBalance(childrenAccount.getEndBalance());
			a.setBalance_ammount(childrenAccount.getBalance_ammount());
			a.setParent_id(childrenAccount.getParent_id());
			a.setCreated_at(childrenAccount.getCreated_at());
			a.setDelete_at(childrenAccount.getDelete_at());
			
			listChildren.add(a);
		}
		response.setChildren(listChildren);
		response.setBalance_string(account.getBalance_ammount());
		CategoryResponse categoryResponse = new CategoryResponse(Integer.parseInt(account.getCategory_id()),
				account.getCategory());
		response.setCategory(categoryResponse);
		Company company = companyServices.findById(account.getCompany_id());
		CompanyResponse companyResponse = new CompanyResponse(response.getCompany_id(), company.getName());
		response.setCompany(companyResponse);
		response.setCurrency_code(account.getCurrency_code());
		List<Transaction> transactions = transactonServices.getTransactionByDate(account.getId(), from, to);
	
		List<TransactionResponse> transactionResponses = new ArrayList<>();
		for (Transaction transaction : transactions) {
			TransactionResponse transactionResponse = new TransactionResponse(
					transaction.getId(), 
					transaction.getDate(), 
					transaction.getTransaction_id(),
					transaction.getJournal_id(),
					transaction.getTransaction_type(), 
					transaction.getTransaction_no(), 
					transaction.getTransaction_no_format(),
					transaction.getPerson_id(), 
					transaction.getPerson_name(), 
					transaction.getPerson_type(), 
					BalanceFormat.balanceString("", transaction.getDebit()), 
					BalanceFormat.balanceString("", transaction.getCredit()), 
					BalanceFormat.balanceString("", transaction.getBalance()));
			transactionResponses.add(transactionResponse);
		}
		
		response.setTransactions(transactionResponses);
	return new ResponseEntity<>(response, HttpStatus.OK);
		
	}
	
	

}
