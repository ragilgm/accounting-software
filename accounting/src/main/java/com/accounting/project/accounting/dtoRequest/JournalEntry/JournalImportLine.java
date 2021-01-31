package com.accounting.project.accounting.dtoRequest.JournalEntry;

public class JournalImportLine {

	private String transactionNumber;
	private String transactionDate;
	private String accountNumber;
	private String description;
	private double debit;
	private double credit;
	private String memo;

	public JournalImportLine() {
		super();
	}

	public JournalImportLine(String transactionNumber, String transactionDate, String accountNumber,
			String description, double debit, double credit, String memo) {
		super();
		this.transactionNumber = transactionNumber;
		this.transactionDate = transactionDate;
		this.accountNumber = accountNumber;
		this.description = description;
		this.debit = debit;
		this.credit = credit;
		this.memo = memo;
	}

	public String getTransactionNumber() {
		return transactionNumber;
	}

	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	public String getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getDebit() {
		return debit;
	}

	public void setDebit(double debit) {
		this.debit = debit;
	}

	public double getCredit() {
		return credit;
	}

	public void setCredit(double credit) {
		this.credit = credit;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

}
