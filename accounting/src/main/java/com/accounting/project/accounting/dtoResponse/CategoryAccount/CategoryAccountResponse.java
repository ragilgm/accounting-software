package com.accounting.project.accounting.dtoResponse.CategoryAccount;



import java.io.Serializable;
public class CategoryAccountResponse implements Serializable{

	 private static final long serialVersionUID = 7156526077883281623L;

	private int id;
	private String categoryName;
	
	
	public CategoryAccountResponse() {
		super();
	}
	public CategoryAccountResponse(int id, String categoryName) {
		super();
		this.id = id;

		this.categoryName = categoryName;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	

	

}
