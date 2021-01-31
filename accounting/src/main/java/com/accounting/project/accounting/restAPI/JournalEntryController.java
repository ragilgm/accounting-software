package com.accounting.project.accounting.restAPI;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.accounting.project.accounting.dtoRequest.JournalEntry.JournalImportLine;
import com.accounting.project.accounting.dtoRequest.JournalEntry.JournalImportRequest;
import com.accounting.project.accounting.dtoRequest.JournalEntry.JournalEntryRequest;
import com.accounting.project.accounting.dtoRequest.JournalEntry.TransactionLineRequest;
import com.accounting.project.accounting.dtoResponse.JournalEntry.JournalEntryResponse;
import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.JournalEntry;
import com.accounting.project.accounting.entity.Transaction;
import com.accounting.project.accounting.entity.TransactionAccountLine;
import com.accounting.project.accounting.entity.TransactionNumberFormat;
import com.accounting.project.accounting.entity.TransactionStatus;
import com.accounting.project.accounting.repository.TransactionNumberFormatRepository;
import com.accounting.project.accounting.repository.TransactionRepository;
import com.accounting.project.accounting.repository.TransactionStatusRepository;
import com.accounting.project.accounting.repository.impl.AccountRepositoryImpl;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;
import com.accounting.project.accounting.repository.impl.JournalEntryRepositoryImpl;
import com.accounting.project.accounting.utils.BalanceFormat;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class JournalEntryController {

	@Autowired
	private JournalEntryRepositoryImpl journalServices;
	
	@Autowired
	private AccountRepositoryImpl accountServices;
	
	@Autowired
	private TransactionRepository transactionServices;
	
	@Autowired
	private TransactionNumberFormatRepository numberFormatServices;
	
	@Autowired
	private TransactionStatusRepository transactionStatusServices;

	@Autowired
	private CompanyRepositoryImpl companyServices;
	
	
	@RequestMapping(value = "journal-entry/transaction-id/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getGeneralEntryByTransaction(@PathVariable("id") int id){
		
		JournalEntry journalEntry =  journalServices.findById(id);
		
		JournalEntryResponse response = new JournalEntryResponse();
		response.setId(journalEntry.getId());
		response.setTransaction_no(journalEntry.getTransaction_no());
		response.setTransaction_no_format(journalEntry.getTransaction_no_format());
		response.setMemo(journalEntry.getMemo());
		response.setTransaction_date(journalEntry.getTransaction_date());
		
		TransactionStatus transactionStatus = transactionStatusServices.getOne(journalEntry.getTransaction_status_id());
		
		response.setTransaction_status(transactionStatus);
		response.setTransaction_account_lines(journalEntry.getTransaction_account_lines());
		response.setTotal_credit(journalEntry.getTotal_debit());
		response.setTotal_debit(journalEntry.getTotal_debit());
		response.setTotal_credit_currency_format(journalEntry.getTotal_credit_currency_format());
		response.setTotal_debit_currency_format(journalEntry.getTotal_debit_currency_format());
		response.setAttachments(journalEntry.getAttachments());
		response.setLocked(journalEntry.isLocked());
		response.setReconciled(journalEntry.isReconciled());
		response.setCreated_at(journalEntry.getCreated_at());
		response.setUpdated_at(journalEntry.getUpdated_at());
		response.setCurrency_code(journalEntry.getCurrency_code());
		response.setCurrency_rate(journalEntry.getCurrency_rate());
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "journal-entry/import", method = RequestMethod.POST)
	public ResponseEntity<?> importJournalEntry(@RequestBody List<JournalImportRequest> request){
		
		List<JournalEntry> journalEntryResponse = new ArrayList<>();
		
		for (JournalImportRequest journalImportRequest : request) {
			
			Company company = companyServices.findById(journalImportRequest.getCompany_id());
			
			 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				LocalDateTime now = LocalDateTime.now();
		        String formatDateTime = now.format(formatter);
			
			List<TransactionAccountLine> transactionAccountLines = new ArrayList<>();			
			for (JournalImportLine transactionAccountLine : journalImportRequest.getTransaction_lines()) {
				TransactionAccountLine trxLine = new TransactionAccountLine();
				trxLine.setDebit(transactionAccountLine.getDebit());
				trxLine.setCredit(transactionAccountLine.getCredit());
				trxLine.setCredit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), transactionAccountLine.getCredit()));
				trxLine.setDebit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), transactionAccountLine.getDebit()));
				
				Account account_number = accountServices.findAccountByAccountNumber(company.getId(),transactionAccountLine.getAccountNumber() );
				
				trxLine.setAccount_id(account_number.getId());
				trxLine.setAccountName(account_number.getName());
				trxLine.setAccount_number(account_number.getNumber_account());
				transactionAccountLines.add(trxLine);

			}
			
			String transactionNumber = journalImportRequest.getTransaction_lines().get(0).getTransactionNumber();
			
			JournalEntry journalEntry = new JournalEntry();
			journalEntry.setTransaction_no(transactionNumber);
			journalEntry.setTransaction_no_format("#"+transactionNumber);
			journalEntry.setMemo(journalImportRequest.getMemo());
			journalEntry.setTransaction_date(formatDateTime);
			journalEntry.setTransaction_status_id(1);
			journalEntry.setTransaction_account_lines(transactionAccountLines);
			journalEntry.setTotal_credit(journalImportRequest.getTotalCredit());
			journalEntry.setTotal_debit(journalImportRequest.getTotalDebit());
			journalEntry.setTotal_credit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), journalImportRequest.getTotalCredit()));
			journalEntry.setTotal_debit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),journalImportRequest.getTotalDebit()));
			journalEntry.setAttachments(null);
			journalEntry.setLocked(false);
			journalEntry.setReconciled(false);
			journalEntry.setCreated_at(new Date());
			journalEntry.setUpdated_at(null);
			journalEntry.setCurrency_code(company.getCompany_currency().getCode());
			journalEntry.setCurrency_rate(0);
			
			JournalEntry journalEntrySave = journalServices.save(journalEntry);
			journalEntryResponse.add(journalEntrySave);

			for (TransactionAccountLine transaction : journalEntrySave.getTransaction_account_lines()) {
				Account accountLine = accountServices.findAccountById(transaction.getAccount_id());
				Account parent = null;
				if(accountLine.getParent_id()!=0) {
					System.out.println("account have parent");
					parent = accountServices.findAccountById(accountLine.getParent_id());
				}
				if(transaction.getDebit()==0) {
					System.out.println("credit called");
					accountLine.setBalance(accountLine.getBalance()-transaction.getCredit());
					accountLine.setEndBalance(accountLine.getEndBalance()-transaction.getCredit());
					accountLine.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),accountLine.getEndBalance()));
					if(parent!=null) {
					parent.setEndBalance(parent.getEndBalance()-transaction.getCredit());
					parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
					}

				}else {
					System.out.println("debit called");
					accountLine.setBalance(accountLine.getBalance()+transaction.getDebit());
					accountLine.setEndBalance(accountLine.getEndBalance()+transaction.getDebit());
					accountLine.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),accountLine.getEndBalance()));
					if(parent!=null) {
					parent.setEndBalance(parent.getEndBalance()+transaction.getDebit());
					parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
					}
				
				}
				Account accountSave = accountServices.addAccount(accountLine);
				if(parent!=null) {
					accountServices.addAccount(parent);
				}
				Transaction transactionAccount = new Transaction(
				journalEntrySave.getTransaction_date(), 
				accountLine.getId(), 
				journalEntrySave.getId(),
				journalEntrySave.getId(),
				"Journal Entry", 
				transactionNumber, 
				"#"+transactionNumber,
				null, 
				null, 
				null, 
				transaction.getDebit(), 
				transaction.getCredit(), 
				accountSave.getEndBalance(), 
				new Date());
				transactionServices.save(transactionAccount);
			}

		}

		return new ResponseEntity<>(journalEntryResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "journal-entry", method = RequestMethod.POST)
	public ResponseEntity<?> addNewTransaction(@RequestBody JournalEntryRequest request){
		
	Company company = companyServices.findById(request.getCompany_id());
		
		String transactionNumber= null;
		String transactionFormatNumber = null;
		
		
		if(request.getTransaction_no()==null && request.getTransaction_number_format()==null) {
			System.out.println("called");
			TransactionNumberFormat transactionNumberFormat = new TransactionNumberFormat(
					request.getCompany_id(), 
					1, 
					"", 
					1001, 
					"", 
					true);
			TransactionNumberFormat format = numberFormatServices.save(transactionNumberFormat);
			transactionFormatNumber = "#"+format.getStartInvoice()+format.getStartNumber()+format.getEndInvoice();
			transactionNumber = String.valueOf(format.getStartNumber());
			format.setStartNumber(format.getStartNumber()+1);
			numberFormatServices.save(format);
		}
		if(request.getTransaction_number_format()!=null) {
			System.out.println("called 1");
			TransactionNumberFormat format = numberFormatServices.getOne(Integer.parseInt(request.getTransaction_number_format()));
			transactionFormatNumber = "#"+format.getStartInvoice()+format.getStartNumber()+format.getEndInvoice();
			transactionNumber = String.valueOf(format.getStartNumber());
			format.setStartNumber(format.getStartNumber()+1);
			System.out.println(transactionNumber);
			numberFormatServices.save(format);
		}
		if(request.getTransaction_no()!=null){
			System.out.println("called 2");
			transactionFormatNumber = "#"+request.getTransaction_no();
			transactionNumber = request.getTransaction_no();
		}
		
		List<TransactionAccountLine> transaction_account_lines = new ArrayList<>();
		double totalDebit=0;
		double totalCredit=0;
		for (TransactionLineRequest transaction : request.getTransaction_lines()) {
			Account accountLine = accountServices.findAccountById(transaction.getAccount_id());
			TransactionAccountLine trxLine = new TransactionAccountLine(
					transaction.getDescription(), 
					transaction.getDebit(), 
					transaction.getCredit(), 
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),transaction.getCredit()), 
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), transaction.getDebit()), 
					accountLine.getId(), 
					accountLine.getName(), 
					accountLine.getNumber_account());
			totalDebit+=transaction.getDebit();
			totalCredit+=transaction.getCredit();
			transaction_account_lines.add(trxLine);
		}
				
		JournalEntry journalEntry = new JournalEntry(
				transactionNumber, 
				transactionFormatNumber,
				request.getMemo(), 
				request.getTransaction_date(), 
				1, 
				transaction_account_lines, 
				totalDebit, 
				totalCredit, 
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),totalDebit), 
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),totalCredit), 
				null, 
				false, 
				false, 
				new Date(), 
				null, 
				company.getCompany_currency().getCode(), 
				1);
		
		JournalEntry joEntry = journalServices.save(journalEntry);
		
		
		for (TransactionLineRequest transaction : request.getTransaction_lines()) {
			Account accountLine = accountServices.findAccountById(transaction.getAccount_id());
			Account parent = null;
			if(accountLine.getParent_id()!=0) {
				System.out.println("account have parent");
				parent = accountServices.findAccountById(accountLine.getParent_id());
			}
			if(transaction.getDebit()==0) {
				System.out.println("credit called");
				accountLine.setBalance(accountLine.getBalance()-transaction.getCredit());
				accountLine.setEndBalance(accountLine.getEndBalance()-transaction.getCredit());
				accountLine.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),accountLine.getEndBalance()));
				if(parent!=null) {
				parent.setEndBalance(parent.getEndBalance()-transaction.getCredit());
				parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
				}

			}else {
				System.out.println("debit called");
				accountLine.setBalance(accountLine.getBalance()+transaction.getDebit());
				accountLine.setEndBalance(accountLine.getEndBalance()+transaction.getDebit());
				accountLine.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),accountLine.getEndBalance()));
				if(parent!=null) {
				parent.setEndBalance(parent.getEndBalance()+transaction.getDebit());
				parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
				}
			
			}
			Account accountSave = accountServices.addAccount(accountLine);
			if(parent!=null) {
				accountServices.addAccount(parent);
			}
			Transaction transactionAccount = new Transaction(
			request.getTransaction_date(), 
			accountLine.getId(), 
			joEntry.getId(),
			joEntry.getId(),
			"Journal Entry", 
			transactionNumber, 
			transactionFormatNumber,
			null, 
			null, 
			null, 
			transaction.getDebit(), 
			transaction.getCredit(), 
			accountSave.getEndBalance(), 
			new Date());
			transactionServices.save(transactionAccount);
		}
		
		return new ResponseEntity<>(joEntry, HttpStatus.OK);
	}
	@RequestMapping(value = "journal-entry/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editJournalEntry(@PathVariable("id") int id, @RequestBody JournalEntryRequest request){
		System.out.println(request.getTransaction_no());
		Company company = companyServices.findById(request.getCompany_id());

		String transactionNumber= null;
		String transactionFormatNumber = null;
		
			transactionFormatNumber = "#"+request.getTransaction_number_format();
			transactionNumber = request.getTransaction_no();
					
		List<TransactionAccountLine> transaction_account_lines = new ArrayList<>();
		double totalDebit=0;
		double totalCredit=0;
		
		for (TransactionLineRequest transaction : request.getTransaction_lines()) {
			Account accountLine = accountServices.findAccountById(transaction.getAccount_id());
			TransactionAccountLine trxLine = new TransactionAccountLine(
					transaction.getDescription(), 
					transaction.getDebit(), 
					transaction.getCredit(), 
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),transaction.getCredit()), 
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), transaction.getDebit()), 
					accountLine.getId(), 
					accountLine.getName(), 
					accountLine.getNumber_account());
			totalDebit+=transaction.getDebit();
			totalCredit+=transaction.getCredit();
			transaction_account_lines.add(trxLine);
		}
		
		JournalEntry journalEntry = journalServices.findById(id);
		journalEntry.setTransaction_no(transactionNumber);
		journalEntry.setTransaction_no_format(transactionFormatNumber);
		journalEntry.setMemo(request.getMemo());
		journalEntry.setTransaction_date(request.getTransaction_date());
		journalEntry.setTransaction_status_id(1);
		journalEntry.setTransaction_account_lines(transaction_account_lines);
		journalEntry.setTotal_credit(totalCredit);
		journalEntry.setTotal_debit(totalDebit);
		journalEntry.setTotal_credit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),totalCredit));
		journalEntry.setTotal_debit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),totalCredit));
		journalEntry.setUpdated_at(new Date());
		
		JournalEntry joEntry = journalServices.save(journalEntry);
		
		List<Transaction> deleteTransaction = transactionServices.getTransactionByJournalId(joEntry.getId());
		 for (Transaction trx : deleteTransaction) {
			 System.out.println("old debit : "+trx.getDebit());
			 System.out.println("old credit : "+trx.getCredit());
			 System.out.println("total : "+(trx.getDebit()-trx.getCredit()));
			 
			 double total = (trx.getDebit()-trx.getCredit());

			 Account account = accountServices.findAccountById(trx.getAccount_id());
			 
			 if(total>0) {
				 account.setBalance(account.getBalance()-total);
			 }else {
				 account.setBalance(account.getBalance()+Math.abs(total));
			 }
			 
	
			 account.setEndBalance(account.getBalance());
			 account.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),account.getEndBalance()));
			 Account acc = accountServices.addAccount(account);
			 System.out.println(acc.getName());
			 System.out.println(acc.getBalance());
			 System.out.println(acc.getEndBalance());
				if(account.getParent_id()!=0) {
					 Account parent = accountServices.findAccountById(account.getParent_id());
					 if(total>0) {
						 parent.setEndBalance(parent.getEndBalance()-total); 
					 }else {
						 parent.setEndBalance(parent.getEndBalance()+Math.abs(total));
					 }
					
						parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
						accountServices.addAccount(parent);
				}
		}
		 
		for (TransactionLineRequest transaction : request.getTransaction_lines()) {
			Account accountLine = accountServices.findAccountById(transaction.getAccount_id());
			Account parent = null;
			if(accountLine.getParent_id()!=0) {
				parent = accountServices.findAccountById(accountLine.getParent_id());
			}
			
			double totaltrx = transaction.getDebit()-transaction.getCredit();	
			if(totaltrx>0) {
				accountLine.setBalance(accountLine.getBalance()+totaltrx);	
			}else {
				accountLine.setBalance(accountLine.getBalance()-Math.abs(totaltrx));	
			}
			
			accountLine.setEndBalance(accountLine.getBalance());
			accountLine.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(),accountLine.getEndBalance()));
			if(parent!=null) {
				parent.setEndBalance(parent.getEndBalance()+totaltrx);
				parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
			}
			accountServices.addAccount(accountLine);
			if(parent!=null) {
				accountServices.addAccount(parent);
			}
		}
		
		for (int i = 0; i < request.getTransaction_lines().size(); i++) {
			Transaction transactionAccount = deleteTransaction.get(i);
			TransactionLineRequest transactionLineRequest = request.getTransaction_lines().get(i);
			
			transactionAccount.setDate(request.getTransaction_date());
			transactionAccount.setAccount_id(transactionLineRequest.getAccount_id());
			transactionAccount.setJournal_id(joEntry.getId());
			transactionAccount.setTransaction_id(joEntry.getId());
			transactionAccount.setTransaction_type("Journal Entry");
			transactionAccount.setTransaction_no(transactionNumber);
			transactionAccount.setTransaction_no_format(transactionFormatNumber);
			transactionAccount.setDebit(transactionLineRequest.getDebit());
			transactionAccount.setCredit(transactionLineRequest.getCredit());
			
			Account account = accountServices.findAccountById(transactionLineRequest.getAccount_id());
			transactionAccount.setBalance(account.getEndBalance());
			transactionServices.save(transactionAccount);
			
		}

		
		return new ResponseEntity<>(joEntry, HttpStatus.OK);
	}
	
	@RequestMapping(value = "journal-entry/attachment/image/{file}", 
			produces = {MediaType.IMAGE_PNG_VALUE, "application/json"},
			method = RequestMethod.GET)
	public ResponseEntity<?> getAttachmentPdf(@PathVariable("file") String file) throws IOException{
        Resource imgFile = journalServices.getAttachment(file);
        InputStreamResource inputStreamResource =  new InputStreamResource(imgFile.getInputStream());
        return new ResponseEntity<>(inputStreamResource, HttpStatus.OK);
	}
	
	@RequestMapping(value = "journal-entry/attachment/pdf/{file}", 
			produces = {MediaType.APPLICATION_PDF_VALUE, "application/pdf"},
			method = RequestMethod.GET)
	public ResponseEntity<?> getAttachmentImage(@PathVariable("file") String file) throws IOException{
        Resource imgFile = journalServices.getAttachment(file);
        InputStreamResource inputStreamResource =  new InputStreamResource(imgFile.getInputStream());
        return new ResponseEntity<>(inputStreamResource, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "journal-entry/{id}",method = RequestMethod.DELETE)
	public void deleteJournalEntry(@PathVariable("id") int id){

		List<Transaction> transactionDelete =  transactionServices.getTransactionByJournalId(id);
		
		for (Transaction transaction : transactionDelete) {
			Account account = accountServices.findAccountById(transaction.getAccount_id());
			Company companyCurrencySymbol = companyServices.findById(account.getCompany_id());
			if(transaction.getCredit()!=0) {
				account.setBalance(account.getBalance()+transaction.getCredit());
				account.setEndBalance(account.getBalance());
				account.setBalance_ammount(BalanceFormat.balanceString(companyCurrencySymbol.getCompany_currency().getSymbol(), account.getEndBalance()));
				accountServices.addAccount(account);
			}else {
				account.setBalance(account.getBalance()-transaction.getDebit());
				account.setEndBalance(account.getBalance());
				account.setBalance_ammount(BalanceFormat.balanceString(companyCurrencySymbol.getCompany_currency().getSymbol(), account.getEndBalance()));
				accountServices.addAccount(account);
			}

		}
		
		transactionServices.deleteAll(transactionDelete);
		journalServices.deleteJournal(id);

	}
	
	
	
	@RequestMapping(value = "journal-entry/{id}/attachment",method = RequestMethod.POST)
	public ResponseEntity<?> uploadAttachment(@PathVariable("id") int id, @RequestParam("attachment") MultipartFile[] attachment){
				boolean upload = journalServices.updateAttachment(id,attachment);
				if(upload) {					
					return new ResponseEntity<>(new String("upload Successfull"),HttpStatus.OK);
				}else {
					return new ResponseEntity<>(new String("upload failed"),HttpStatus.BAD_REQUEST);
				}
	}
	
	
	@RequestMapping(value = "journal-entry/{id}/attachment/{name}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteAttachment(@PathVariable("id") int id,@PathVariable("name") String name){
		journalServices.deleteAttachment(id, name);
			return new ResponseEntity<>(HttpStatus.OK);
	
	}
	


}
