package com.accounting.project.accounting.dtoResponse.account;

import java.util.Date;
import java.util.List;

public class SingleAccountResponse {
	private int id;
	private String name;
	private String description;
	private String number;
	private int company_id;
	private String opening_balance;
	private String start_balance;
	private int company_tax_id;
	private String tax_name;
	private boolean is_lock;
	private Date created_at;
	private Date deleted_at;
	private double balance;
	private String balance_string;
	private CategoryResponse category;
	private CompanyResponse company;
	private List<ChildrenResponse> children;
	private int parent_id;
	private String parent_name;
	private Date updated_at;
	private String currency_code;
	private List<TransactionResponse> transactions;

	public SingleAccountResponse() {
		super();
	}

	public SingleAccountResponse(int id, String name, String description, String number, int company_id,
			 String opening_balance, String start_balance, int company_tax_id, String tax_name,
			boolean is_lock, Date created_at, Date deleted_at, double balance, String balance_string,
			CategoryResponse category, CompanyResponse company, List<ChildrenResponse> children, int parent_id,
			String parent_name, Date updated_at, String currency_code, List<TransactionResponse> transactions) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.number = number;
		this.company_id = company_id;
		this.opening_balance = opening_balance;
		this.start_balance = start_balance;
		this.company_tax_id = company_tax_id;
		this.tax_name = tax_name;
		this.is_lock = is_lock;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
		this.balance = balance;
		this.balance_string = balance_string;
		this.category = category;
		this.company = company;
		this.children = children;
		this.parent_id = parent_id;
		this.parent_name = parent_name;
		this.updated_at = updated_at;
		this.currency_code = currency_code;
		this.transactions = transactions;
	}

	public boolean isIs_lock() {
		return is_lock;
	}

	public void setIs_lock(boolean is_lock) {
		this.is_lock = is_lock;
	}

	public String getParent_name() {
		return parent_name;
	}

	public void setParent_name(String parent_name) {
		this.parent_name = parent_name;
	}

	public int getParent_id() {
		return parent_id;
	}

	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}

	public String getTax_name() {
		return tax_name;
	}

	public void setTax_name(String tax_name) {
		this.tax_name = tax_name;
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

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}


	public String getOpening_balance() {
		return opening_balance;
	}

	public void setOpening_balance(String opening_balance) {
		this.opening_balance = opening_balance;
	}

	public String getStart_balance() {
		return start_balance;
	}

	public void setStart_balance(String start_balance) {
		this.start_balance = start_balance;
	}

	public int getCompany_tax_id() {
		return company_tax_id;
	}

	public void setCompany_tax_id(int company_tax_id) {
		this.company_tax_id = company_tax_id;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Date getDeleted_at() {
		return deleted_at;
	}

	public void setDeleted_at(Date deleted_at) {
		this.deleted_at = deleted_at;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public String getBalance_string() {
		return balance_string;
	}

	public void setBalance_string(String balance_string) {
		this.balance_string = balance_string;
	}

	public CategoryResponse getCategory() {
		return category;
	}

	public void setCategory(CategoryResponse category) {
		this.category = category;
	}

	public CompanyResponse getCompany() {
		return company;
	}

	public void setCompany(CompanyResponse company) {
		this.company = company;
	}

	public List<ChildrenResponse> getChildren() {
		return children;
	}

	public void setChildren(List<ChildrenResponse> children) {
		this.children = children;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}

	public String getCurrency_code() {
		return currency_code;
	}

	public void setCurrency_code(String currency_code) {
		this.currency_code = currency_code;
	}

	public List<TransactionResponse> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<TransactionResponse> transactions) {
		this.transactions = transactions;
	}

}