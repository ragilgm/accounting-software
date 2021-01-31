package com.accounting.project.accounting.dtoRequest.productCategory;

public class ProductCategoryRequest {

	private String name;

	public ProductCategoryRequest(String name) {
		super();
		this.name = name;
	}

	public ProductCategoryRequest() {
		super();
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
