package com.accounting.project.accounting.dtoRequest.JournalEntry;

import java.util.List;

public class JournalImportRequest {

	private int company_id;
	private String memo;
	private double totalCredit;
	private double totalDebit;
	private boolean transactionStatus;
	private String transaction_date;
	private List<JournalImportLine> transaction_lines;

	public JournalImportRequest(int company_id, String memo, double totalCredit, double totalDebit,
			boolean transactionStatus, String transaction_date, List<JournalImportLine> transaction_lines) {
		super();
		this.company_id = company_id;
		this.memo = memo;
		this.totalCredit = totalCredit;
		this.totalDebit = totalDebit;
		this.transactionStatus = transactionStatus;
		this.transaction_date = transaction_date;
		this.transaction_lines = transaction_lines;
	}

	public JournalImportRequest() {
		super();
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public double getTotalCredit() {
		return totalCredit;
	}

	public void setTotalCredit(double totalCredit) {
		this.totalCredit = totalCredit;
	}

	public double getTotalDebit() {
		return totalDebit;
	}

	public void setTotalDebit(double totalDebit) {
		this.totalDebit = totalDebit;
	}

	public boolean isTransactionStatus() {
		return transactionStatus;
	}

	public void setTransactionStatus(boolean transactionStatus) {
		this.transactionStatus = transactionStatus;
	}

	public String getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}

	public List<JournalImportLine> getTransaction_lines() {
		return transaction_lines;
	}

	public void setTransaction_lines(List<JournalImportLine> transaction_lines) {
		this.transaction_lines = transaction_lines;
	}

}
