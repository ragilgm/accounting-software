package com.accounting.project.accounting.dtoResponse.ProductCategory;

public class ProductCategoryResponse {

	private int id;
	private String name;
	private int count_product;

	public ProductCategoryResponse(int id, String name, int count_product) {
		super();
		this.id = id;
		this.name = name;
		this.count_product = count_product;
	}

	public int getCount_product() {
		return count_product;
	}

	public void setCount_product(int count_product) {
		this.count_product = count_product;
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

	public ProductCategoryResponse() {
		// TODO Auto-generated constructor stub
	}

}
