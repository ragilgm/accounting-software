package com.accounting.project.accounting.dtoResponse.company;

import java.util.List;

import com.accounting.project.accounting.entity.CompanyBankDetail;
import com.accounting.project.accounting.entity.CompanyBillingDetails;
import com.accounting.project.accounting.entity.Feature;


public class GetCompanyResponse {

	private int id;
	private String name;
	private String industry;
	private String address;
	private String shipping_address;
	private boolean shipping_sale;
	private boolean shipping_purchase;
	private String phone;
	private String fax;
	private String company_tax_number;
	private boolean tag;
	private boolean use_multi_currency;
	private String currency_format_view;
	private boolean show_logo_report;
	private String company_website;
	private boolean enable_monthly_performance_email;
	private String product_image;
	private boolean product_category;
	private boolean show_stock;
	private String company_email;
	private String default_invoice_message;
	private String default_delivery_slip_message;
	private boolean disable_sell_on_no_product;
	private boolean use_profit_margin;
	private String default_purchase_order_message;
	private boolean discount_lines_sale;
	private boolean discount_sale;
	private boolean deposit_sale;
	private boolean discount_lines_purchase;
	private boolean discount_purchase;
	private boolean deposit_purchase;
	private Feature feature;
	private String last_closing_the_book_date;
	private String logo;
	private boolean sales_shipping_account_changeable;
	private boolean purchases_shipping_account_changeable;
	private boolean has_sales_transaction_with_shipping;
	private boolean has_purchase_transaction_with_shipping;
	private boolean has_purchase_with_discount_lines;
	private boolean has_sale_with_discount_lines;
	private boolean has_sales_transaction_with_discount;
	private boolean has_purchase_transaction_with_discount;
	private boolean has_sales_transaction_with_deposit;
	private boolean has_purchase_transaction_with_deposit;
	private PreferredInvoiceTerm preferred_invoice_term;
	private PreferredPurchaseTerm preferred_purchase_term;
	private boolean draft_cash_transaction_feature;
	private CompanyBankDetail company_bank_detail;
	private int total_accounts;
	private CompanyCurrencyResponse company_currency;
	private CompanyBillingDetails company_billing_details;
	private DefaultAccountResponse default_accounts;
	private boolean selling_price_follow_price_rule;
	private List<UserResponse> user;

	public GetCompanyResponse(int id, String name, String industry, String address, String shipping_address,
			boolean shipping_sale, boolean shipping_purchase, String phone, String fax, String company_tax_number,
			boolean tag, boolean use_multi_currency, String currency_format_view, boolean show_logo_report,
			String company_website, boolean enable_monthly_performance_email, String product_image,
			boolean product_category, boolean show_stock, String company_email, String default_invoice_message,
			String default_delivery_slip_message, boolean disable_sell_on_no_product, boolean use_profit_margin,
			String default_purchase_order_message, boolean discount_lines_sale, boolean discount_sale,
			boolean deposit_sale, boolean discount_lines_purchase, boolean discount_purchase, boolean deposit_purchase,
			Feature feature, String last_closing_the_book_date, String logo, boolean sales_shipping_account_changeable,
			boolean purchases_shipping_account_changeable, boolean has_sales_transaction_with_shipping,
			boolean has_purchase_transaction_with_shipping, boolean has_purchase_with_discount_lines,
			boolean has_sale_with_discount_lines, boolean has_sales_transaction_with_discount,
			boolean has_purchase_transaction_with_discount, boolean has_sales_transaction_with_deposit,
			boolean has_purchase_transaction_with_deposit, PreferredInvoiceTerm preferred_invoice_term,
			PreferredPurchaseTerm preferred_purchase_term, boolean draft_cash_transaction_feature,
			CompanyBankDetail company_bank_detail, int total_accounts, CompanyCurrencyResponse company_currency,
			CompanyBillingDetails company_billing_details, DefaultAccountResponse default_accounts,
			boolean selling_price_follow_price_rule, List<UserResponse> user) {
		super();
		this.id = id;
		this.name = name;
		this.industry = industry;
		this.address = address;
		this.shipping_address = shipping_address;
		this.shipping_sale = shipping_sale;
		this.shipping_purchase = shipping_purchase;
		this.phone = phone;
		this.fax = fax;
		this.company_tax_number = company_tax_number;
		this.tag = tag;
		this.use_multi_currency = use_multi_currency;
		this.currency_format_view = currency_format_view;
		this.show_logo_report = show_logo_report;
		this.company_website = company_website;
		this.enable_monthly_performance_email = enable_monthly_performance_email;
		this.product_image = product_image;
		this.product_category = product_category;
		this.show_stock = show_stock;
		this.company_email = company_email;
		this.default_invoice_message = default_invoice_message;
		this.default_delivery_slip_message = default_delivery_slip_message;
		this.disable_sell_on_no_product = disable_sell_on_no_product;
		this.use_profit_margin = use_profit_margin;
		this.default_purchase_order_message = default_purchase_order_message;
		this.discount_lines_sale = discount_lines_sale;
		this.discount_sale = discount_sale;
		this.deposit_sale = deposit_sale;
		this.discount_lines_purchase = discount_lines_purchase;
		this.discount_purchase = discount_purchase;
		this.deposit_purchase = deposit_purchase;
		this.feature = feature;
		this.last_closing_the_book_date = last_closing_the_book_date;
		this.logo = logo;
		this.sales_shipping_account_changeable = sales_shipping_account_changeable;
		this.purchases_shipping_account_changeable = purchases_shipping_account_changeable;
		this.has_sales_transaction_with_shipping = has_sales_transaction_with_shipping;
		this.has_purchase_transaction_with_shipping = has_purchase_transaction_with_shipping;
		this.has_purchase_with_discount_lines = has_purchase_with_discount_lines;
		this.has_sale_with_discount_lines = has_sale_with_discount_lines;
		this.has_sales_transaction_with_discount = has_sales_transaction_with_discount;
		this.has_purchase_transaction_with_discount = has_purchase_transaction_with_discount;
		this.has_sales_transaction_with_deposit = has_sales_transaction_with_deposit;
		this.has_purchase_transaction_with_deposit = has_purchase_transaction_with_deposit;
		this.preferred_invoice_term = preferred_invoice_term;
		this.preferred_purchase_term = preferred_purchase_term;
		this.draft_cash_transaction_feature = draft_cash_transaction_feature;
		this.company_bank_detail = company_bank_detail;
		this.total_accounts = total_accounts;
		this.company_currency = company_currency;
		this.company_billing_details = company_billing_details;
		this.default_accounts = default_accounts;
		this.selling_price_follow_price_rule = selling_price_follow_price_rule;
		this.user = user;
	}

