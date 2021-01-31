package com.accounting.project.accounting.dtoRequest.BankTransfer;

import org.springframework.web.multipart.MultipartFile;

public class BankTransferRequest {
	private int company_id;
	private String refund_from_name;
	private String deposit_to_name;
	private String transaction_date;
	private String transaction_no;
	private String transaction_number_format;
	private String memo;
	private int transfer_amount;

	public BankTransferRequest() {
		super();
	}

	public BankTransferRequest(int company_id, String refund_from_name, String deposit_to_name, String transaction_date,
			String transaction_no, String transaction_number_format, String memo, int transfer_amount) {
		super();
		this.company_id = company_id;
		this.refund_from_name = refund_from_name;
		this.deposit_to_name = deposit_to_name;
		this.transaction_date = transaction_date;
		this.transaction_no = transaction_no;
		this.transaction_number_format = transaction_number_format;
		this.memo = memo;
		this.transfer_amount = transfer_amount;
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public String getRefund_from_name() {
		return refund_from_name;
	}

	public void setRefund_from_name(String refund_from_name) {
		this.refund_from_name = refund_from_name;
	}

	public String getDeposit_to_name() {
		return deposit_to_name;
	}

	public void setDeposit_to_name(String deposit_to_name) {
		this.deposit_to_name = deposit_to_name;
	}

	public String getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}

	public String getTransaction_no() {
		return transaction_no;
	}

	public void setTransaction_no(String transaction_no) {
		this.transaction_no = transaction_no;
	}

	public String getTransaction_number_format() {
		return transaction_number_format;
	}

	public void setTransaction_number_format(String transaction_number_format) {
		this.transaction_number_format = transaction_number_format;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public int getTransfer_amount() {
		return transfer_amount;
	}

	public void setTransfer_amount(int transfer_amount) {
		this.transfer_amount = transfer_amount;
	}

}
