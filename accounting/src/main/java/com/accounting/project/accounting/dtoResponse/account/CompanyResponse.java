package com.accounting.project.accounting.dtoResponse.account;

public class CompanyResponse {

	private int id;
	private String name;



	public CompanyResponse(int id, String name) {
		super();
		this.id = id;
		this.name = name;
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

	public CompanyResponse() {
		// TODO Auto-generated constructor stub
	}

}
