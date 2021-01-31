package com.accounting.project.accounting.dtoResponse.Reversal;

import java.util.Date;
import java.util.List;
import com.accounting.project.accounting.entity.TransactionAccountLine;
import com.accounting.project.accounting.entity.TransactionStatus;

public class ReversalResponse {

	private int id;
	private String transaction_no;
	private String transaction_no_format;
	private String memo;
	private String transaction_date;
	private TransactionStatus transaction_status;
	private List<TransactionAccountLine> transaction_account_lines;
	private double total_debit;
	private double total_credit;
	private String total_debit_currency_format;
	private String total_credit_currency_format;
	private Date created_at;
	private Date updated_at;
	private String currency_code;

	public ReversalResponse(int id, String transaction_no, String transaction_no_format, String memo,
			String transaction_date, TransactionStatus transaction_status,
			List<TransactionAccountLine> transaction_account_lines, double total_debit, double total_credit,
			String total_debit_currency_format, String total_credit_currency_format, Date created_at, Date updated_at,
			String currency_code) {
		super();
		this.id = id;
		this.transaction_no = transaction_no;
		this.transaction_no_format = transaction_no_format;
		this.memo = memo;
		this.transaction_date = transaction_date;
		this.transaction_status = transaction_status;
		this.transaction_account_lines = transaction_account_lines;
		this.total_debit = total_debit;
		this.total_credit = total_credit;
		this.total_debit_currency_format = total_debit_currency_format;
		this.total_credit_currency_format = total_credit_currency_format;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.currency_code = currency_code;
	}

	public ReversalResponse() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTransaction_no() {
		return transaction_no;
	}

	public void setTransaction_no(String transaction_no) {
		this.transaction_no = transaction_no;
	}

	public String getTransaction_no_format() {
		return transaction_no_format;
	}

	public void setTransaction_no_format(String transaction_no_format) {
		this.transaction_no_format = transaction_no_format;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}

	public TransactionStatus getTransaction_status() {
		return transaction_status;
	}

	public void setTransaction_status(TransactionStatus transaction_status) {
		this.transaction_status = transaction_status;
	}

	public List<TransactionAccountLine> getTransaction_account_lines() {
		return transaction_account_lines;
	}

	public void setTransaction_account_lines(List<TransactionAccountLine> transaction_account_lines) {
		this.transaction_account_lines = transaction_account_lines;
	}

	public double getTotal_debit() {
		return total_debit;
	}

	public void setTotal_debit(double total_debit) {
		this.total_debit = total_debit;
	}

	public double getTotal_credit() {
		return total_credit;
	}

	public void setTotal_credit(double total_credit) {
		this.total_credit = total_credit;
	}

	public String getTotal_debit_currency_format() {
		return total_debit_currency_format;
	}

	public void setTotal_debit_currency_format(String total_debit_currency_format) {
		this.total_debit_currency_format = total_debit_currency_format;
	}

	public String getTotal_credit_currency_format() {
		return total_credit_currency_format;
	}

	public void setTotal_credit_currency_format(String total_credit_currency_format) {
		this.total_credit_currency_format = total_credit_currency_format;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
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

}
