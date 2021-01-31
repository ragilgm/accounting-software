package com.accounting.project.accounting.dtoResponse.account;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class AccountReponse implements Serializable {

	private static final long serialVersionUID = 7156526077883281623L;

	private int id;
	private String name;
	private String description;
	private String number_account;
	private boolean isLock;
	private boolean is_parennt;
	private String currency_code;
	private String category;
	private String category_id;
	private int company_id;
	private String taxName;
	private double opening_balance;
	private double start_balance;
	private double balance;
	private String balance_ammount;
	private int parent_id;
	private Date created_at;
	private Date delete_at;
	private List<ChildrenResponse> children;

	public AccountReponse() {
		super();
	}

	public boolean isIs_parennt() {
		return is_parennt;
	}

	public void setIs_parennt(boolean is_parennt) {
		this.is_parennt = is_parennt;
	}

	public AccountReponse(int id, String name, String description, String number_account, boolean isLock,
			boolean is_parennt, String currency_code, String category, String category_id, int company_id,
			String taxName, double opening_balance, double start_balance, double balance, String balance_ammount,
			int parent_id, Date created_at, Date delete_at, List<ChildrenResponse> children) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.number_account = number_account;
		this.isLock = isLock;
		this.is_parennt = is_parennt;
		this.currency_code = currency_code;
		this.category = category;
		this.category_id = category_id;
		this.company_id = company_id;
		this.taxName = taxName;
		this.opening_balance = opening_balance;
		this.start_balance = start_balance;
		this.balance = balance;
		this.balance_ammount = balance_ammount;
		this.parent_id = parent_id;
		this.created_at = created_at;
		this.delete_at = delete_at;
		this.children = children;
	}

	public String getTaxName() {
		return taxName;
	}

	public void setTaxName(String taxName) {
		this.taxName = taxName;
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

	public List<ChildrenResponse> getChildren() {
		return children;
	}

	public void setChildren(List<ChildrenResponse> children) {
		this.children = children;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
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
