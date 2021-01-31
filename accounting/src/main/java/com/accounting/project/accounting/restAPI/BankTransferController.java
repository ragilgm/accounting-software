package com.accounting.project.accounting.restAPI;

import java.io.IOException;
import java.text.ParseException;
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

import com.accounting.project.accounting.dtoRequest.BankTransfer.BankTransferRequest;
import com.accounting.project.accounting.dtoResponse.BankTransfer.BankTransferResponse;
import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.BankTransfer;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.JournalEntry;
import com.accounting.project.accounting.entity.Transaction;
import com.accounting.project.accounting.entity.TransactionAccountLine;
import com.accounting.project.accounting.entity.TransactionNumberFormat;
import com.accounting.project.accounting.entity.TransactionStatus;
import com.accounting.project.accounting.repository.JournalEntryRepository;
import com.accounting.project.accounting.repository.TransactionNumberFormatRepository;
import com.accounting.project.accounting.repository.TransactionRepository;
import com.accounting.project.accounting.repository.TransactionStatusRepository;
import com.accounting.project.accounting.repository.impl.AccountRepositoryImpl;
import com.accounting.project.accounting.repository.impl.BankTranferRepositoryImpl;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;
import com.accounting.project.accounting.utils.BalanceFormat;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class BankTransferController {
	
	@Autowired
	private TransactionStatusRepository transactionStatusServices;
	
	@Autowired
	private TransactionRepository transactionServices;

	@Autowired
	private BankTranferRepositoryImpl bankTransferServices;
	
	@Autowired
	private TransactionNumberFormatRepository numberFormatServices;
	
	@Autowired
	private CompanyRepositoryImpl companyServices;
	
	@Autowired
	private AccountRepositoryImpl accountServices;

	@Autowired
	private JournalEntryRepository journalServices;
	
	@RequestMapping(value = "accounts/bankTransfers", method = RequestMethod.GET)
	public ResponseEntity<?> listBankTransfer() {
		return new ResponseEntity<>(bankTransferServices.listBankTransfer(), HttpStatus.OK);
	}
	@RequestMapping(value = "accounts/bankTransfers/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getBankTransferById(@PathVariable("id") int id) {
		
		BankTransfer bankTransfer = bankTransferServices.getSingleBankTransfer(id);
		
		BankTransferResponse response = new BankTransferResponse();
		
		response.setId(bankTransfer.getId());
		response.setCompany_id(bankTransfer.getCompany_id());
		response.setJournal_id(bankTransfer.getJournal_id());
		response.setTransaction_no(bankTransfer.getTransaction_no());
		response.setTransaction_no_format(bankTransfer.getTransaction_no_format());
		response.setMemo(bankTransfer.getMemo());
		response.setTransaction_date(bankTransfer.getTransaction_date());
		
		TransactionStatus transactionStatus = transactionStatusServices.getOne(bankTransfer.getTransaction_status_id());
		
		response.setTransaction_status(transactionStatus);
		response.setRefund_id(bankTransfer.getRefund_id());
		response.setRefund_from(bankTransfer.getRefund_from());
		response.setOriginal_amount(bankTransfer.getOriginal_amount());
		response.setOriginal_amount_currency_format(bankTransfer.getOriginal_amount_currency_format());
		response.setDeposit_id(bankTransfer.getDeposit_id());
		response.setDeposit_to(bankTransfer.getDeposit_to());
		response.setAttachments(bankTransfer.getAttachments());
		response.setLocked(bankTransfer.isLocked());
		response.setIs_reconciled(bankTransfer.isIs_reconciled());
		response.setCreatedAt(bankTransfer.getCreatedAt());
		response.setUpdatedAt(bankTransfer.getUpdatedAt());
		
			
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "accounts/bankTransfers", method = RequestMethod.POST)
	public ResponseEntity<?> bankTransferSave(@RequestBody BankTransferRequest request) throws ParseException {
	
		Company company = companyServices.findById(request.getCompany_id());

		String transactionNumber = null;
		String transactionFormatNumber = null;

		if(request.getTransaction_no()==null && request.getTransaction_number_format()==null) {
			System.out.println("called");
			TransactionNumberFormat transactionNumberFormat = new TransactionNumberFormat(
					request.getCompany_id(), 
					3, 
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
			transactionFormatNumber =  "#"+format.getStartInvoice()+format.getStartNumber()+format.getEndInvoice();
			transactionNumber = String.valueOf(format.getStartNumber());
			format.setStartNumber(format.getStartNumber()+1);
			numberFormatServices.save(format);
		}
		if(request.getTransaction_no()!=null){
			System.out.println("called 2");
			transactionNumber = request.getTransaction_no();
			transactionFormatNumber  = "#"+request.getTransaction_no();
		}

		Account refundFrom = accountServices.findAccountByName(request.getCompany_id(), request.getRefund_from_name());
		double currentBalance = refundFrom.getEndBalance();
		refundFrom.setBalance(currentBalance-request.getTransfer_amount());
		refundFrom.setEndBalance(currentBalance-request.getTransfer_amount());
		refundFrom.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), refundFrom.getEndBalance()));
		Account refund = accountServices.addAccount(refundFrom);
		if(refund.getParent_id()!=0) {
			Account parent = accountServices.findAccountById(refund.getParent_id());
			parent.setEndBalance(parent.getEndBalance()-request.getTransfer_amount());
			parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
			accountServices.addAccount(parent);
		}
		
		
		Account depositTo = accountServices.findAccountByName(request.getCompany_id(), request.getDeposit_to_name());
		 currentBalance = depositTo.getEndBalance();
		 depositTo.setBalance(currentBalance+request.getTransfer_amount());
		 depositTo.setEndBalance(currentBalance+request.getTransfer_amount());
		 depositTo.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), depositTo.getEndBalance()));
		Account deposit = accountServices.addAccount(depositTo);
		if(deposit.getParent_id()!=0) {
			Account parent = accountServices.findAccountById(deposit.getParent_id());
			parent.setEndBalance(parent.getEndBalance()-request.getTransfer_amount());
			parent.setBalance_ammount(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), parent.getEndBalance()));
			accountServices.addAccount(parent);
		}
	
		JournalEntry journalEntry = new JournalEntry();
		journalEntry.setTransaction_no(transactionNumber);
		journalEntry.setTransaction_no_format(transactionFormatNumber);
		journalEntry.setMemo(request.getMemo());
		journalEntry.setTransaction_date(request.getTransaction_date());
		
		
		
		journalEntry.setTransaction_status_id(1);
		journalEntry.setTotal_debit(request.getTransfer_amount());
		journalEntry.setTotal_credit(request.getTransfer_amount());
		journalEntry.setTotal_debit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), request.getTransfer_amount()));
		journalEntry.setTotal_credit_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), request.getTransfer_amount()));
		journalEntry.setAttachments(null);
		journalEntry.setLocked(false);
		journalEntry.setReconciled(false);
		journalEntry.setCreated_at(new Date());
		journalEntry.setUpdated_at(null);
		journalEntry.setCurrency_code(company.getCompany_currency().getCode());
		journalEntry.setCurrency_rate(1);
		List<TransactionAccountLine> transactionAccountLines = new ArrayList<>();
		TransactionAccountLine credit = new TransactionAccountLine(
				"", 
				0, 
				request.getTransfer_amount(), 
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), request.getTransfer_amount()), 
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0), 
				refund.getId(), 
				refund.getName(),
				refund.getNumber_account());
		TransactionAccountLine debit = new TransactionAccountLine(
				"", 
				request.getTransfer_amount(), 
				0, 
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), 0), 
				BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), request.getTransfer_amount()), 
				deposit.getId(), 
				deposit.getName(),
				deposit.getNumber_account());
		transactionAccountLines.add(credit);
		transactionAccountLines.add(debit);
		journalEntry.setTransaction_account_lines(transactionAccountLines);
		
		JournalEntry journalSave = journalServices.save(journalEntry);
		
		BankTransfer bankTransfer = new BankTransfer();
		bankTransfer.setCompany_id(request.getCompany_id());
		bankTransfer.setTransfer_amount(request.getTransfer_amount());
		bankTransfer.setJournal_id(journalSave.getId());
		bankTransfer.setTransaction_no(transactionNumber);
		bankTransfer.setTransaction_no_format(transactionFormatNumber);
		bankTransfer.setMemo(request.getMemo());
		bankTransfer.setTransaction_date(request.getTransaction_date());
		bankTransfer.setTransaction_status_id(1);
		bankTransfer.setRefund_from(refundFrom.getName());
		bankTransfer.setRefund_id(refundFrom.getId());
		bankTransfer.setOriginal_amount(request.getTransfer_amount());
		bankTransfer.setOriginal_amount_currency_format(BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), request.getTransfer_amount()));

		bankTransfer.setDeposit_to(depositTo.getName());
		bankTransfer.setDeposit_id(depositTo.getId());
		bankTransfer.setAttachments(null);
		bankTransfer.setLocked(false);
		bankTransfer.setIs_reconciled(false);
		BankTransfer tf = bankTransferServices.saveBankTransfer(bankTransfer);	
		
		Transaction transactionRefund = new Transaction(
				request.getTransaction_date(), 
				refundFrom.getId(), 				
				tf.getId(),
				journalSave.getId(),
				"Bank Transfer", 
				tf.getTransaction_no(), 
				tf.getTransaction_no_format(),
				null, 
				null, 
				null, 
				0, 
				request.getTransfer_amount(), 
				refund.getEndBalance(),
				new Date());
		transactionServices.save(transactionRefund);
		Transaction transactionDeposit = new Transaction(
				request.getTransaction_date(), 
				depositTo.getId(), 
				tf.getId(),
				journalSave.getId(),
				"Bank Transfer", 
				tf.getTransaction_no(), 
				tf.getTransaction_no_format(),
				null, 
				null, 
				null, 
				request.getTransfer_amount(), 
				0, 
				deposit.getEndBalance(),
				new Date());
		transactionServices.save(transactionDeposit);

		return new ResponseEntity<>(tf, HttpStatus.OK);
	}

	
	@RequestMapping(value = "bankTransfers/attachment/image/{file}", 
			produces = {MediaType.IMAGE_PNG_VALUE, "application/json"},
			method = RequestMethod.GET)
	public ResponseEntity<?> getAttachmentPdf(@PathVariable("file") String file) throws IOException{
        Resource imgFile = bankTransferServices.getAttachment(file);
        InputStreamResource inputStreamResource =  new InputStreamResource(imgFile.getInputStream());
        return new ResponseEntity<>(inputStreamResource, HttpStatus.OK);
	}
	
	@RequestMapping(value = "bankTransfers/attachment/pdf/{file}", 
			produces = {MediaType.APPLICATION_PDF_VALUE, "application/pdf"},
			method = RequestMethod.GET)
	public ResponseEntity<?> getAttachmentImage(@PathVariable("file") String file) throws IOException{
        Resource imgFile = bankTransferServices.getAttachment(file);
        InputStreamResource inputStreamResource =  new InputStreamResource(imgFile.getInputStream());
        return new ResponseEntity<>(inputStreamResource, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "bankTransfers/{id}/attachment",method = RequestMethod.POST)
	public ResponseEntity<?> uploadAttachment(@PathVariable("id") int id, @RequestParam("attachment") MultipartFile[] attachment){
				boolean upload = bankTransferServices.updateAttachment(id,attachment);
				if(upload) {					
					return new ResponseEntity<>(new String("upload Successfull"),HttpStatus.OK);
				}else {
					return new ResponseEntity<>(new String("upload failed"),HttpStatus.BAD_REQUEST);
				}
	}
	


}
