package com.accounting.project.accounting.dtoResponse.account;

import java.io.Serializable;
import java.util.List;

public class ParentAccountResponse implements Serializable {

	private static final long serialVersionUID = 7156526077883281623L;

	private int id;
	private int is_system;
	private int product_link;
	private int is_lock;
	private int multi_currency;
	private String number;
	private String name;
	private String custom_id;
	private String description;
	private int category_id;
	private String category;
	private double balance;
	private double end_balance;
	private int parent_id;
	private int indent;
	private boolean is_parent = false;
	private int account_type;
	private String account_description;
	private String country_name;
	private String currency_rate_for_today;
	private String country_code;
	private String currency_symbol;
	private int not_base_currency;
	private int total_at;
	private int total_bs;
	private String total_debit_bs;
	private String total_credit_bs;
	private String bs_latest_date;
	private List<ChildrenResponse> children;
	
	

	public ParentAccountResponse(int id, int is_system, int product_link, int is_lock, int multi_currency,
			String number, String name, String custom_id, String description, int category_id, String category,
			double balance, double end_balance, int parent_id, int indent, boolean is_parent, int account_type,
			String account_description, String country_name, String currency_rate_for_today, String country_code,
			String currency_symbol, int not_base_currency, int total_at, int total_bs, String total_debit_bs,
			String total_credit_bs, String bs_latest_date, List<ChildrenResponse> children) {
		super();
		this.id = id;
		this.is_system = is_system;
		this.product_link = product_link;
		this.is_lock = is_lock;
		this.multi_currency = multi_currency;
		this.number = number;
		this.name = name;
		this.custom_id = custom_id;
		this.description = description;
		this.category_id = category_id;
		this.category = category;
		this.balance = balance;
		this.end_balance = end_balance;
		this.parent_id = parent_id;
		this.indent = indent;
		this.is_parent = is_parent;
		this.account_type = account_type;
		this.account_description = account_description;
		this.country_name = country_name;
		this.currency_rate_for_today = currency_rate_for_today;
		this.country_code = country_code;
		this.currency_symbol = currency_symbol;
		this.not_base_currency = not_base_currency;
		this.total_at = total_at;
		this.total_bs = total_bs;
		this.total_debit_bs = total_debit_bs;
		this.total_credit_bs = total_credit_bs;
		this.bs_latest_date = bs_latest_date;
		this.children = children;
	}

	public ParentAccountResponse() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIs_system() {
		return is_system;
	}

	public void setIs_system(int is_system) {
		this.is_system = is_system;
	}

	public int getProduct_link() {
		return product_link;
	}

	public void setProduct_link(int product_link) {
		this.product_link = product_link;
	}

	public int getIs_lock() {
		return is_lock;
	}

	public void setIs_lock(int is_lock) {
		this.is_lock = is_lock;
	}

	public int getMulti_currency() {
		return multi_currency;
	}

	public void setMulti_currency(int multi_currency) {
		this.multi_currency = multi_currency;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCustom_id() {
		return custom_id;
	}

	public void setCustom_id(String custom_id) {
		this.custom_id = custom_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public double getEnd_balance() {
		return end_balance;
	}

	public void setEnd_balance(double end_balance) {
		this.end_balance = end_balance;
	}

	public int getParent_id() {
		return parent_id;
	}

	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}

	public int getIndent() {
		return indent;
	}

	public void setIndent(int indent) {
		this.indent = indent;
	}

	public boolean isIs_parent() {
		return is_parent;
	}

	public void setIs_parent(boolean is_parent) {
		this.is_parent = is_parent;
	}

	public int getAccount_type() {
		return account_type;
	}

	public void setAccount_type(int account_type) {
		this.account_type = account_type;
	}

	public String getAccount_description() {
		return account_description;
	}

	public void setAccount_description(String account_description) {
		this.account_description = account_description;
	}

	public String getCountry_name() {
		return country_name;
	}

	public void setCountry_name(String country_name) {
		this.country_name = country_name;
	}

	public String getCurrency_rate_for_today() {
		return currency_rate_for_today;
	}

	public void setCurrency_rate_for_today(String currency_rate_for_today) {
		this.currency_rate_for_today = currency_rate_for_today;
	}

	public String getCountry_code() {
		return country_code;
	}

	public void setCountry_code(String country_code) {
		this.country_code = country_code;
	}

	public String getCurrency_symbol() {
		return currency_symbol;
	}

	public void setCurrency_symbol(String currency_symbol) {
		this.currency_symbol = currency_symbol;
	}

	public int getNot_base_currency() {
		return not_base_currency;
	}

	public void setNot_base_currency(int not_base_currency) {
		this.not_base_currency = not_base_currency;
	}

	public int getTotal_at() {
		return total_at;
	}

	public void setTotal_at(int total_at) {
		this.total_at = total_at;
	}

	public int getTotal_bs() {
		return total_bs;
	}

	public void setTotal_bs(int total_bs) {
		this.total_bs = total_bs;
	}

	public String getTotal_debit_bs() {
		return total_debit_bs;
	}

	public void setTotal_debit_bs(String total_debit_bs) {
		this.total_debit_bs = total_debit_bs;
	}

	public String getTotal_credit_bs() {
		return total_credit_bs;
	}

	public void setTotal_credit_bs(String total_credit_bs) {
		this.total_credit_bs = total_credit_bs;
	}

	public String getBs_latest_date() {
		return bs_latest_date;
	}

	public void setBs_latest_date(String bs_latest_date) {
		this.bs_latest_date = bs_latest_date;
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

}
