package com.accounting.project.accounting.restAPI;

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
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.dtoRequest.OpeningBalance.AccountLine;
import com.accounting.project.accounting.dtoRequest.OpeningBalance.OpeningBalanceRequest;
import com.accounting.project.accounting.dtoResponse.OpeningBalanceResponse;
import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.OpeningBalance;
import com.accounting.project.accounting.entity.ReversalBalance;
import com.accounting.project.accounting.entity.Transaction;
import com.accounting.project.accounting.entity.TransactionAccountLine;
import com.accounting.project.accounting.entity.TransactionNumberFormat;
import com.accounting.project.accounting.entity.TransactionStatus;
import com.accounting.project.accounting.repository.OpeningBalanceRepository;
import com.accounting.project.accounting.repository.ReversalBalanceRepository;
import com.accounting.project.accounting.repository.TransactionNumberFormatRepository;
import com.accounting.project.accounting.repository.TransactionRepository;
import com.accounting.project.accounting.repository.TransactionStatusRepository;
import com.accounting.project.accounting.repository.impl.AccountRepositoryImpl;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;
import com.accounting.project.accounting.utils.BalanceFormat;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class BalanceConversionController {

	@Autowired
	private AccountRepositoryImpl accountServices;

	@Autowired
	private TransactionNumberFormatRepository transactionFormatServices;

	@Autowired
	private CompanyRepositoryImpl companyServices;

	@Autowired
	private TransactionRepository transactionServices;

	@Autowired
	private TransactionStatusRepository transactionStatusServices;

	@Autowired
	private ReversalBalanceRepository reversalServices;

	@Autowired
	private OpeningBalanceRepository openingBalanceServices;

	@RequestMapping(value = "conversion-balance/{company_id}", method = RequestMethod.GET)
	public ResponseEntity<?> listConversionBalance(@PathVariable("company_id") int compnay_id) {
		List<Account> accounts = accountServices.getAllAccount(compnay_id);
		List<OpeningBalanceResponse> listBalances = new ArrayList<>();
		for (Account acc : accounts) {
			OpeningBalanceResponse response = new OpeningBalanceResponse();
			response.setId(acc.getId());
			response.setAccount_name(acc.getName());
			response.setCategory_name(acc.getCategory());
			response.setNumber_account(acc.getNumber_account());
			response.setCreadit(0);
			response.setDebit(0);
			listBalances.add(response);
		}

		return new ResponseEntity<>(listBalances, HttpStatus.OK);
	}

	@RequestMapping(value = "conversion-balance/{company_id}", method = RequestMethod.POST)
	public ResponseEntity<?> OpeningBalance(@PathVariable("company_id") int company_id,
			@RequestBody OpeningBalanceRequest request) {

		Company company = companyServices.findById(company_id);
		double totalDebit = 0;
		double totalCredit = 0;
		String transactionNumber = null;
		String transactionFormat = null;

//		transaction no format
//		=============================================================================================
		List<TransactionNumberFormat> transaction_no_format = transactionFormatServices
				.getTransactionByTypeId(company.getId(), 100);
		if (transaction_no_format.size() == 0) {
			TransactionNumberFormat transactionNumberFormat = new TransactionNumberFormat(company.getId(), 100, "", 100,
					"", true);

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
//		=============================================================================================

// reverse 

		List<TransactionAccountLine> reverseLine = new ArrayList<>();

		List<Account> accounts = accountServices.getAllAccount(company_id);
		for (Account account : accounts) {
			if(account.getId()!=company.getDefault_accounts().getDefault_opening_balance_equity()) {
			if (account.getBalance() != 0) {
					if (account.getBalance() < 0) {
						double debit = Math.abs(account.getBalance());
						totalDebit += debit;
						TransactionAccountLine traAccountLine = new TransactionAccountLine();
						traAccountLine = new TransactionAccountLine();
						traAccountLine.setDescription("Reversal");
						traAccountLine.setAccount_id(account.getId());
						traAccountLine.setAccount_number(account.getNumber_account());
						traAccountLine.setAccountName(account.getName());
						traAccountLine.setCredit(0);
						traAccountLine.setDebit(debit);
						traAccountLine.setCredit_currency_format(
								BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
						traAccountLine.setDebit_currency_format(
								BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), debit));
						reverseLine.add(traAccountLine);
						account.setBalance(account.getBalance() + debit);
						account.setEndBalance(account.getBalance());
						account.setBalance_ammount(BalanceFormat
								.balanceString(company.getCompany_currency().getSymbol(), account.getBalance()));
						accountServices.addAccount(account);

					} else {
						totalCredit += account.getBalance();
						TransactionAccountLine traAccountLine = new TransactionAccountLine();
						traAccountLine = new TransactionAccountLine();
						traAccountLine.setDescription("Reversal");
						traAccountLine.setAccount_id(account.getId());
						traAccountLine.setAccount_number(account.getNumber_account());
						traAccountLine.setAccountName(account.getName());
						traAccountLine.setCredit(account.getBalance());
						traAccountLine.setDebit(0);
						traAccountLine.setCredit_currency_format(BalanceFormat
								.balanceString(company.getCompany_currency().getSymbol(), account.getBalance()));
						traAccountLine.setDebit_currency_format(
								BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
						reverseLine.add(traAccountLine);
						account.setBalance(account.getBalance() - account.getBalance());
						account.setEndBalance(account.getBalance());
						account.setBalance_ammount(BalanceFormat
								.balanceString(company.getCompany_currency().getSymbol(), account.getBalance()));
						accountServices.addAccount(account);
					}
				}
			}

			}

		Account accountReverse = accountServices.findAccountById(company.getDefault_accounts().getDefault_opening_balance_equity());
			if(accountReverse.getBalance()>0)	 {
				TransactionAccountLine traAccountLine = new TransactionAccountLine();
				totalDebit += accountReverse.getBalance();
				traAccountLine.setDescription("Reversal");
				traAccountLine.setAccount_id(accountReverse.getId());
				traAccountLine.setAccount_number(accountReverse.getNumber_account());
				traAccountLine.setAccountName(accountReverse.getName());
				traAccountLine.setCredit(0);
				traAccountLine.setDebit(accountReverse.getBalance());
				traAccountLine.setCredit_currency_format(BalanceFormat
						.balanceString(company.getCompany_currency().getSymbol(), 0));
				traAccountLine.setDebit_currency_format(
						BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),accountReverse.getBalance() ));
				reverseLine.add(traAccountLine);
				accountReverse.setBalance(accountReverse.getBalance() - accountReverse.getBalance());
				accountReverse.setEndBalance(accountReverse.getBalance());
				accountReverse.setBalance_ammount(BalanceFormat
						.balanceString(company.getCompany_currency().getSymbol(), accountReverse.getBalance()));
				accountServices.addAccount(accountReverse);
			}else {
				System.out.println("statement 2 called");
				System.out.println(accountReverse.getBalance());
				double reverseBalance = Math.abs(accountReverse.getBalance());
				totalCredit += reverseBalance;
				TransactionAccountLine traAccountLine = new TransactionAccountLine();
				traAccountLine.setDescription("Reversal");
				traAccountLine.setAccount_id(accountReverse.getId());
				traAccountLine.setAccount_number(accountReverse.getNumber_account());
				traAccountLine.setAccountName(accountReverse.getName());
				traAccountLine.setCredit(reverseBalance);
				traAccountLine.setDebit(0);
				traAccountLine.setCredit_currency_format(
						BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), reverseBalance));
				traAccountLine.setDebit_currency_format(
						BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
				reverseLine.add(traAccountLine);
				accountReverse.setBalance(accountReverse.getBalance() + reverseBalance);
				accountReverse.setEndBalance(accountReverse.getBalance());
				accountReverse.setBalance_ammount(BalanceFormat
						.balanceString(company.getCompany_currency().getSymbol(), accountReverse.getBalance()));
				accountServices.addAccount(accountReverse);
				System.out.println("reverse balance "+reverseBalance);
				
			}
		
			System.out.println("total credit : "+totalCredit);
			System.out.println("total debit : "+totalDebit);
		

		if (reverseLine.size() > 0) {
			TransactionStatus transactionStatus = transactionStatusServices.getOne(1);
			ReversalBalance reversalBalance = new ReversalBalance();
			reversalBalance.setTransaction_no(transactionNumber);
			reversalBalance.setTransaction_no_format(transactionFormat);
			reversalBalance.setMemo("Reversal");
			reversalBalance.setTransaction_date(request.getTransaction_date());
			reversalBalance.setTransaction_status(transactionStatus);
			reversalBalance.setTransaction_account_lines(reverseLine);
			reversalBalance.setTotal_credit(totalCredit);
			reversalBalance.setTotal_debit(totalDebit);
			reversalBalance.setTotal_credit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalCredit));
			reversalBalance.setTotal_debit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalDebit));
			reversalBalance.setCreated_at(new Date());
			reversalBalance.setUpdated_at(null);
			reversalBalance.setCurrency_code(company.getCompany_currency().getCode());
			ReversalBalance reversalSave = reversalServices.save(reversalBalance);
			
			
			for (TransactionAccountLine transactionLine : reversalSave.getTransaction_account_lines()) {
				System.out.println(transactionLine.getAccountName());
				Transaction transaction = new Transaction();
				transaction.setAccount_id(transactionLine.getAccount_id());
				transaction.setDate(request.getTransaction_date());
				transaction.setJournal_id(0);
				transaction.setTransaction_id(reversalSave.getId());
				transaction.setTransaction_type("Reversal");
				transaction.setTransaction_no(transactionNumber);
				transaction.setTransaction_no_format(transactionFormat);
				transaction.setCredit(transactionLine.getCredit());
				transaction.setDebit(transactionLine.getDebit());
				double balance = accountServices.findAccountById(transactionLine.getAccount_id()).getBalance();
				transaction.setBalance(balance);
				transaction.setCreatedAt(new Date());
				transactionServices.save(transaction);
			}
		}
		
		// openning balance
		totalCredit = 0;
		totalDebit = 0;
		List<TransactionAccountLine> openingblanceLine = new ArrayList<>();
		for (AccountLine openingLine : request.getAccountLines()) {
			Account account = accountServices.findAccountById(openingLine.getAccount_id());
			TransactionAccountLine traAccountLine = new TransactionAccountLine();
			traAccountLine = new TransactionAccountLine();
			traAccountLine.setDescription("Openning Balance");
			traAccountLine.setAccount_id(account.getId());
			traAccountLine.setAccount_number(account.getNumber_account());
			traAccountLine.setAccountName(account.getName());
			traAccountLine.setCredit(openingLine.getCredit());
			traAccountLine.setDebit(openingLine.getDebit());
			traAccountLine.setCredit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), openingLine.getCredit()));
			traAccountLine.setDebit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), openingLine.getDebit()));
			openingblanceLine.add(traAccountLine);
			if (openingLine.getDebit() == 0) {
				account.setOpening_balance(account.getBalance() - openingLine.getCredit());
				account.setBalance(account.getBalance() - openingLine.getCredit());
				account.setEndBalance(account.getBalance());
				account.setBalance_ammount(
						BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), account.getBalance()));
				accountServices.addAccount(account);
			} else {
				account.setOpening_balance(account.getBalance() + openingLine.getCredit());
				account.setBalance(account.getBalance() + openingLine.getDebit());
				account.setEndBalance(account.getBalance());
				account.setBalance_ammount(
						BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), account.getBalance()));
				accountServices.addAccount(account);
			}
			totalDebit += openingLine.getDebit();
			totalCredit += openingLine.getCredit();
		}

		double openingBalance = totalDebit - totalCredit;
		System.out.println("total debit : "+totalDebit);
		System.out.println("total credit : "+totalCredit);
		System.out.println("sisa : "+openingBalance);
		if (openingBalance < 0) {
			totalDebit += Math.abs(openingBalance);
			int defaultOpeningBalanceAccount = company.getDefault_accounts().getDefault_opening_balance_equity();
			Account account = accountServices.findAccountById(defaultOpeningBalanceAccount);
			account.setBalance(openingBalance);
			account.setOpening_balance(openingBalance);
			account.setEndBalance(account.getBalance());
			account.setBalance_ammount(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), account.getBalance()));
			accountServices.addAccount(account);

			TransactionAccountLine traAccountLine = new TransactionAccountLine();
			traAccountLine = new TransactionAccountLine();
			traAccountLine.setDescription("Openning Balance");
			traAccountLine.setAccount_id(account.getId());
			traAccountLine.setAccount_number(account.getNumber_account());
			traAccountLine.setAccountName(account.getName());
			traAccountLine.setCredit(0);
			traAccountLine.setDebit(Math.abs(openingBalance));
			traAccountLine.setCredit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
			traAccountLine.setDebit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), Math.abs(openingBalance)));
			System.out.println("statement 1 called");
			System.out.println("opening balance "+openingBalance);
			openingblanceLine.add(traAccountLine);

		} else {
			totalCredit += openingBalance;
			int defaultOpeningBalanceAccount = company.getDefault_accounts().getDefault_opening_balance_equity();
			Account account = accountServices.findAccountById(defaultOpeningBalanceAccount);
			account.setBalance(openingBalance);
			account.setOpening_balance(openingBalance);
			account.setEndBalance(account.getBalance());
			account.setOpening_balance(openingBalance);
			account.setBalance_ammount(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), openingBalance));
			accountServices.addAccount(account);
			TransactionAccountLine traAccountLine = new TransactionAccountLine();
			traAccountLine = new TransactionAccountLine();
			traAccountLine.setDescription("Openning Balance");
			traAccountLine.setAccount_id(account.getId());
			traAccountLine.setAccount_number(account.getNumber_account());
			traAccountLine.setAccountName(account.getName());
			traAccountLine.setCredit(openingBalance);
			traAccountLine.setDebit(0);
			traAccountLine.setCredit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), openingBalance));
			traAccountLine.setDebit_currency_format(
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0));
			openingblanceLine.add(traAccountLine);
			System.out.println("statement 2 called");
			System.out.println("opening balance "+openingBalance);
		}

