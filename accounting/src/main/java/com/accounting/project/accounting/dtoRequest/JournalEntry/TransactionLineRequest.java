package com.accounting.project.accounting.dtoRequest.JournalEntry;

public class TransactionLineRequest {

	private int account_id;
	private double debit;
	private double credit;
	private String description;

	public TransactionLineRequest() {
		// TODO Auto-generated constructor stub
	}

	public TransactionLineRequest(int account_id, double debit, double credit, String description) {
		super();
		this.account_id = account_id;
		this.debit = debit;
		this.credit = credit;
		this.description = description;
	}

	public int getAccount_id() {
		return account_id;
	}

	public void setAccount_id(int account_id) {
		this.account_id = account_id;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
