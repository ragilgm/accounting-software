package com.accounting.project.accounting.dtoRequest.OpeningBalance;

public class AccountLine {
	private int account_id;
	private double credit;
	private double debit;

	public AccountLine(int account_id, double credit, double debit) {
		super();
		this.account_id = account_id;
		this.credit = credit;
		this.debit = debit;
	}

	public AccountLine() {
		super();
	}

	public int getAccount_id() {
		return account_id;
	}

	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}

	public double getCredit() {
		return credit;
	}

	public void setCredit(double credit) {
		this.credit = credit;
	}

	public double getDebit() {
		return debit;
	}

	public void setDebit(double debit) {
		this.debit = debit;
	}

}