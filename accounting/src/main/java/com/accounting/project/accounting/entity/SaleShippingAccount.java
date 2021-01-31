package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sales_shipping_account")
public class SaleShippingAccount {

	@Id
	private int id;
	private String name;
	private String number;
	private int category_id;

	public SaleShippingAccount() {
		super();
	}

	public SaleShippingAccount(int id, String name, String number, int category_id) {
		super();
		this.id = id;
		this.name = name;
		this.number = number;
		this.category_id = category_id;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

}
