package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "company_bank_detail")
public class CompanyBankDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String bank_name;
	private String bank_branch;
	private String bank_address;
	private String account_number;
	private String account_name;
	private String swift_code;

	public CompanyBankDetail() {
		super();
	}

	public CompanyBankDetail(String bank_name, String bank_branch, String bank_address, String account_number,
			String account_name, String swift_code) {
		super();
		this.bank_name = bank_name;
		this.bank_branch = bank_branch;
		this.bank_address = bank_address;
		this.account_number = account_number;
		this.account_name = account_name;
		this.swift_code = swift_code;
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

	public String getBank_branch() {
		return bank_branch;
	}

	public void setBank_branch(String bank_branch) {
		this.bank_branch = bank_branch;
	}

	public String getBank_address() {
		return bank_address;
	}

	public void setBank_address(String bank_address) {
		this.bank_address = bank_address;
	}

	public String getAccount_number() {
		return account_number;
	}

	public void setAccount_number(String account_number) {
		this.account_number = account_number;
	}

	public String getAccount_name() {
		return account_name;
	}

	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}

	public String getSwift_code() {
		return swift_code;
	}

	public void setSwift_code(String swift_code) {
		this.swift_code = swift_code;
	}

}