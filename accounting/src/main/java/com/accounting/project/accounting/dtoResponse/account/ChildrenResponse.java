package com.accounting.project.accounting.dtoResponse.account;

import java.io.Serializable;
import java.util.Date;
public class ChildrenResponse implements Serializable {
	private static final long serialVersionUID = 7156526077883281623L;

	private int id;
	private String name;
	private String description;
	private String number_account;
	private boolean isLock = false;
	private String custom_id;
	private boolean is_parent = false;
	private String currency_code;
	private String category;
	private String category_id;
	private int company_id;
	private String taxName;
	private double balance;
	private String balance_ammount;
	private int parent_id;
	private Date created_at;
	private Date delete_at;
	
	
	
	public ChildrenResponse(int id, String name, String description, String number_account, boolean isLock,
			String custom_id, boolean is_parent, String currency_code, String category, String category_id,
			int company_id, String taxName, double balance, String balance_ammount, int parent_id, Date created_at,
			Date delete_at) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.number_account = number_account;
		this.isLock = isLock;
		this.custom_id = custom_id;
		this.is_parent = is_parent;
		this.currency_code = currency_code;
		this.category = category;
		this.category_id = category_id;
		this.company_id = company_id;
		this.taxName = taxName;
		this.balance = balance;
		this.balance_ammount = balance_ammount;
		this.parent_id = parent_id;
		this.created_at = created_at;
		this.delete_at = delete_at;
	}
	public ChildrenResponse() {
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getNumber_account() {
		return number_account;
	}
	public void setNumber_account(String number_account) {
		this.number_account = number_account;
	}
	public boolean isLock() {
		return isLock;
	}
	public void setLock(boolean isLock) {
		this.isLock = isLock;
	}
	public String getCustom_id() {
		return custom_id;
	}
	public void setCustom_id(String custom_id) {
		this.custom_id = custom_id;
	}
	public boolean isIsParent() {
		return is_parent;
	}
	public void setParent(boolean is_parent) {
		this.is_parent = is_parent;
	}
	public String getCurrency_code() {
		return currency_code;
	}
	public void setCurrency_code(String currency_code) {
		this.currency_code = currency_code;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getCategory_id() {
		return category_id;
	}
	public void setCategory_id(String category_id) {
		this.category_id = category_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getTaxName() {
		return taxName;
	}
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public String getBalance_ammount() {
		return balance_ammount;
	}
	public void setBalance_ammount(String balance_ammount) {
		this.balance_ammount = balance_ammount;
	}
	public int getParent_id() {
		return parent_id;
	}
	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}
	public Date getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	public Date getDelete_at() {
		return delete_at;
	}
	public void setDelete_at(Date delete_at) {
		this.delete_at = delete_at;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

}
