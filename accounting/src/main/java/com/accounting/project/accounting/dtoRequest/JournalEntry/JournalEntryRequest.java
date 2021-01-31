package com.accounting.project.accounting.dtoRequest.JournalEntry;

import java.util.List;

public class JournalEntryRequest {

	private int company_id;
	private String transaction_date;
	private List<TransactionLineRequest> transaction_lines;
	private String memo;
	private String transaction_no;
	private String transaction_number_format;

	public JournalEntryRequest() {
		// TODO Auto-generated constructor stub
	}

	public JournalEntryRequest(int company_id, String transaction_date, List<TransactionLineRequest> transaction_lines,
			String memo, String transaction_no, String transaction_number_format) {
		super();
		this.company_id = company_id;
		this.transaction_date = transaction_date;
		this.transaction_lines = transaction_lines;
		this.memo = memo;
		this.transaction_no = transaction_no;
		this.transaction_number_format = transaction_number_format;
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public String getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}

	public List<TransactionLineRequest> getTransaction_lines() {
		return transaction_lines;
	}

	public void setTransaction_lines(List<TransactionLineRequest> transaction_lines) {
		this.transaction_lines = transaction_lines;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getTransaction_no() {
		return transaction_no;
	}

	public void setTransaction_no(String transaction_no) {
		this.transaction_no = transaction_no;
	}

	public String getTransaction_number_format() {
		return transaction_number_format;
	}

	public void setTransaction_number_format(String transaction_number_format) {
		this.transaction_number_format = transaction_number_format;
	}

}