//		transaction no format
//		=============================================================================================
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
//		=============================================================================================

		OpeningBalance opBalance = new OpeningBalance();
		opBalance.setTransaction_no(transactionNumber);
		opBalance.setTransaction_no_format(transactionFormat);
		opBalance.setMemo("Opening Balance");
		opBalance.setTransaction_date(request.getTransaction_date());
		TransactionStatus transactionStatus = transactionStatusServices.getOne(1);
		opBalance.setTransaction_status(transactionStatus);
		opBalance.setTransaction_account_lines(openingblanceLine);
		opBalance.setTotal_credit(totalCredit);
		opBalance.setTotal_debit(totalDebit);
		opBalance.setTotal_credit_currency_format(
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalCredit));
		opBalance.setTotal_debit_currency_format(
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), totalDebit));

		opBalance.setCreated_at(new Date());
		opBalance.setUpdated_at(null);
		opBalance.setCurrency_code(company.getCompany_currency().getCode());

		OpeningBalance openingBalanceSave = openingBalanceServices.save(opBalance);

		for (TransactionAccountLine transactionLine : openingBalanceSave.getTransaction_account_lines()) {
			Transaction transaction = new Transaction();
			transaction.setAccount_id(transactionLine.getAccount_id());
			transaction.setDate(request.getTransaction_date());
			transaction.setJournal_id(0);
			transaction.setTransaction_id(openingBalanceSave.getId());
			transaction.setTransaction_type("Opening Balance");
			transaction.setTransaction_no(transactionNumber);
			transaction.setTransaction_no_format(transactionFormat);
			transaction.setDebit(transactionLine.getDebit());
			transaction.setCredit(transactionLine.getCredit());
			double balance = accountServices.findAccountById(transactionLine.getAccount_id()).getBalance();
			if (transactionLine.getAccount_id() == company.getDefault_accounts().getDefault_opening_balance_equity()) {
				if (transactionLine.getDebit() < 0) {
					transaction.setBalance(openingBalance);
				} else {
					transaction.setBalance(-openingBalance);
				}
			} else {
				transaction.setBalance(balance);

			}
			transaction.setCreatedAt(new Date());
			transactionServices.save(transaction);
		}

		return new ResponseEntity<>(null, HttpStatus.OK);
	}
}
