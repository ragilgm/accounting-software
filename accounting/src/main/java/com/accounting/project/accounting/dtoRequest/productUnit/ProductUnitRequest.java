package com.accounting.project.accounting.dtoRequest.productUnit;

public class ProductUnitRequest {

	private String name;

	public ProductUnitRequest(String name) {
		super();
		this.name = name;
	}

	public ProductUnitRequest() {
		super();
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