	public boolean isSelling_price_follow_price_rule() {
		return selling_price_follow_price_rule;
	}

	public void setSelling_price_follow_price_rule(boolean selling_price_follow_price_rule) {
		this.selling_price_follow_price_rule = selling_price_follow_price_rule;
	}

	public List<UserResponse> getUser() {
		return user;
	}

	public void setUser(List<UserResponse> user) {
		this.user = user;
	}

	public GetCompanyResponse() {
		super();
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

	public boolean isShipping_sale() {
		return shipping_sale;
	}

	public void setShipping_sale(boolean shipping_sale) {
		this.shipping_sale = shipping_sale;
	}

	public boolean isShipping_purchase() {
		return shipping_purchase;
	}

	public void setShipping_purchase(boolean shipping_purchase) {
		this.shipping_purchase = shipping_purchase;
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

	public boolean isTag() {
		return tag;
	}

	public void setTag(boolean tag) {
		this.tag = tag;
	}

	public boolean isUse_multi_currency() {
		return use_multi_currency;
	}

	public void setUse_multi_currency(boolean use_multi_currency) {
		this.use_multi_currency = use_multi_currency;
	}

	public String getCurrency_format_view() {
		return currency_format_view;
	}

	public void setCurrency_format_view(String currency_format_view) {
		this.currency_format_view = currency_format_view;
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

	public String getProduct_image() {
		return product_image;
	}

	public void setProduct_image(String product_image) {
		this.product_image = product_image;
	}

	public boolean isProduct_category() {
		return product_category;
	}

	public void setProduct_category(boolean product_category) {
		this.product_category = product_category;
	}

	public boolean isShow_stock() {
		return show_stock;
	}

	public void setShow_stock(boolean show_stock) {
		this.show_stock = show_stock;
	}

	public String getCompany_email() {
		return company_email;
	}

	public void setCompany_email(String company_email) {
		this.company_email = company_email;
	}

	public String getdefault_invoice_message() {
		return default_invoice_message;
	}

	public void setdefault_invoice_message(String default_invoice_message) {
		this.default_invoice_message = default_invoice_message;
	}

	public String getdefault_delivery_slip_message() {
		return default_delivery_slip_message;
	}

	public void setdefault_delivery_slip_message(String default_delivery_slip_message) {
		this.default_delivery_slip_message = default_delivery_slip_message;
	}

	public boolean isDisable_sell_on_no_product() {
		return disable_sell_on_no_product;
	}

	public void setDisable_sell_on_no_product(boolean disable_sell_on_no_product) {
		this.disable_sell_on_no_product = disable_sell_on_no_product;
	}

	public boolean isUse_profit_margin() {
		return use_profit_margin;
	}

	public void setUse_profit_margin(boolean use_profit_margin) {
		this.use_profit_margin = use_profit_margin;
	}

	public String getdefault_purchase_order_message() {
		return default_purchase_order_message;
	}

	public void setdefault_purchase_order_message(String default_purchase_order_message) {
		this.default_purchase_order_message = default_purchase_order_message;
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

	public Feature getFeature() {
		return feature;
	}

	public void setFeature(Feature feature) {
		this.feature = feature;
	}

	public String getLast_closing_the_book_date() {
		return last_closing_the_book_date;
	}

	public void setLast_closing_the_book_date(String last_closing_the_book_date) {
		this.last_closing_the_book_date = last_closing_the_book_date;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public boolean isSales_shipping_account_changeable() {
		return sales_shipping_account_changeable;
	}

	public void setSales_shipping_account_changeable(boolean sales_shipping_account_changeable) {
		this.sales_shipping_account_changeable = sales_shipping_account_changeable;
	}

	public boolean isPurchases_shipping_account_changeable() {
		return purchases_shipping_account_changeable;
	}

	public void setPurchases_shipping_account_changeable(boolean purchases_shipping_account_changeable) {
		this.purchases_shipping_account_changeable = purchases_shipping_account_changeable;
	}

	public boolean isHas_sales_transaction_with_shipping() {
		return has_sales_transaction_with_shipping;
	}

	public void setHas_sales_transaction_with_shipping(boolean has_sales_transaction_with_shipping) {
		this.has_sales_transaction_with_shipping = has_sales_transaction_with_shipping;
	}

	public boolean isHas_purchase_transaction_with_shipping() {
		return has_purchase_transaction_with_shipping;
	}

	public void setHas_purchase_transaction_with_shipping(boolean has_purchase_transaction_with_shipping) {
		this.has_purchase_transaction_with_shipping = has_purchase_transaction_with_shipping;
	}

	public boolean isHas_purchase_with_discount_lines() {
		return has_purchase_with_discount_lines;
	}

	public void setHas_purchase_with_discount_lines(boolean has_purchase_with_discount_lines) {
		this.has_purchase_with_discount_lines = has_purchase_with_discount_lines;
	}

	public boolean isHas_sale_with_discount_lines() {
		return has_sale_with_discount_lines;
	}

	public void setHas_sale_with_discount_lines(boolean has_sale_with_discount_lines) {
		this.has_sale_with_discount_lines = has_sale_with_discount_lines;
	}

	public boolean isHas_sales_transaction_with_discount() {
		return has_sales_transaction_with_discount;
	}

	public void setHas_sales_transaction_with_discount(boolean has_sales_transaction_with_discount) {
		this.has_sales_transaction_with_discount = has_sales_transaction_with_discount;
	}

	public boolean isHas_purchase_transaction_with_discount() {
		return has_purchase_transaction_with_discount;
	}

	public void setHas_purchase_transaction_with_discount(boolean has_purchase_transaction_with_discount) {
		this.has_purchase_transaction_with_discount = has_purchase_transaction_with_discount;
	}

	public boolean isHas_sales_transaction_with_deposit() {
		return has_sales_transaction_with_deposit;
	}

	public void setHas_sales_transaction_with_deposit(boolean has_sales_transaction_with_deposit) {
		this.has_sales_transaction_with_deposit = has_sales_transaction_with_deposit;
	}

	public boolean isHas_purchase_transaction_with_deposit() {
		return has_purchase_transaction_with_deposit;
	}

	public void setHas_purchase_transaction_with_deposit(boolean has_purchase_transaction_with_deposit) {
		this.has_purchase_transaction_with_deposit = has_purchase_transaction_with_deposit;
	}

	public PreferredInvoiceTerm getPreferred_invoice_term() {
		return preferred_invoice_term;
	}

	public void setPreferred_invoice_term(PreferredInvoiceTerm preferred_invoice_term) {
		this.preferred_invoice_term = preferred_invoice_term;
	}

	public PreferredPurchaseTerm getPreferred_purchase_term() {
		return preferred_purchase_term;
	}

	public void setPreferred_purchase_term(PreferredPurchaseTerm preferred_purchase_term) {
		this.preferred_purchase_term = preferred_purchase_term;
	}

	public boolean isDraft_cash_transaction_feature() {
		return draft_cash_transaction_feature;
	}

	public void setDraft_cash_transaction_feature(boolean draft_cash_transaction_feature) {
		this.draft_cash_transaction_feature = draft_cash_transaction_feature;
	}

	public CompanyBankDetail getCompany_bank_detail() {
		return company_bank_detail;
	}

	public void setCompany_bank_detail(CompanyBankDetail company_bank_detail) {
		this.company_bank_detail = company_bank_detail;
	}

	public int getTotal_accounts() {
		return total_accounts;
	}

	public void setTotal_accounts(int total_accounts) {
		this.total_accounts = total_accounts;
	}

	public CompanyCurrencyResponse getCompany_currency() {
		return company_currency;
	}

	public void setCompany_currency(CompanyCurrencyResponse company_currency) {
		this.company_currency = company_currency;
	}

	public CompanyBillingDetails getCompany_billing_details() {
		return company_billing_details;
	}

	public void setCompany_billing_details(CompanyBillingDetails company_billing_details) {
		this.company_billing_details = company_billing_details;
	}

	public DefaultAccountResponse getDefault_accounts() {
		return default_accounts;
	}

	public void setDefault_accounts(DefaultAccountResponse default_accounts) {
		this.default_accounts = default_accounts;
	}

}
