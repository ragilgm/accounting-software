package com.accounting.project.accounting.restAPI;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.dtoRequest.Account.AccountImportRequest;
import com.accounting.project.accounting.dtoRequest.Account.AccountRequest;
import com.accounting.project.accounting.dtoRequest.Account.ImportAccount;
import com.accounting.project.accounting.dtoResponse.account.AccountReponse;
import com.accounting.project.accounting.dtoResponse.account.CategoryResponse;
import com.accounting.project.accounting.dtoResponse.account.SingleAccountResponse;
import com.accounting.project.accounting.dtoResponse.account.TransactionResponse;
import com.accounting.project.accounting.dtoResponse.account.ChildrenResponse;
import com.accounting.project.accounting.dtoResponse.account.CompanyResponse;
import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.CategoryAccount;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.OpeningBalance;
import com.accounting.project.accounting.entity.Transaction;
import com.accounting.project.accounting.entity.TransactionAccountLine;
import com.accounting.project.accounting.entity.TransactionNumberFormat;
import com.accounting.project.accounting.entity.TransactionStatus;
import com.accounting.project.accounting.exception.ErrorDetails;
import com.accounting.project.accounting.repository.CategoryAccountRepository;
import com.accounting.project.accounting.repository.OpeningBalanceRepository;
import com.accounting.project.accounting.repository.TransactionNumberFormatRepository;
import com.accounting.project.accounting.repository.TransactionRepository;
import com.accounting.project.accounting.repository.TransactionStatusRepository;
import com.accounting.project.accounting.repository.impl.AccountRepositoryImpl;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;
import com.accounting.project.accounting.utils.BalanceFormat;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class AccountController {

	@Autowired
	private AccountRepositoryImpl accountServices;

	@Autowired
	private CategoryAccountRepository categoryAccountServices;

	@Autowired
	private CompanyRepositoryImpl companyServices;
	
	@Autowired
	private TransactionRepository transactionServices;
	
	@Autowired
	private TransactionNumberFormatRepository transactionFormatServices;
	
	@Autowired
	private TransactionStatusRepository transactionStatusServices;
	
	@Autowired
	private OpeningBalanceRepository openingBalanceServies;
	

	
	
	@RequestMapping(value = "company/{company_id}/account/import", method = RequestMethod.POST)
	public ResponseEntity<?> importAccount( @PathVariable("company_id") int company_id,
			@RequestBody ImportAccount request) {
		Company company = companyServices.findById(company_id);
		List<TransactionAccountLine> transactionAccountLines = new ArrayList<>();
		 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			LocalDateTime now = LocalDateTime.now();
	        String formatDateTime = now.format(formatter);
		double totalDebit = 0;
		double totalCredit = 0;
		String transactionNumber = null;
		String transactionFormat = null;
		OpeningBalance openingBalaneBalanceSave = null;
		System.out.println(request.getSetupType());	
		if(request.getSetupType().equals("import")) {
			for (AccountImportRequest listAccount : request.getData()) {
				
				Account checkAccount = accountServices.findAccountByName(company_id, listAccount.getAccountName());
				Account checkNumber = accountServices.findAccountByAccountNumber(company_id, listAccount.getAccountNumber());
				if (checkNumber == null || checkAccount==null) {

					Account account = new Account();
					account.setName(listAccount.getAccountName());
					account.setDescription(listAccount.getDescription());
					account.setNumber_account(listAccount.getAccountNumber());
					if(listAccount.getOpeningBalance()!=0) {
						account.setLock(true);
					}else {
						account.setLock(false);
					}
					account.setOpening_balance(listAccount.getOpeningBalance());
					account.setStart_balance(listAccount.getOpeningBalance());
					account.setParent(false);
					account.setCurrency_code(company.getCompany_currency().getCode());
					 CategoryAccount a = categoryAccountServices.getOne(Integer.parseInt(listAccount.getCategoryNumber()));
					if(a!=null) {
						account.setCategory(a.getCategory_name());
						account.setCategory_id(String.valueOf(a.getId()));
					}else {
						account.setCategory(null);
						account.setCategory_id(null);
					}
					account.setCompany_id(company.getId());
					account.setDefault_company_tax_name(listAccount.getDefaultTaxName());
					account.setBalance(listAccount.getOpeningBalance());
					account.setEndBalance(listAccount.getOpeningBalance());
					account.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), listAccount.getOpeningBalance()));
					if(!listAccount.getHeaderAccountNumber().equals("")){
						Account parent = accountServices.findAccountByAccountNumber(company.getId(),listAccount.getHeaderAccountNumber());
						if(parent!=null) {
							account.setParent_id(parent.getId());
							parent.setParent(true);
							parent.setParent_id(0);
							parent.setEndBalance(parent.getEndBalance()+listAccount.getOpeningBalance());
							parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
							accountServices.addAccount(parent);
						}
					
						
					}else {
						account.setParent_id(0);	
					}
				
					account.setCreated_at(new Date());
					account.setUpdated_at(null);
					account.setDelete_at(null);
					
					Account accountSave = accountServices.addAccount(account);
					
					
					if(listAccount.getOpeningBalance()!=0) {
						TransactionAccountLine transactionAccountLine = new TransactionAccountLine();
						transactionAccountLine.setDescription("Opening Balance");
						if(listAccount.getOpeningBalance()>0) {
						transactionAccountLine.setDebit(listAccount.getOpeningBalance());
						transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), listAccount.getOpeningBalance()));
						transactionAccountLine.setCredit(0);
						transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
						totalDebit+=listAccount.getOpeningBalance();
						}else {
						totalCredit+=listAccount.getOpeningBalance();
							transactionAccountLine.setCredit(listAccount.getOpeningBalance());
							transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), listAccount.getOpeningBalance()));
							transactionAccountLine.setDebit(0);
							transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
						}
						transactionAccountLine.setAccount_id(accountSave.getId());
						transactionAccountLine.setAccountName(accountSave.getName());
						transactionAccountLine.setAccount_number(accountSave.getNumber_account());
						transactionAccountLines.add(transactionAccountLine);
					}

				}
							}//end looping
			
			if (transactionAccountLines.size()>0) {
				List<TransactionNumberFormat> transaction_no_format = new ArrayList<>();
//				transaction no format
//				=============================================================================================
				transaction_no_format = transactionFormatServices.getTransactionByTypeId(company.getId(), 1);
				if (transaction_no_format.size() == 0) {
					TransactionNumberFormat transactionNumberFormat = new TransactionNumberFormat(company.getId(), 1, "", 1, "",
							true);

					TransactionNumberFormat formatSave = transactionFormatServices.save(transactionNumberFormat);
					transactionNumber = String.valueOf(formatSave.getStartNumber());
					transactionFormat = "#" + formatSave.getStartNumber();
					formatSave.setStartNumber(formatSave.getStartNumber() + 1);
					transactionFormatServices.save(formatSave);

				} else {

					transactionNumber = String.valueOf(transaction_no_format.get(0).getStartNumber());
					transactionFormat = "#" + transaction_no_format.get(0).getStartNumber();
					transaction_no_format.get(0).setStartNumber(transaction_no_format.get(0).getStartNumber() + 1);
					transactionFormatServices.save(transaction_no_format.get(0));

				}
//				=============================================================================================		
				
				double openingBalanceTotal = totalDebit-totalCredit;
				
				if (openingBalanceTotal>0) {
					Account defaultOpeningBalance = accountServices.findAccountById(company.getDefault_accounts().getDefault_opening_balance_equity());
					defaultOpeningBalance.setBalance(defaultOpeningBalance.getBalance()+openingBalanceTotal);
					defaultOpeningBalance.setEndBalance(defaultOpeningBalance.getBalance());
					defaultOpeningBalance.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), defaultOpeningBalance.getEndBalance()));	
					accountServices.addAccount(defaultOpeningBalance);
					
					TransactionAccountLine transactionAccountLine = new TransactionAccountLine();
					transactionAccountLine.setDescription("Opening Balance");
					totalCredit+=openingBalanceTotal;
					transactionAccountLine.setDebit(0);
					transactionAccountLine.setCredit(openingBalanceTotal);
					transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), openingBalanceTotal));
					transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));	
					transactionAccountLine.setAccount_id(defaultOpeningBalance.getId());
					transactionAccountLine.setAccount_number(defaultOpeningBalance.getNumber_account());
					transactionAccountLine.setAccountName(defaultOpeningBalance.getName());
					transactionAccountLines.add(transactionAccountLine);
				}else {				
					Account defaultOpeningBalance = accountServices.findAccountById(company.getDefault_accounts().getDefault_opening_balance_equity());
					defaultOpeningBalance.setBalance(defaultOpeningBalance.getBalance()-Math.abs(openingBalanceTotal));
					defaultOpeningBalance.setEndBalance(defaultOpeningBalance.getBalance());
					defaultOpeningBalance.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), defaultOpeningBalance.getEndBalance()));	
					accountServices.addAccount(defaultOpeningBalance);
					totalDebit+=Math.abs(openingBalanceTotal);
					TransactionAccountLine transactionAccountLine = new TransactionAccountLine();
					transactionAccountLine.setDescription("Opening Balance");
					
					transactionAccountLine.setDebit(Math.abs(openingBalanceTotal));
					transactionAccountLine.setCredit(0);
					transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),0 ));
					transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), Math.abs(openingBalanceTotal)));	
					transactionAccountLine.setAccount_id(defaultOpeningBalance.getId());
					transactionAccountLine.setAccount_number(defaultOpeningBalance.getNumber_account());
					transactionAccountLine.setAccountName(defaultOpeningBalance.getName());
					transactionAccountLines.add(transactionAccountLine);
				}
				OpeningBalance openingBalance = new OpeningBalance();
				openingBalance.setTransaction_no(transactionNumber);
				openingBalance.setTransaction_no_format(transactionFormat);
				openingBalance.setMemo("Opening Balance");
				openingBalance.setTransaction_date(formatDateTime);
				TransactionStatus transactionStatus = transactionStatusServices.getOne(1);
				openingBalance.setTransaction_status(transactionStatus);
				openingBalance.setTransaction_account_lines(transactionAccountLines);
				openingBalance.setTotal_credit(totalCredit);
				openingBalance.setTotal_debit(totalCredit);
				openingBalance.setTotal_credit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalCredit));
				openingBalance.setTotal_debit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalDebit));
				openingBalance.setCreated_at(new Date());
				openingBalance.setUpdated_at(null);
				openingBalance.setCurrency_code(company.getCompany_currency().getCode());
				
				 openingBalaneBalanceSave = openingBalanceServies.save(openingBalance);
				
				for (TransactionAccountLine traAccountLine : openingBalaneBalanceSave.getTransaction_account_lines()) {
					
					Transaction transaction = new Transaction();
					transaction.setDate(formatDateTime);
					transaction.setAccount_id(traAccountLine.getAccount_id());
					transaction.setTransaction_id(openingBalaneBalanceSave.getId());
					transaction.setJournal_id(0);
					transaction.setTransaction_type("Opening Balance");
					transaction.setTransaction_no(transactionNumber);
					transaction.setTransaction_no_format(transactionFormat);
					transaction.setPerson_id(null);
					transaction.setDebit(traAccountLine.getDebit());
					transaction.setCredit(traAccountLine.getCredit());
					transaction.setCreatedAt(new Date());
					double balance = accountServices.findAccountById(traAccountLine.getAccount_id()).getBalance();
					transaction.setBalance(balance);
					transactionServices.save(transaction);
				}

			}
	
		}else if(request.getSetupType().equals("reset")){
			
			List<Account> listAccountRemove = accountServices.getAllAccount(company_id);
			
			for (Account account : listAccountRemove) {
				if(account.isLock()==false && account.getBalance()==0) {
					accountServices.deleteAccount(account.getId());
				}
			}
		
			
			for (AccountImportRequest listAccount : request.getData()) {
				
				Account checkAccount = accountServices.findAccountByName(company_id, listAccount.getAccountName());
				Account checkNumber = accountServices.findAccountByAccountNumber(company_id, listAccount.getAccountNumber());
				if (checkNumber == null || checkAccount==null) {
					System.out.println(listAccount.getAccountName());
					Account account = new Account();
					account.setName(listAccount.getAccountName());
					account.setDescription(listAccount.getDescription());
					account.setNumber_account(listAccount.getAccountNumber());
					if(listAccount.getOpeningBalance()!=0) {
						account.setLock(true);
					}else {
						account.setLock(false);
					}
					account.setOpening_balance(listAccount.getOpeningBalance());
					account.setStart_balance(listAccount.getOpeningBalance());
					account.setParent(false);
					account.setCurrency_code(company.getCompany_currency().getCode());
					 CategoryAccount a = categoryAccountServices.getOne(Integer.parseInt(listAccount.getCategoryNumber()));
					if(a!=null) {
						account.setCategory(a.getCategory_name());
						account.setCategory_id(String.valueOf(a.getId()));
					}else {
						account.setCategory(null);
						account.setCategory_id(null);
					}
					account.setCompany_id(company.getId());
					account.setDefault_company_tax_name(listAccount.getDefaultTaxName());
					account.setBalance(listAccount.getOpeningBalance());
					account.setEndBalance(listAccount.getOpeningBalance());
					account.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), listAccount.getOpeningBalance()));
					if(!listAccount.getHeaderAccountNumber().equals("")){
						Account parent = accountServices.findAccountByAccountNumber(company.getId(),listAccount.getHeaderAccountNumber());
						if(parent!=null) {
							account.setParent_id(parent.getId());
							parent.setParent(true);
							parent.setParent_id(0);
							parent.setEndBalance(parent.getBalance()+listAccount.getOpeningBalance());
							parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
							accountServices.addAccount(parent);
						}
					
						
					}else {
						account.setParent_id(0);	
					}
				
					account.setCreated_at(new Date());
					account.setUpdated_at(null);
					account.setDelete_at(null);
					
					Account accountSave = accountServices.addAccount(account);
					
					
					if(listAccount.getOpeningBalance()!=0) {
						TransactionAccountLine transactionAccountLine = new TransactionAccountLine();
						transactionAccountLine.setDescription("Opening Balance");
						if(listAccount.getOpeningBalance()>0) {
						transactionAccountLine.setDebit(listAccount.getOpeningBalance());
						transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), listAccount.getOpeningBalance()));
						transactionAccountLine.setCredit(0);
						transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
						totalDebit+=listAccount.getOpeningBalance();
						}else {
						totalCredit+=listAccount.getOpeningBalance();
							transactionAccountLine.setCredit(listAccount.getOpeningBalance());
							transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), listAccount.getOpeningBalance()));
							transactionAccountLine.setDebit(0);
							transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
						}
						transactionAccountLine.setAccount_id(accountSave.getId());
						transactionAccountLine.setAccountName(accountSave.getName());
						transactionAccountLine.setAccount_number(accountSave.getNumber_account());
						transactionAccountLines.add(transactionAccountLine);
					}
				}
				
			}//end looping
			
			if (transactionAccountLines.size()>0) {
				List<TransactionNumberFormat> transaction_no_format = new ArrayList<>();
//				transaction no format
//				=============================================================================================
				transaction_no_format = transactionFormatServices.getTransactionByTypeId(company.getId(), 1);
				if (transaction_no_format.size() == 0) {
					TransactionNumberFormat transactionNumberFormat = new TransactionNumberFormat(company.getId(), 1, "", 1, "",
							true);

					TransactionNumberFormat formatSave = transactionFormatServices.save(transactionNumberFormat);
					transactionNumber = String.valueOf(formatSave.getStartNumber());
					transactionFormat = "#" + formatSave.getStartNumber();
					formatSave.setStartNumber(formatSave.getStartNumber() + 1);
					transactionFormatServices.save(formatSave);

				} else {

					transactionNumber = String.valueOf(transaction_no_format.get(0).getStartNumber());
					transactionFormat = "#" + transaction_no_format.get(0).getStartNumber();
					transaction_no_format.get(0).setStartNumber(transaction_no_format.get(0).getStartNumber() + 1);
					transactionFormatServices.save(transaction_no_format.get(0));

				}
//				=============================================================================================		
				
				double openingBalanceTotal = totalDebit-totalCredit;
				
				if (openingBalanceTotal>0) {
					Account defaultOpeningBalance = accountServices.findAccountById(company.getDefault_accounts().getDefault_opening_balance_equity());
					defaultOpeningBalance.setBalance(defaultOpeningBalance.getBalance()+openingBalanceTotal);
					defaultOpeningBalance.setEndBalance(defaultOpeningBalance.getBalance());
					defaultOpeningBalance.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), defaultOpeningBalance.getEndBalance()));	
					accountServices.addAccount(defaultOpeningBalance);
					
					TransactionAccountLine transactionAccountLine = new TransactionAccountLine();
					transactionAccountLine.setDescription("Opening Balance");
					totalCredit+=openingBalanceTotal;
					transactionAccountLine.setDebit(0);
					transactionAccountLine.setCredit(openingBalanceTotal);
					transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), openingBalanceTotal));
					transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));	
					transactionAccountLine.setAccount_id(defaultOpeningBalance.getId());
					transactionAccountLine.setAccount_number(defaultOpeningBalance.getNumber_account());
					transactionAccountLine.setAccountName(defaultOpeningBalance.getName());
					transactionAccountLines.add(transactionAccountLine);
				}else {				
					Account defaultOpeningBalance = accountServices.findAccountById(company.getDefault_accounts().getDefault_opening_balance_equity());
					defaultOpeningBalance.setBalance(defaultOpeningBalance.getBalance()-Math.abs(openingBalanceTotal));
					defaultOpeningBalance.setEndBalance(defaultOpeningBalance.getBalance());
					defaultOpeningBalance.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), defaultOpeningBalance.getEndBalance()));	
					accountServices.addAccount(defaultOpeningBalance);
					totalDebit+=Math.abs(openingBalanceTotal);
					TransactionAccountLine transactionAccountLine = new TransactionAccountLine();
					transactionAccountLine.setDescription("Opening Balance");
					
					transactionAccountLine.setDebit(Math.abs(openingBalanceTotal));
					transactionAccountLine.setCredit(0);
					transactionAccountLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),0 ));
					transactionAccountLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), Math.abs(openingBalanceTotal)));	
					transactionAccountLine.setAccount_id(defaultOpeningBalance.getId());
					transactionAccountLine.setAccount_number(defaultOpeningBalance.getNumber_account());
					transactionAccountLine.setAccountName(defaultOpeningBalance.getName());
					transactionAccountLines.add(transactionAccountLine);
				}
				OpeningBalance openingBalance = new OpeningBalance();
				openingBalance.setTransaction_no(transactionNumber);
				openingBalance.setTransaction_no_format(transactionFormat);
				openingBalance.setMemo("Opening Balance");
				openingBalance.setTransaction_date(formatDateTime);
				TransactionStatus transactionStatus = transactionStatusServices.getOne(1);
				openingBalance.setTransaction_status(transactionStatus);
				openingBalance.setTransaction_account_lines(transactionAccountLines);
				openingBalance.setTotal_credit(totalCredit);
				openingBalance.setTotal_debit(totalCredit);
				openingBalance.setTotal_credit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalCredit));
				openingBalance.setTotal_debit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalDebit));
				openingBalance.setCreated_at(new Date());
				openingBalance.setUpdated_at(null);
				openingBalance.setCurrency_code(company.getCompany_currency().getCode());
				
				 openingBalaneBalanceSave = openingBalanceServies.save(openingBalance);
				
				for (TransactionAccountLine traAccountLine : openingBalaneBalanceSave.getTransaction_account_lines()) {
					
					Transaction transaction = new Transaction();
					transaction.setDate(formatDateTime);
					transaction.setAccount_id(traAccountLine.getAccount_id());
					transaction.setTransaction_id(openingBalaneBalanceSave.getId());
					transaction.setJournal_id(0);
					transaction.setTransaction_type("Opening Balance");
					transaction.setTransaction_no(transactionNumber);
					transaction.setTransaction_no_format(transactionFormat);
					transaction.setPerson_id(null);
					transaction.setDebit(traAccountLine.getDebit());
					transaction.setCredit(traAccountLine.getCredit());
					transaction.setCreatedAt(new Date());
					double balance = accountServices.findAccountById(traAccountLine.getAccount_id()).getBalance();
					transaction.setBalance(balance);
					transactionServices.save(transaction);

				}

				
			}
			

			
		}else {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(openingBalaneBalanceSave, HttpStatus.OK);
	}
	
	

