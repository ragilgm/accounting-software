package com.accounting.project.accounting.dtoResponse.company;

public class SalesSettingRequest {

	private String default_invoice_message;
	private String default_delivery_slip_message;
	private boolean disable_sell_on_no_product;
	private boolean discount_lines_sale;
	private boolean discount_sale;
	private boolean selling_price_follow_price_rule;
	private int termId;
	private boolean use_profit_margin;

	public SalesSettingRequest(String default_invoice_message, String default_delivery_slip_message,
			boolean disable_sell_on_no_product, boolean discount_lines_sale, boolean discount_sale,
			boolean selling_price_follow_price_rule, int termId, boolean use_profit_margin) {
		super();
		this.default_invoice_message = default_invoice_message;
		this.default_delivery_slip_message = default_delivery_slip_message;
		this.disable_sell_on_no_product = disable_sell_on_no_product;
		this.discount_lines_sale = discount_lines_sale;
		this.discount_sale = discount_sale;
		this.selling_price_follow_price_rule = selling_price_follow_price_rule;
		this.termId = termId;
		this.use_profit_margin = use_profit_margin;
	}

	public String getDefault_invoice_message() {
		return default_invoice_message;
	}

	public void setDefault_invoice_message(String default_invoice_message) {
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

	public boolean isSelling_price_follow_price_rule() {
		return selling_price_follow_price_rule;
	}

	public void setSelling_price_follow_price_rule(boolean selling_price_follow_price_rule) {
		this.selling_price_follow_price_rule = selling_price_follow_price_rule;
	}

	public int getTermId() {
		return termId;
	}

	public void setTermId(int termId) {
		this.termId = termId;
	}

	public boolean isUse_profit_margin() {
		return use_profit_margin;
	}

	public void setUse_profit_margin(boolean use_profit_margin) {
		this.use_profit_margin = use_profit_margin;
	}

}
