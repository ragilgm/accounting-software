package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TransactionAccountLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String description;
	private double debit;
	private double credit;
	private String credit_currency_format;
	private String debit_currency_format;
	private int account_id;
	private String accountName;
	private String account_number;

	public TransactionAccountLine(String description, double debit, double credit, String credit_currency_format,
			String debit_currency_format, int account_id, String accountName, String account_number) {
		super();
		this.description = description;
		this.debit = debit;
		this.credit = credit;
		this.credit_currency_format = credit_currency_format;
		this.debit_currency_format = debit_currency_format;
		this.account_id = account_id;
		this.accountName = accountName;
		this.setAccount_number(account_number);
	}

	public TransactionAccountLine() {
		super();
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getDebit() {
		return debit;
	}

	public void setDebit(double debit) {
		this.debit = debit;
	}

	public double getCredit() {
		return credit;
	}

	public void setCredit(double credit) {
		this.credit = credit;
	}

	public String getCredit_currency_format() {
		return credit_currency_format;
	}

	public void setCredit_currency_format(String credit_currency_format) {
		this.credit_currency_format = credit_currency_format;
	}

	public String getDebit_currency_format() {
		return debit_currency_format;
	}

	public void setDebit_currency_format(String debit_currency_format) {
		this.debit_currency_format = debit_currency_format;
	}

	public int getAccount_id() {
		return account_id;
	}

	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getAccount_number() {
		return account_number;
	}

	public void setAccount_number(String account_number) {
		this.account_number = account_number;
	}

}