//    @CachePut(value="account_add" ,key = "#result.account_code")
	@RequestMapping(value = "/company/{company_id}/accounts", method = RequestMethod.POST)
	public ResponseEntity<?> addNewAccount(@PathVariable("company_id") int company_id,
			@RequestBody AccountRequest request) {

		Account checkAccount = accountServices.findAccountByName(company_id, request.getName());
		if (checkAccount != null) {
			return new ResponseEntity<>(
					new ErrorDetails(new Date(), "Account Name is Exist, please Choose Another Name", null),
					HttpStatus.BAD_REQUEST);
		}

		Account checkNumber = accountServices.findAccountByAccountNumber(company_id, request.getNumber());
		if (checkNumber != null) {
			return new ResponseEntity<>(
					new ErrorDetails(new Date(), "Account Number is Exist, please Choose Another Number", null),
					HttpStatus.BAD_REQUEST);
		}

		CategoryAccount category = categoryAccountServices.findByName(request.getCategory_name());
		String categoryName = category.getCategory_name();
		int categoryId = category.getId();

		Company company = companyServices.findById(company_id);

		String currencyCode = company.getCompany_currency().getCode();
		String taxName = request.getCompany_tax_name();


		DecimalFormat kurs = (DecimalFormat) DecimalFormat.getCurrencyInstance();
		DecimalFormatSymbols formatRp = new DecimalFormatSymbols();
		formatRp.setCurrencySymbol(company.getCompany_currency().getSymbol() + " ");
		formatRp.setMonetaryDecimalSeparator(',');
		formatRp.setGroupingSeparator('.');
		kurs.setDecimalFormatSymbols(formatRp);

		Account addAccount = null;

		if (request.isAs_a_parent()) {
			Account account = new Account();
			account.setName(request.getName());
			account.setDescription(request.getDescription());
			account.setNumber_account(request.getNumber());
			account.setLock(false);
			account.setOpening_balance(0);
			account.setStart_balance(0);
			account.setParent(request.isAs_a_parent());
			account.setCurrency_code(currencyCode);
			account.setCategory(categoryName);
			account.setCategory_id(String.valueOf(categoryId));
			account.setCompany_id(company_id);
			account.setBalance(0);
				account.setDefault_company_tax_name(taxName);
			
			account.setBalance_ammount(kurs.format(0));
			account.setParent_id(0);
			account.setCreated_at(new Date());
			addAccount = accountServices.addAccount(account);
			if(request.getChildren_names().size()!=0) {
				double endBalance = 0;
				for (int i = 0; i < request.getChildren_names().size(); i++) {
					System.out.println(addAccount.getId());
					Account children = accountServices.findAccountByName(company_id, request.getChildren_names().get(i));
					if(children.isParent()) {
						children.setParent(false);
						List<Account> removeChildrenAccount = accountServices.findByParentId(company_id, children.getId());
						for (Account account2 : removeChildrenAccount) {
							account2.setParent_id(0);
							accountServices.addAccount(account2);
						}
					}
					
					
					System.out.println("childrend Name" + children.getName());
					children.setParent_id(addAccount.getId());
					accountServices.addAccount(children);
					endBalance += children.getBalance();

				}
				System.out.println(endBalance);
				addAccount.setEndBalance(addAccount.getBalance() + endBalance);
				addAccount.setBalance_ammount(kurs.format(account.getEndBalance()));
				accountServices.addAccount(addAccount);
			}


		

		} else if (request.isAs_a_child()) {
			System.out.println("ischildren");
			Account parent = accountServices.findAccountByName(company_id, request.getParentName());
			parent.setParent(true);
			accountServices.addAccount(parent);
			System.out.println(parent.getId());
			Account account = new Account();
			account.setName(request.getName());
			account.setDescription(request.getDescription());
			account.setNumber_account(request.getNumber());
			account.setLock(false);
			account.setDefault_company_tax_name(taxName);
			account.setParent(request.isAs_a_parent());
			account.setCurrency_code(currencyCode);
			account.setCategory(categoryName);
			account.setOpening_balance(0);
			account.setStart_balance(0);
			account.setCategory_id(String.valueOf(categoryId));
			account.setCompany_id(company_id);
			account.setCreated_at(new Date());
			account.setBalance(0);
			account.setBalance_ammount(kurs.format(0));
			account.setParent_id(parent.getId());
			addAccount = accountServices.addAccount(account);
		} else {
			Account account = new Account();
			account.setName(request.getName());
			account.setDescription(request.getDescription());
			account.setNumber_account(request.getNumber());
			account.setLock(false);
			account.setOpening_balance(0);
			account.setStart_balance(0);
			account.setDefault_company_tax_name(taxName);
			account.setParent(request.isAs_a_parent());
			account.setCurrency_code(currencyCode);
			account.setCategory(categoryName);
			account.setCategory_id(String.valueOf(categoryId));
			account.setCompany_id(company_id);
			account.setCreated_at(new Date());
			account.setBalance(0);
			account.setBalance_ammount(kurs.format(0));
			account.setParent_id(0);
			addAccount = accountServices.addAccount(account);

		}

		SingleAccountResponse response = new SingleAccountResponse();
		response.setId(addAccount.getId());
		response.setName(addAccount.getName());
		response.setDescription(addAccount.getDescription());
		response.setNumber(addAccount.getNumber_account());
		response.setCompany_id(addAccount.getCompany_id());
		response.setOpening_balance(String.valueOf(addAccount.getOpening_balance()));
		response.setStart_balance(String.valueOf(addAccount.getStart_balance()));
		response.setTax_name(addAccount.getDefault_company_tax_name());
		response.setCreated_at(addAccount.getCreated_at());
		response.setUpdated_at(null);
		response.setIs_lock(addAccount.isLock());
		response.setBalance(addAccount.getEndBalance());
		response.setBalance_string(addAccount.getBalance_ammount());
		CategoryResponse categoryResponse = new CategoryResponse(Integer.parseInt(addAccount.getCategory_id()),
				category.getCategory_name());
		response.setCategory(categoryResponse);
		CompanyResponse companyResponse = new CompanyResponse(response.getCompany_id(), company.getName());
		response.setCompany(companyResponse);
		if(addAccount.getParent_id()!=0) {
			
		Account parent = accountServices.findAccountById(addAccount.getParent_id());
		if(parent!=null) {
			response.setParent_name(parent.getName());
			response.setParent_id(parent.getId());
		}
		}
		response.setCurrency_code(currencyCode);
		response.setTransactions(null);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
//    @CachePut(value="account_add" ,key = "#result.account_code")
	@RequestMapping(value = "/accounts/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editAccount(
			@PathVariable("id") int id,
			@RequestBody AccountRequest request) {
		
		Account checkAccount = accountServices.findAccountById(id);
		
		
		CategoryAccount category = categoryAccountServices.findByName(request.getCategory_name());
		String categoryName = category.getCategory_name();
		int categoryId = category.getId();
		
		Company company = companyServices.findById(checkAccount.getCompany_id());
		
		String currencyCode = company.getCompany_currency().getCode();
		String taxName = request.getCompany_tax_name();
		DecimalFormat kurs = (DecimalFormat) DecimalFormat.getCurrencyInstance();
		DecimalFormatSymbols formatRp = new DecimalFormatSymbols();
		formatRp.setCurrencySymbol(company.getCompany_currency().getSymbol() + " ");
		formatRp.setMonetaryDecimalSeparator(',');
		formatRp.setGroupingSeparator('.');
		kurs.setDecimalFormatSymbols(formatRp);
		
		Account addAccount = null;
		
		// parent -- true 
		if (request.isAs_a_parent() && request.getChildren_names().size()!=0) {
			checkAccount.setName(request.getName());
			checkAccount.setDescription(request.getDescription());
			checkAccount.setNumber_account(request.getNumber());
			checkAccount.setParent(request.isAs_a_parent());
			checkAccount.setCurrency_code(currencyCode);
			checkAccount.setCategory(categoryName);
			checkAccount.setDefault_company_tax_name(taxName);
			checkAccount.setUpdated_at(new Date());
			checkAccount.setParent(true);
			checkAccount.setCategory_id(String.valueOf(categoryId));
			checkAccount.setParent_id(0);
			checkAccount.setCreated_at(new Date());
			checkAccount.setBalance(0);
			addAccount = accountServices.addAccount(checkAccount);
			
			double endBalance = 0;
			for (int i = 0; i < request.getChildren_names().size(); i++) {
				System.out.println(addAccount.getId());
				Account children = accountServices.findAccountByName(checkAccount.getCompany_id(), request.getChildren_names().get(i));
				System.out.println("childrend Name" + children.getName());
				children.setParent_id(addAccount.getId());
				accountServices.addAccount(children);
				endBalance += children.getBalance();
			}
			
			System.out.println(endBalance);
			addAccount.setEndBalance(addAccount.getBalance() + endBalance);
			addAccount.setBalance_ammount(kurs.format(checkAccount.getEndBalance()));
			accountServices.addAccount(addAccount);
		
		} else if (request.isAs_a_child()) {
			if(checkAccount.getParent_id()!=0) {
				Account parent = accountServices.findAccountById(checkAccount.getParent_id());
				List<Account> listParent = accountServices.findByParentId(company.getId(), parent.getId());
				
				if(listParent.size()==1) {
					parent.setParent(false);
					parent.setEndBalance(parent.getBalance());
					parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
					accountServices.addAccount(parent);
				}
			}
			
			Account parent = accountServices.findAccountByName(checkAccount.getCompany_id(), request.getParentName());
			parent.setParent(true);
			parent.setEndBalance(parent.getEndBalance()+checkAccount.getBalance());
			parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
			accountServices.addAccount(parent);
			
			checkAccount.setName(request.getName());
			checkAccount.setDescription(request.getDescription());
			checkAccount.setNumber_account(request.getNumber());
			checkAccount.setDefault_company_tax_name(taxName);
			checkAccount.setUpdated_at(new Date());
			checkAccount.setParent(false);
			checkAccount.setParent(request.isAs_a_parent());
			checkAccount.setCurrency_code(currencyCode);
			checkAccount.setCategory(categoryName);
			checkAccount.setCategory_id(String.valueOf(categoryId));
			checkAccount.setCreated_at(new Date());
			checkAccount.setEndBalance(checkAccount.getBalance());
			checkAccount.setBalance_ammount(kurs.format(checkAccount.getEndBalance()));
			checkAccount.setParent_id(parent.getId());
			addAccount = accountServices.addAccount(checkAccount);

		} else {
			if(checkAccount.getParent_id()!=0) {
				Account parent = accountServices.findAccountById(checkAccount.getParent_id());
				List<Account> listParent = accountServices.findByParentId(company.getId(), parent.getId());
				
				if(listParent.size()==1) {
					parent.setParent(false);
					parent.setEndBalance(parent.getEndBalance()-checkAccount.getBalance());
					parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
					accountServices.addAccount(parent);
				}
			}
			checkAccount.setName(request.getName());
			checkAccount.setDescription(request.getDescription());
			checkAccount.setNumber_account(request.getNumber());
			checkAccount.setDefault_company_tax_name(taxName);
			checkAccount.setParent(request.isAs_a_parent());
			checkAccount.setCurrency_code(currencyCode);
			checkAccount.setCategory(categoryName);
			checkAccount.setParent(false);
			checkAccount.setUpdated_at(new Date());
			checkAccount.setCategory_id(String.valueOf(categoryId));
			checkAccount.setCreated_at(new Date());
			checkAccount.setEndBalance(checkAccount.getBalance());
			checkAccount.setBalance_ammount(kurs.format(checkAccount.getEndBalance()));

			checkAccount.setParent_id(0);
			addAccount = accountServices.addAccount(checkAccount);
			List<Account> removeParentAccount = accountServices.findByParentId(checkAccount.getCompany_id(), checkAccount.getId());
			System.out.println(removeParentAccount.size());		
			System.out.println(checkAccount.getCompany_id());
			System.out.println(checkAccount.getId());
			for(Account ac : removeParentAccount) {
					System.out.println(ac.getParent_id());
					ac.setParent_id(0);
					accountServices.addAccount(ac);
				}
			
		}
		SingleAccountResponse response = new SingleAccountResponse();
		response.setId(addAccount.getId());
		response.setName(addAccount.getName());
		response.setDescription(addAccount.getDescription());
		response.setNumber(addAccount.getNumber_account());
		response.setCompany_id(addAccount.getCompany_id());
		response.setOpening_balance(String.valueOf(addAccount.getOpening_balance()));
		response.setStart_balance(String.valueOf(addAccount.getOpening_balance()));
		response.setIs_lock(addAccount.isLock());
		response.setCreated_at(addAccount.getCreated_at());
		response.setUpdated_at(null);
		response.setTax_name(addAccount.getDefault_company_tax_name());
		response.setBalance(addAccount.getEndBalance());
		response.setBalance_string(addAccount.getBalance_ammount());
		CategoryResponse categoryResponse = new CategoryResponse(Integer.parseInt(addAccount.getCategory_id()),
				category.getCategory_name());
		response.setCategory(categoryResponse);
		CompanyResponse companyResponse = new CompanyResponse(response.getCompany_id(), company.getName());
		response.setCompany(companyResponse);
		if(addAccount.getParent_id()!=0) {
			
		Account parent = accountServices.findAccountById(addAccount.getParent_id());
		if(parent!=null) {
			response.setParent_name(parent.getName());
			response.setParent_id(parent.getId());
		}
		}
		response.setCurrency_code(currencyCode);
		
		List<Transaction> transactions = transactionServices.getListTransactionByAccountId(addAccount.getId());
		List<TransactionResponse> transactionResponses = new ArrayList<>();
		for (Transaction transaction : transactions) {
			TransactionResponse transactionResponse = new TransactionResponse(
					transaction.getDate(), 
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


	@RequestMapping(value = "company/{company_id}/accounts", method = RequestMethod.GET)
	public ResponseEntity<?> listAccount(@PathVariable("company_id") int company_id) {
		List<Account> accounts = accountServices.getAllAccount(company_id);
		List<AccountReponse> response = new ArrayList<>();
		for (Account account : accounts) {
			if (account.isParent()) {
				AccountReponse res = new AccountReponse();
				res.setId(account.getId());
				res.setName(account.getName());
				res.setDescription(account.getDescription());
				res.setNumber_account(account.getNumber_account());
				res.setLock(account.isLock());
				res.setIs_parennt(account.isParent());
				res.setCurrency_code(account.getCurrency_code());
				res.setCategory(account.getCategory());
				res.setCategory_id(account.getCategory_id());
				res.setCompany_id(account.getCompany_id());
				res.setBalance(account.getBalance());	
				res.setTaxName(account.getDefault_company_tax_name());
				res.setBalance_ammount(account.getBalance_ammount());
				res.setParent_id(account.getParent_id());
				res.setCreated_at(account.getCreated_at());
				res.setDelete_at(account.getDelete_at());

				List<ChildrenResponse> listChildren = new ArrayList<>();

				List<Account> childrens = accountServices.findByParentId(company_id, res.getId());
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

				res.setChildren(listChildren);
				response.add(res);
			} else if (account.isParent() == false && account.getParent_id() == 0) {
				AccountReponse res = new AccountReponse();
				res.setId(account.getId());
				res.setName(account.getName());
				res.setDescription(account.getDescription());
				res.setNumber_account(account.getNumber_account());
				res.setLock(account.isLock());
				res.setIs_parennt(account.isParent());
				res.setTaxName(account.getDefault_company_tax_name());
				res.setCurrency_code(account.getCurrency_code());
				res.setCategory(account.getCategory());
				res.setCategory_id(account.getCategory_id());
				res.setCompany_id(account.getCompany_id());
				res.setBalance(account.getBalance());
				res.setBalance_ammount(account.getBalance_ammount());
				res.setParent_id(account.getParent_id());
				res.setCreated_at(account.getCreated_at());
				res.setDelete_at(account.getDelete_at());
				res.setChildren(null);
				response.add(res);
			}

		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
//  @CacheEvict(value="account_delete",key = "#account_id")
	@RequestMapping(value = "/company/{company_id}/accounts/search", method = RequestMethod.GET)
	public List<Account> seachAccount(@PathVariable(value = "company_id") int company_id, @RequestParam(value = "q") String q) {
		List<Account> list = accountServices.seachAccount(q);
		List<Account> response = new ArrayList<>();
		for(Account ac : list) {
			if(ac.getCompany_id()==company_id) {
				response.add(ac);
			}
		}
		return response;
	}
	
//  @CacheEvict(value="account_delete",key = "#account_id")
	@RequestMapping(value = "/company/{company_id}/accounts/category", method = RequestMethod.GET)
	public ResponseEntity<?> findAccountByCategoryName(@PathVariable(value = "company_id") int company_id, @RequestParam(value = "category_name") String category_name) {
		List<Account> list = accountServices.findByCategoryName(company_id,category_name);
		List<AccountReponse> response = new ArrayList<>();
		for (Account account : list) {
			if (account.isParent()) {
				AccountReponse res = new AccountReponse();
				res.setId(account.getId());
				res.setName(account.getName());
				res.setDescription(account.getDescription());
				res.setNumber_account(account.getNumber_account());
				res.setLock(account.isLock());
				res.setIs_parennt(account.isParent());
				res.setCurrency_code(account.getCurrency_code());
				res.setCategory(account.getCategory());
				res.setCategory_id(account.getCategory_id());
				res.setCompany_id(account.getCompany_id());
				res.setBalance(account.getBalance());	
				res.setTaxName(account.getDefault_company_tax_name());
				res.setBalance_ammount(account.getBalance_ammount());
				res.setParent_id(account.getParent_id());
				res.setCreated_at(account.getCreated_at());
				res.setDelete_at(account.getDelete_at());

				List<ChildrenResponse> listChildren = new ArrayList<>();

				List<Account> childrens = accountServices.findByParentId(company_id, res.getId());
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

				res.setChildren(listChildren);
				response.add(res);
			} else if (account.isParent() == false && account.getParent_id() == 0) {
				AccountReponse res = new AccountReponse();
				res.setId(account.getId());
				res.setName(account.getName());
				res.setDescription(account.getDescription());
				res.setNumber_account(account.getNumber_account());
				res.setLock(account.isLock());
				res.setIs_parennt(account.isParent());
				res.setTaxName(account.getDefault_company_tax_name());
				res.setCurrency_code(account.getCurrency_code());
				res.setCategory(account.getCategory());
				res.setCategory_id(account.getCategory_id());
				res.setCompany_id(account.getCompany_id());
				res.setBalance(account.getBalance());
				res.setBalance_ammount(account.getBalance_ammount());
				res.setParent_id(account.getParent_id());
				res.setCreated_at(account.getCreated_at());
				res.setDelete_at(account.getDelete_at());
				res.setChildren(null);
				response.add(res);
			}

		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
//  @CacheEvict(value="account_delete",key = "#account_id")
	@RequestMapping(value = "/company/{company_id}/accounts/category_id/{category_id}", method = RequestMethod.GET)
	public ResponseEntity<?> findAccountByCategoryId(@PathVariable(value = "company_id") int company_id, @PathVariable("category_id") String category_id) {
		List<Account> list = accountServices.findByCategoryId(company_id,category_id);
		List<AccountReponse> response = new ArrayList<>();
		for (Account account : list) {
			if (account.isParent()) {
				AccountReponse res = new AccountReponse();
				res.setId(account.getId());
				res.setName(account.getName());
				res.setDescription(account.getDescription());
				res.setNumber_account(account.getNumber_account());
				res.setLock(account.isLock());
				res.setIs_parennt(account.isParent());
				res.setCurrency_code(account.getCurrency_code());
				res.setCategory(account.getCategory());
				res.setCategory_id(account.getCategory_id());
				res.setCompany_id(account.getCompany_id());
				res.setBalance(account.getBalance());	
				res.setTaxName(account.getDefault_company_tax_name());
				res.setBalance_ammount(account.getBalance_ammount());
				res.setParent_id(account.getParent_id());
				res.setCreated_at(account.getCreated_at());
				res.setDelete_at(account.getDelete_at());

				List<ChildrenResponse> listChildren = new ArrayList<>();

				List<Account> childrens = accountServices.findByParentId(company_id, res.getId());
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

				res.setChildren(listChildren);
				response.add(res);
			} else if (account.isParent() == false && account.getParent_id() == 0) {
				AccountReponse res = new AccountReponse();
				res.setId(account.getId());
				res.setName(account.getName());
				res.setDescription(account.getDescription());
				res.setNumber_account(account.getNumber_account());
				res.setLock(account.isLock());
				res.setIs_parennt(account.isParent());
				res.setTaxName(account.getDefault_company_tax_name());
				res.setCurrency_code(account.getCurrency_code());
				res.setCategory(account.getCategory());
				res.setCategory_id(account.getCategory_id());
				res.setCompany_id(account.getCompany_id());
				res.setBalance(account.getBalance());
				res.setBalance_ammount(account.getBalance_ammount());
				res.setParent_id(account.getParent_id());
				res.setCreated_at(account.getCreated_at());
				res.setDelete_at(account.getDelete_at());
				res.setChildren(null);
				response.add(res);
			}

		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
//  @CacheEvict(value="account_delete",key = "#account_id")
	@RequestMapping(value = "/accounts/{id}", method = RequestMethod.DELETE)
	public void deleteAccount( @PathVariable("id") int id) {
		accountServices.deleteAccount(id);
	}
	
	@RequestMapping(value = "/company/{company_id}/listAccount", method = RequestMethod.GET)
	public List<Account> getlistAccount(@PathVariable("company_id") int company_id){
		return accountServices.getAllAccount(company_id);
	}

//	@Cacheable(value = "account_id", key = "#account_id")
	@RequestMapping(value = "/accounts/{account_id}", method = RequestMethod.GET)
	public SingleAccountResponse getAccountById(
			@PathVariable("account_id") int account_id) {
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
			List<Transaction> transactions = transactionServices.getListTransactionByAccountId(account.getId());
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
			
		return response;
	}
//
//	@Cacheable(value = "account_code", key = "#code")
//	@RequestMapping(value = "company/{company_id}/category_account/code/{code}/account", method = RequestMethod.GET)
//	public List<AccountResponse> getAccountByCategoryCode(@PathVariable("company_id") int company_id,
//			@PathVariable("code") String code) {
//		System.out.println("dari database");
//		Company company = companyServices.findById(company_id);
//		List<CategoryAccount> listcategoryAccount = company.getCategoryAccounts();
//		List<AccountResponse> listAccount = new ArrayList<>();
//		for (CategoryAccount category : listcategoryAccount) {
//			if (category.getCode().equals(code)) {
//				for (Account acc : category.getAccount()) {
//					AccountResponse accountResponse = new AccountResponse(acc.getId(), acc.getAccount_default(),
//							acc.getLocked(), 
//							acc.getAccount_code(),
//							acc.getAccount_name(), 
//							acc.getDetail(), 
//							acc.getBalance(),
//							acc.getTax(),
//							acc.getDescription());
//					listAccount.add(accountResponse);
//				}
//			}
//		}
//
//		return listAccount;
//	}
//
//	@Cacheable(value = "account_code", key = "#category_id")
//	@RequestMapping(value = "company/{company_id}/category_account/id/{category_id}/account", method = RequestMethod.GET)
//	public List<AccountResponse> getAccountByCategoryId(@PathVariable("company_id") int company_id,
//			@PathVariable(value = "category_id") int category_id) {
//		Company company = companyServices.findById(company_id);
//		List<CategoryAccount> listcategoryAccount = company.getCategoryAccounts();
//		List<AccountResponse> listAccount = new ArrayList<>();
//		for (CategoryAccount category : listcategoryAccount) {
//			if (category.getId() == category_id) {
//				for (Account acc : category.getAccount()) {
//					AccountResponse accountResponse = new AccountResponse(acc.getId(), acc.getAccount_default(),
//							acc.getLocked(), 
//							acc.getAccount_code(),
//							acc.getAccount_name(), 
//							acc.getDetail(), 
//							acc.getBalance(),
//							acc.getTax(),
//							acc.getDescription());
//					listAccount.add(accountResponse);
//				}
//			}
//		}
//
//		return listAccount;
//	}
//
//	@Cacheable(value = "account_detail", key = "#detail")
//	@RequestMapping(value = "company/{company_id}/account/detail/{detail}", method = RequestMethod.GET)
//	public List<AccountResponse> getAccountByDetail(@PathVariable("company_id") int company_id,
//			@PathVariable(value = "detail") String detail) {
//		Company company = companyServices.findById(company_id);
//		List<AccountResponse> listAccount = new ArrayList<>();
//		for (Account acc : company.getAccount()) {
//			System.out.println(acc.getDetail());
//			if (acc.getDetail().equals(detail)) {
//				AccountResponse accountResponse = new AccountResponse(acc.getId(), acc.getAccount_default(),
//						acc.getLocked(), 
//						acc.getAccount_code(),
//						acc.getAccount_name(), 
//						acc.getDetail(), 
//						acc.getBalance(),
//						acc.getTax(),
//						acc.getDescription());
//
//				listAccount.add(accountResponse);
//			}
//		}
//
//		return listAccount;
//	}
//

//
//    @CacheEvict(value="account_delete",key = "#account_id")
//	@RequestMapping(value = "company/account/{account_id}", method = RequestMethod.DELETE)
//	public void deleteAccount(@PathVariable(value = "account_id") int account_id) {
//		dao.deleteAccount(account_id);
//	}

}
