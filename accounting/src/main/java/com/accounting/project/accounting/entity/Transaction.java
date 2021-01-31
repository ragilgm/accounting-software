package com.accounting.project.accounting.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String date;
	private int account_id;
	private int transaction_id;
	private int journal_id;
	private String transaction_type;
	private String transaction_no;
	private String transaction_no_format;
	private String person_id;
	private String person_name;
	private String person_type;
	private double debit;
	private double credit;
	private double balance;
	private Date createdAt;

	public Transaction() {
		super();
	}

	public Transaction(String date, int account_id, int transaction_id, int journal_id, String transaction_type,
			String transaction_no, String transaction_no_format, String person_id, String person_name,
			String person_type, double debit, double credit, double balance, Date createdAt) {
		super();
		this.date = date;
		this.account_id = account_id;
		this.transaction_id = transaction_id;
		this.journal_id = journal_id;
		this.transaction_type = transaction_type;
		this.transaction_no = transaction_no;
		this.transaction_no_format = transaction_no_format;
		this.person_id = person_id;
		this.person_name = person_name;
		this.person_type = person_type;
		this.debit = debit;
		this.credit = credit;
		this.balance = balance;
		this.createdAt = createdAt;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getAccount_id() {
		return account_id;
	}

	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}

	public int getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(int transaction_id) {
		this.transaction_id = transaction_id;
	}

	public int getJournal_id() {
		return journal_id;
	}

	public void setJournal_id(int journal_id) {
		this.journal_id = journal_id;
	}

	public String getTransaction_type() {
		return transaction_type;
	}

	public void setTransaction_type(String transaction_type) {
		this.transaction_type = transaction_type;
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

	public String getPerson_id() {
		return person_id;
	}

	public void setPerson_id(String person_id) {
		this.person_id = person_id;
	}

	public String getPerson_name() {
		return person_name;
	}

	public void setPerson_name(String person_name) {
		this.person_name = person_name;
	}

	public String getPerson_type() {
		return person_type;
	}

	public void setPerson_type(String person_type) {
		this.person_type = person_type;
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

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

}
