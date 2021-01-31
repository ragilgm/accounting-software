package com.accounting.project.accounting.dtoRequest.Account;

import java.util.List;

public class AccountRequest {
	
    private String name;
    private String description;
    private String number;
    private String category_name;
    private boolean as_a_child;
    private String parentName;
    private boolean as_a_parent;
    private String company_tax_name;
    private List<String> children_names;
    private String custom_id;

	public AccountRequest(String name, String description, String number, String category_name, boolean as_a_child,
			String parentName, boolean as_a_parent, String company_tax_name, List<String> children_names,
			String custom_id) {
		super();
		this.name = name;
		this.description = description;
		this.number = number;
		this.category_name = category_name;
		this.as_a_child = as_a_child;
		this.parentName = parentName;
		this.as_a_parent = as_a_parent;
		this.company_tax_name = company_tax_name;
		this.children_names = children_names;
		this.custom_id = custom_id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public boolean isAs_a_child() {
		return as_a_child;
	}
	public void setAs_a_child(boolean as_a_child) {
		this.as_a_child = as_a_child;
	}
	public String getParentName() {
		return parentName;
	}
	public void setParentName(String parent_category_name) {
		this.parentName = parent_category_name;
	}
	public boolean isAs_a_parent() {
		return as_a_parent;
	}
	public void setAs_a_parent(boolean as_a_parent) {
		this.as_a_parent = as_a_parent;
	}
	public String getCompany_tax_name() {
		return company_tax_name;
	}
	public void setCompany_tax_name(String company_tax_name) {
		this.company_tax_name = company_tax_name;
	}
	public List<String> getChildren_names() {
		return children_names;
	}
	public void setChildren_names(List<String> children_names) {
		this.children_names = children_names;
	}
	public String getCustom_id() {
		return custom_id;
	}
	public void setCustom_id(String custom_id) {
		this.custom_id = custom_id;
	}
    
    
    

}
