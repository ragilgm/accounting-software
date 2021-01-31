package com.accounting.project.accounting.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class HistoryOfBankStatement {

	@Id
	private int id;
	private int company_id;
	private String bank_name;
	private String account_no;
	private String account_name;
	private String account_number;

	@OneToMany(cascade = CascadeType.ALL, targetEntity = BankStatement.class)
	@JoinColumn(name = "header_id", referencedColumnName = "id")
	private List<BankStatement> bankStatements;

	public HistoryOfBankStatement(int id, int company_id, String bank_name, String account_no, String account_name,
			String account_number, List<BankStatement> bankStatements) {
		super();
		this.id = id;
		this.company_id = company_id;
		this.bank_name = bank_name;
		this.account_no = account_no;
		this.account_name = account_name;
		this.account_number = account_number;
		this.bankStatements = bankStatements;
	}

	public HistoryOfBankStatement() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBank_name() {
		return bank_name;
	}

	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	public String getAccount_no() {
		return account_no;
	}

	public void setAccount_no(String account_no) {
		this.account_no = account_no;
	}

	public String getAccount_name() {
		return account_name;
	}

	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}

	public String getAccount_number() {
		return account_number;
	}

	public void setAccount_number(String account_number) {
		this.account_number = account_number;
	}

	public List<BankStatement> getBankStatements() {
		return bankStatements;
	}

	public void setBankStatements(List<BankStatement> bankStatements) {
		this.bankStatements = bankStatements;
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

}
