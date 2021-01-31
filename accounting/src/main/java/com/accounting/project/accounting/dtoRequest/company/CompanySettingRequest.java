package com.accounting.project.accounting.dtoRequest.company;

public class CompanySettingRequest {

	private String name;
	private String industry;
	private String address;
	private String shipping_address;
	private String company_tax_number;
	private boolean show_logo_report;
	private String company_website;
	private String company_email;
	private boolean enable_monthly_performance_email;
	private String bank_name;
	private String bank_branch;
	private String bank_address;
	private String account_number;
	private String account_name;
	private String swift_code;
	private int currency_id;

	public CompanySettingRequest(String name, String industry, String address, String shipping_address,
			String company_tax_number, boolean show_logo_report, String company_website, String company_email,
			boolean enable_monthly_performance_email, String bank_name, String bank_branch, String bank_address,
			String account_number, String account_name, String swift_code, int currency_id) {
		super();
		this.name = name;
		this.industry = industry;
		this.address = address;
		this.shipping_address = shipping_address;
		this.company_tax_number = company_tax_number;
		this.show_logo_report = show_logo_report;
		this.company_website = company_website;
		this.company_email = company_email;
		this.enable_monthly_performance_email = enable_monthly_performance_email;
		this.bank_name = bank_name;
		this.bank_branch = bank_branch;
		this.bank_address = bank_address;
		this.account_number = account_number;
		this.account_name = account_name;
		this.swift_code = swift_code;
		this.currency_id = currency_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getShipping_address() {
		return shipping_address;
	}

	public void setShipping_address(String shipping_address) {
		this.shipping_address = shipping_address;
	}

	public String getCompany_tax_number() {
		return company_tax_number;
	}

	public void setCompany_tax_number(String company_tax_number) {
		this.company_tax_number = company_tax_number;
	}

	public boolean isShow_logo_report() {
		return show_logo_report;
	}

	public void setShow_logo_report(boolean show_logo_report) {
		this.show_logo_report = show_logo_report;
	}

	public String getCompany_website() {
		return company_website;
	}

	public void setCompany_website(String company_website) {
		this.company_website = company_website;
	}

	public String getCompany_email() {
		return company_email;
	}

	public void setCompany_email(String company_email) {
		this.company_email = company_email;
	}

	public boolean isEnable_monthly_performance_email() {
		return enable_monthly_performance_email;
	}

	public void setEnable_monthly_performance_email(boolean enable_monthly_performance_email) {
		this.enable_monthly_performance_email = enable_monthly_performance_email;
	}

	public String getBank_name() {
		return bank_name;
	}

	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	public String getBank_branch() {
		return bank_branch;
	}

	public void setBank_branch(String bank_branch) {
		this.bank_branch = bank_branch;
	}

	public String getBank_address() {
		return bank_address;
	}

	public void setBank_address(String bank_address) {
		this.bank_address = bank_address;
	}

	public String getAccount_number() {
		return account_number;
	}

	public void setAccount_number(String account_number) {
		this.account_number = account_number;
	}

	public String getAccount_name() {
		return account_name;
	}

	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}

	public String getSwift_code() {
		return swift_code;
	}

	public void setSwift_code(String swift_code) {
		this.swift_code = swift_code;
	}

	public int getCurrency_id() {
		return currency_id;
	}

	public void setCurrency_id(int currency_id) {
		this.currency_id = currency_id;
	}

	public CompanySettingRequest() {
		// TODO Auto-generated constructor stub
	}

}
