package com.accounting.project.accounting.dtoResponse;

public class OpeningBalanceResponse {

	private int id;
	private String number_account;
	private String account_name;
	private String category_name;
	private double debit;
	private double creadit;

	public OpeningBalanceResponse(int id, String number_account, String account_name, String category_name,
			double debit, double creadit) {
		super();
		this.id = id;
		this.number_account = number_account;
		this.account_name = account_name;
		this.category_name = category_name;
		this.debit = debit;
		this.creadit = creadit;
	}

	public OpeningBalanceResponse() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNumber_account() {
		return number_account;
	}

	public void setNumber_account(String number_account) {
		this.number_account = number_account;
	}

	public String getAccount_name() {
		return account_name;
	}

	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public double getDebit() {
		return debit;
	}

	public void setDebit(double debit) {
		this.debit = debit;
	}

	public double getCreadit() {
		return creadit;
	}

	public void setCreadit(double creadit) {
		this.creadit = creadit;
	}

}
