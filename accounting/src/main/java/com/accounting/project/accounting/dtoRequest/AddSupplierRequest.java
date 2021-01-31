package com.accounting.project.accounting.dtoRequest;

public class AddSupplierRequest {

	private String supplierName;
	private String companyName;
	private String phone;
	private String email;
	private String address;
	private String city;
	private String country;
	private String zipCode;
	private String note;
	
	public AddSupplierRequest(String supplierName, String companyName, String phone, String email, String address,
			String city, String country, String zipCode, String note) {
		super();
		this.supplierName = supplierName;
		this.companyName = companyName;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.city = city;
		this.country = country;
		this.zipCode = zipCode;
		this.note = note;
	}
	
	AddSupplierRequest(){}
	
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
	

}
