package com.accounting.project.accounting.dtoRequest.company;

import com.accounting.project.accounting.entity.BankAccount;
import com.accounting.project.accounting.entity.CompanyBankDetail;

public class UpdateCompanyRequest{
    private String name;
    private String industry;
    private String address;
    private String shipping_address;
    private String phone;
    private String fax;
    private String company_tax_number;
    private boolean show_logo_report;
    private String company_website;
    private boolean enable_monthly_performance_email;
    private String company_currency_country;
    private String defult_invoice_message;
    private String defult_delivery_slip_message;
    private String defult_purchase_order_message;
    private boolean discount_lines_sale;
    private boolean discount_sale;
    private boolean deposit_sale;
    private boolean discount_lines_purchase;
    private boolean discount_purchase;
    private boolean deposit_purchase;
    private int sale_shipping_account_id;
    private int purchase_shipping_account_id;
    private boolean shipping_purchase;
    private boolean shipping_sale;    
    private CompanyBankDetail company_bank_detail_attributes;
    
	public UpdateCompanyRequest(String name, String industry, String address,
			String shipping_address, String phone, String fax, String company_tax_number, boolean show_logo_report,
			String company_website, boolean enable_monthly_performance_email, String company_currency_country,
			String defult_invoice_message, String defult_delivery_slip_message, String defult_purchase_order_message,
			boolean discount_lines_sale, boolean discount_sale, boolean deposit_sale, boolean discount_lines_purchase,
			boolean discount_purchase, boolean deposit_purchase, int sale_shipping_account_id,
			int purchase_shipping_account_id, boolean shipping_purchase, boolean shipping_sale,
			CompanyBankDetail company_bank_detail_attributes) {
		super();
		this.name = name;
		this.industry = industry;
		this.address = address;
		this.shipping_address = shipping_address;
		this.phone = phone;
		this.fax = fax;
		this.company_tax_number = company_tax_number;
		this.show_logo_report = show_logo_report;
		this.company_website = company_website;
		this.enable_monthly_performance_email = enable_monthly_performance_email;
		this.company_currency_country = company_currency_country;
		this.defult_invoice_message = defult_invoice_message;
		this.defult_delivery_slip_message = defult_delivery_slip_message;
		this.defult_purchase_order_message = defult_purchase_order_message;
		this.discount_lines_sale = discount_lines_sale;
		this.discount_sale = discount_sale;
		this.deposit_sale = deposit_sale;
		this.discount_lines_purchase = discount_lines_purchase;
		this.discount_purchase = discount_purchase;
		this.deposit_purchase = deposit_purchase;
		this.sale_shipping_account_id = sale_shipping_account_id;
		this.purchase_shipping_account_id = purchase_shipping_account_id;
		this.shipping_purchase = shipping_purchase;
		this.shipping_sale = shipping_sale;
		this.company_bank_detail_attributes = company_bank_detail_attributes;
	}
		
	public UpdateCompanyRequest() {
		super();
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
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
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
	public String getDefult_invoice_message() {
		return defult_invoice_message;
	}
	public void setDefult_invoice_message(String defult_invoice_message) {
		this.defult_invoice_message = defult_invoice_message;
	}
	public String getDefult_delivery_slip_message() {
		return defult_delivery_slip_message;
	}
	public void setDefult_delivery_slip_message(String defult_delivery_slip_message) {
		this.defult_delivery_slip_message = defult_delivery_slip_message;
	}
	public String getDefult_purchase_order_message() {
		return defult_purchase_order_message;
	}
	public void setDefult_purchase_order_message(String defult_purchase_order_message) {
		this.defult_purchase_order_message = defult_purchase_order_message;
	}
	public boolean isDiscount_lines_sale() {
		return discount_lines_sale;
	}
	public void setDiscount_lines_sale(boolean discount_lines_sale) {
		this.discount_lines_sale = discount_lines_sale;
	}
	public boolean isDiscount_sale() {
		return discount_sale;
	}
	public void setDiscount_sale(boolean discount_sale) {
		this.discount_sale = discount_sale;
	}
	public boolean isDeposit_sale() {
		return deposit_sale;
	}
	public void setDeposit_sale(boolean deposit_sale) {
		this.deposit_sale = deposit_sale;
	}
	public boolean isDiscount_lines_purchase() {
		return discount_lines_purchase;
	}
	public void setDiscount_lines_purchase(boolean discount_lines_purchase) {
		this.discount_lines_purchase = discount_lines_purchase;
	}
	public boolean isDiscount_purchase() {
		return discount_purchase;
	}
	public void setDiscount_purchase(boolean discount_purchase) {
		this.discount_purchase = discount_purchase;
	}
	public boolean isDeposit_purchase() {
		return deposit_purchase;
	}
	public void setDeposit_purchase(boolean deposit_purchase) {
		this.deposit_purchase = deposit_purchase;
	}
	public int getSale_shipping_account_id() {
		return sale_shipping_account_id;
	}
	public void setSale_shipping_account_id(int sale_shipping_account_id) {
		this.sale_shipping_account_id = sale_shipping_account_id;
	}
	public int getPurchase_shipping_account_id() {
		return purchase_shipping_account_id;
	}
	public void setPurchase_shipping_account_id(int purchase_shipping_account_id) {
		this.purchase_shipping_account_id = purchase_shipping_account_id;
	}
	public boolean isShipping_purchase() {
		return shipping_purchase;
	}
	public void setShipping_purchase(boolean shipping_purchase) {
		this.shipping_purchase = shipping_purchase;
	}
	public boolean isShipping_sale() {
		return shipping_sale;
	}
	public void setShipping_sale(boolean shipping_sale) {
		this.shipping_sale = shipping_sale;
	}
	public CompanyBankDetail getCompany_bank_detail_attributes() {
		return company_bank_detail_attributes;
	}
	public void setCompany_bank_detail_attributes(CompanyBankDetail company_bank_detail_attributes) {
		this.company_bank_detail_attributes = company_bank_detail_attributes;
	}
    
    
}
