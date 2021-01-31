package com.accounting.project.accounting.dtoRequest.company;

public class PurchaseSettingRequset {

	private String default_purchase_order_message;
	private boolean discount_lines_purchase;
	private boolean discount_purchase;
	private int termId;

	public PurchaseSettingRequset(String default_purchase_order_message, boolean discount_lines_purchase,
			boolean discount_purchase, int termId) {
		super();
		this.default_purchase_order_message = default_purchase_order_message;
		this.discount_lines_purchase = discount_lines_purchase;
		this.discount_purchase = discount_purchase;
		this.termId = termId;
	}

	public PurchaseSettingRequset() {
		super();
	}

	public String getDefault_purchase_order_message() {
		return default_purchase_order_message;
	}

	public void setDefault_purchase_order_message(String default_purchase_order_message) {
		this.default_purchase_order_message = default_purchase_order_message;
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

	public int getTermId() {
		return termId;
	}

	public void setTermId(int termId) {
		this.termId = termId;
	}

}
