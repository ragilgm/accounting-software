package com.accounting.project.accounting.dtoResponse.company;

public class PreferredInvoiceTerm {

	private int id;
	private String name;
	private int longetivity;

	public PreferredInvoiceTerm() {
	}

	public PreferredInvoiceTerm(int id, String name, int longetivity) {
		super();
		this.id = id;
		this.name = name;
		this.longetivity = longetivity;
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

	public int getLongetivity() {
		return longetivity;
	}

	public void setLongetivity(int longetivity) {
		this.longetivity = longetivity;
	}

}
