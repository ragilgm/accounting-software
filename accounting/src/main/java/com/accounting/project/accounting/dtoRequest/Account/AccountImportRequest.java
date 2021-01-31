package com.accounting.project.accounting.dtoRequest.Account;

public class AccountImportRequest {

	private String accountName;
	private String accountNumber;
	private String categoryNumber;
	private String defaultTaxName;
	private String description;
	private String headerAccountNumber;
	private double openingBalance;

	public AccountImportRequest() {
	}

	public AccountImportRequest(String accountName, String accountNumber, String categoryNumber, String defaultTaxName,
			String description, String headerAccountNumber, double openingBalance) {
		super();
		this.accountName = accountName;
		this.accountNumber = accountNumber;
		this.categoryNumber = categoryNumber;
		this.defaultTaxName = defaultTaxName;
		this.description = description;
		this.headerAccountNumber = headerAccountNumber;
		this.openingBalance = openingBalance;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getCategoryNumber() {
		return categoryNumber;
	}

	public void setCategoryNumber(String categoryNumber) {
		this.categoryNumber = categoryNumber;
	}

	public String getDefaultTaxName() {
		return defaultTaxName;
	}

	public void setDefaultTaxName(String defaultTaxName) {
		this.defaultTaxName = defaultTaxName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getHeaderAccountNumber() {
		return headerAccountNumber;
	}

	public void setHeaderAccountNumber(String headerAccountNumber) {
		this.headerAccountNumber = headerAccountNumber;
	}

	public double getOpeningBalance() {
		return openingBalance;
	}

	public void setOpeningBalance(double openingBalance) {
		this.openingBalance = openingBalance;
	}

}
