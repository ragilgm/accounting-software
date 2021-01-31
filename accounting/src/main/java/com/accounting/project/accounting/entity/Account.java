package com.accounting.project.accounting.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "account")
public class Account implements Serializable {

	private static final long serialVersionUID = 7156526077883281623L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private String number_account;
	private boolean isLock = false;
	private double opening_balance;
	private double start_balance;
	private boolean isParent = false;
	private String currency_code;
	private String category;
	private String category_id;
	private int company_id;
	private String default_company_tax_name;
	private double balance;
	private double endBalance = 0;
	private String balance_ammount;
	private int parent_id;
	private Date created_at;
	private Date updated_at;
	private Date delete_at;
	
	public Account(String name, String description, String number_account, boolean isLock,
			double opening_balance, double start_balance, boolean isParent, String currency_code, String category,
			String category_id, int company_id, String default_company_tax_name, double balance, double endBalance,
			String balance_ammount, int parent_id, Date created_at, Date updated_at, Date delete_at) {
		super();
		this.name = name;
		this.description = description;
		this.number_account = number_account;
		this.isLock = isLock;
		this.opening_balance = opening_balance;
		this.start_balance = start_balance;
		this.isParent = isParent;
		this.currency_code = currency_code;
		this.category = category;
		this.category_id = category_id;
		this.company_id = company_id;
		this.default_company_tax_name = default_company_tax_name;
		this.balance = balance;
		this.endBalance = endBalance;
		this.balance_ammount = balance_ammount;
		this.parent_id = parent_id;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.delete_at = delete_at;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}


	public String getDefault_company_tax_name() {
		return default_company_tax_name;
	}

	public void setDefault_company_tax_name(String default_company_tax_name) {
		this.default_company_tax_name = default_company_tax_name;
	}

	public double getEndBalance() {
		return endBalance;
	}

	public void setEndBalance(double endBalance) {
		this.endBalance = endBalance;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Account() {
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

	public boolean isParent() {
		return isParent;
	}

	public void setParent(boolean isParent) {
		this.isParent = isParent;
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

	public double getOpening_balance() {
		return opening_balance;
	}

	public void setOpening_balance(double opening_balance) {
		this.opening_balance = opening_balance;
	}

	public double getStart_balance() {
		return start_balance;
	}

	public void setStart_balance(double start_balance) {
		this.start_balance = start_balance;
	}

}
