package com.accounting.project.accounting.dtoResponse.account;

public class ParentResponse {

	private int id;
	private String name;

	public ParentResponse() {
		super();
	}

	public ParentResponse(int id, String name) {
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

}