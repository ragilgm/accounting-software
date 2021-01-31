package com.accounting.project.accounting.dtoRequest.company;

public class CompanyRequest {

	private String name;
	private String language_name;
	private String industry;
	private String address;
	private String shipping_address;
	private String phone;
	private String currency_format_view;
	private String fax;
	private boolean show_logo_report;
	private String company_website;
	private boolean enable_monthly_performance_email;
	private String company_currency_country;



	public CompanyRequest(String name, String language_name, String industry, String address, String shipping_address,
			String phone, String currency_format_view, String fax, boolean show_logo_report, String company_website,
			boolean enable_monthly_performance_email, String company_currency_country) {
		super();
		this.name = name;
		this.language_name = language_name;
		this.industry = industry;
		this.address = address;
		this.shipping_address = shipping_address;
		this.phone = phone;
		this.currency_format_view = currency_format_view;
		this.fax = fax;
		this.show_logo_report = show_logo_report;
		this.company_website = company_website;
		this.enable_monthly_performance_email = enable_monthly_performance_email;
		this.company_currency_country = company_currency_country;
	}



	public CompanyRequest() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLanguage_name() {
		return language_name;
	}

	public void setLanguage_name(String language_name) {
		this.language_name = language_name;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCurrency_format_view() {
		return currency_format_view;
	}

	public void setCurrency_format_view(String currency_format_view) {
		this.currency_format_view = currency_format_view;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
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

	public boolean isEnable_monthly_performance_email() {
		return enable_monthly_performance_email;
	}

	public void setEnable_monthly_performance_email(boolean enable_monthly_performance_email) {
		this.enable_monthly_performance_email = enable_monthly_performance_email;
	}

	public String getCompany_currency_country() {
		return company_currency_country;
	}

	public void setCompany_currency_country(String company_currency_country) {
		this.company_currency_country = company_currency_country;
	}
	
	

}
