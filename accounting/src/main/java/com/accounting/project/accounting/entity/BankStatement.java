package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class BankStatement {

	@Id
	private int id;
	private String description;
	private String date;
	private String debit;
	private String credit;
	private String source;
	private String status;

	public BankStatement(String description, String date, String debit, String credit, String source, String status) {
		super();
		this.description = description;
		this.date = date;
		this.debit = debit;
		this.credit = credit;
		this.source = source;
		this.status = status;
	}

	public BankStatement() {
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDebit() {
		return debit;
	}

	public void setDebit(String debit) {
		this.debit = debit;
	}

	public String getCredit() {
		return credit;
	}

	public void setCredit(String credit) {
		this.credit = credit;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}