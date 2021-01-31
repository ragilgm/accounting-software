package com.accounting.project.accounting.dtoResponse.company;

public class DefaultPurchaseTaxAccount {
	

	private int id;
	private String category_id;
	private String name;
	private String number;

	public DefaultPurchaseTaxAccount() {
	}

	public DefaultPurchaseTaxAccount(int id, String category_id, String name, String number) {
		super();
		this.id = id;
		this.category_id = category_id;
		this.name = name;
		this.number = number;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCategory_id() {
		return category_id;
	}

	public void setCategory_id(String category_id) {
		this.category_id = category_id;
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
