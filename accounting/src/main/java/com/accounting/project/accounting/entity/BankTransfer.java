package com.accounting.project.accounting.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class BankTransfer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int company_id;
	private double transfer_amount;
	private int journal_id;
	private String transaction_no;
	private String transaction_no_format;
	private String memo;
	private String transaction_date;
	private int transaction_status_id;
	private int refund_id;
	private String refund_from;
	private int original_amount;
	private String original_amount_currency_format;
	private int deposit_id;
	private String deposit_to;
	@ElementCollection
	private List<String> attachments;
	private boolean locked;
	private boolean is_reconciled;
	private Date createdAt;
	private Date updatedAt;

	public BankTransfer(int company_id, double transfer_amount, int journal_id, String transaction_no,
			String transaction_no_format, String memo, String transaction_date, int transaction_status_id,
			int refund_id, String refund_from, int original_amount, String original_amount_currency_format,
			int deposit_id, String deposit_to, List<String> attachments, boolean locked, boolean is_reconciled,
			Date createdAt, Date updatedAt) {
		super();
		this.company_id = company_id;
		this.transfer_amount = transfer_amount;
		this.journal_id = journal_id;
		this.transaction_no = transaction_no;
		this.transaction_no_format = transaction_no_format;
		this.memo = memo;
		this.transaction_date = transaction_date;
		this.transaction_status_id = transaction_status_id;
		this.refund_id = refund_id;
		this.refund_from = refund_from;
		this.original_amount = original_amount;
		this.original_amount_currency_format = original_amount_currency_format;
		this.deposit_id = deposit_id;
		this.deposit_to = deposit_to;
		this.attachments = attachments;
		this.locked = locked;
		this.is_reconciled = is_reconciled;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public BankTransfer() {
		// TODO Auto-generated constructor stub
	}

	public int getTransaction_status_id() {
		return transaction_status_id;
	}

	public void setTransaction_status_id(int transaction_status_id) {
		this.transaction_status_id = transaction_status_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public double getTransfer_amount() {
		return transfer_amount;
	}

	public void setTransfer_amount(double transfer_amount) {
		this.transfer_amount = transfer_amount;
	}

	public String getTransaction_no() {
		return transaction_no;
	}

	public void setTransaction_no(String transaction_no) {
		this.transaction_no = transaction_no;
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

	public int getRefund_id() {
		return refund_id;
	}

	public void setRefund_id(int refund_id) {
		this.refund_id = refund_id;
	}

	public String getRefund_from() {
		return refund_from;
	}

	public void setRefund_from(String refund_from) {
		this.refund_from = refund_from;
	}

	public int getOriginal_amount() {
		return original_amount;
	}

	public void setOriginal_amount(int original_amount) {
		this.original_amount = original_amount;
	}

	public String getOriginal_amount_currency_format() {
		return original_amount_currency_format;
	}

	public void setOriginal_amount_currency_format(String original_amount_currency_format) {
		this.original_amount_currency_format = original_amount_currency_format;
	}

	public int getDeposit_id() {
		return deposit_id;
	}

	public void setDeposit_id(int deposit_id) {
		this.deposit_id = deposit_id;
	}

	public String getDeposit_to() {
		return deposit_to;
	}

	public void setDeposit_to(String deposit_to) {
		this.deposit_to = deposit_to;
	}

	public List<String> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<String> attachments) {
		this.attachments = attachments;
	}

	public boolean isLocked() {
		return locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public boolean isIs_reconciled() {
		return is_reconciled;
	}

	public void setIs_reconciled(boolean is_reconciled) {
		this.is_reconciled = is_reconciled;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getTransaction_no_format() {
		return transaction_no_format;
	}

	public void setTransaction_no_format(String transaction_no_format) {
		this.transaction_no_format = transaction_no_format;
	}

	public int getJournal_id() {
		return journal_id;
	}

	public void setJournal_id(int journal_id) {
		this.journal_id = journal_id;
	}

}
