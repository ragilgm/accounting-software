package com.accounting.project.accounting.dtoRequest;
public class ImportDataRequest {

	private String account_name;
	private String account_code;
	private String code;
	private String categoryName;
	private double balance;
	private String tax_name;
	private String description;
	private int account_default = 0;
	private int locked = 0;
	
	
	
	
	public ImportDataRequest() {
		super();
	}
	public ImportDataRequest(String account_name, String account_code, String code, String categoryName, double balance,
			String tax_name, String description, int account_default, int locked) {
		super();
		this.account_name = account_name;
		this.account_code = account_code;
		this.code = code;
		this.categoryName = categoryName;
		this.balance = balance;
		this.tax_name = tax_name;
		this.description = description;
		this.account_default = account_default;
		this.locked = locked;
	}
	public String getAccount_name() {
		return account_name;
	}
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}
	public String getAccount_code() {
		return account_code;
	}
	public void setAccount_code(String account_code) {
		this.account_code = account_code;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public String getTax_name() {
		return tax_name;
	}
	public void setTax_name(String tax_name) {
		this.tax_name = tax_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getAccount_default() {
		return account_default;
	}
	public void setAccount_default(int account_default) {
		this.account_default = account_default;
	}
	public int getLocked() {
		return locked;
	}
	public void setLocked(int locked) {
		this.locked = locked;
	}
	
	
	

}
