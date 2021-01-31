package com.accounting.project.accounting.dtoRequest;

public class AccountImportRequest {

	private String AccountName;
	private String AccountNumber;
	private String CategoryNumber;
	private String Description;
	private String CategoryName;
	private double Balance;
	private String DefaultTaxName;


	
	public AccountImportRequest(String accountName, String accountNumber, String categoryNumber, String description,
			String categoryName, double balance, String defaultTaxName) {
		super();
		AccountName = accountName;
		AccountNumber = accountNumber;
		CategoryNumber = categoryNumber;
		Description = description;
		CategoryName = categoryName;
		Balance = balance;
		DefaultTaxName = defaultTaxName;
	}
	
	

	public String getCategoryNumber() {
		return CategoryNumber;
	}



	public void setCategoryNumber(String categoryNumber) {
		CategoryNumber = categoryNumber;
	}



	public AccountImportRequest() {
		super();
	}

	public String getAccountName() {
		return AccountName;
	}

	public void setAccountName(String accountName) {
		AccountName = accountName;
	}

	public String getAccountNumber() {
		return AccountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		AccountNumber = accountNumber;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

	public String getCategoryName() {
		return CategoryName;
	}

	public void setCategoryName(String categoryName) {
		CategoryName = categoryName;
	}

	public double getBalance() {
		return Balance;
	}

	public void setBalance(double balance) {
		Balance = balance;
	}

	public String getDefaultTaxName() {
		return DefaultTaxName;
	}

	public void setDefaultTaxName(String defaultTaxName) {
		DefaultTaxName = defaultTaxName;
	}

}
