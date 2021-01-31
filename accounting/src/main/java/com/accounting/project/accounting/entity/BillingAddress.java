package com.accounting.project.accounting.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class BillingAddress implements Serializable{
	
	 private static final long serialVersionUID = 7156526077883281623L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String billingAddress;
	private String number;
	private String neigbourhood;
	private String hamlet;
	private String postalCode;
	private String urbanVillage;
	private String subDistrict;
	private String district;
	private String province;
	public BillingAddress() {
		super();
	}
	public BillingAddress(int id, String billingAddress, String number, String neigbourhood, String hamlet,
			String postalCode, String urbanVillage, String subDistrict, String district, String province) {
		super();
		this.id = id;
		this.billingAddress = billingAddress;
		this.number = number;
		this.neigbourhood = neigbourhood;
		this.hamlet = hamlet;
		this.postalCode = postalCode;
		this.urbanVillage = urbanVillage;
		this.subDistrict = subDistrict;
		this.district = district;
		this.province = province;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBillingAddress() {
		return billingAddress;
	}
	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getNeigbourhood() {
		return neigbourhood;
	}
	public void setNeigbourhood(String neigbourhood) {
		this.neigbourhood = neigbourhood;
	}
	public String getHamlet() {
		return hamlet;
	}
	public void setHamlet(String hamlet) {
		this.hamlet = hamlet;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getUrbanVillage() {
		return urbanVillage;
	}
	public void setUrbanVillage(String urbanVillage) {
		this.urbanVillage = urbanVillage;
	}
	public String getSubDistrict() {
		return subDistrict;
	}
	public void setSubDistrict(String subDistrict) {
		this.subDistrict = subDistrict;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	
	

}
