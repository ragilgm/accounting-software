package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="company_billing_Details")
public class CompanyBillingDetails{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    public int id;
    public String name;
    public int expired_day;
    public String billing_package;
    public int jurnal_touch_devices;
    
	public CompanyBillingDetails(int id, String name, int expired_day, String billing_package,
			int jurnal_touch_devices) {
		super();
		this.id = id;
		this.name = name;
		this.expired_day = expired_day;
		this.billing_package = billing_package;
		this.jurnal_touch_devices = jurnal_touch_devices;
	}

	public CompanyBillingDetails() {
		super();
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

	public int getExpired_day() {
		return expired_day;
	}

	public void setExpired_day(int expired_day) {
		this.expired_day = expired_day;
	}

	public String getBilling_package() {
		return billing_package;
	}

	public void setBilling_package(String billing_package) {
		this.billing_package = billing_package;
	}

	public int getJurnal_touch_devices() {
		return jurnal_touch_devices;
	}

	public void setJurnal_touch_devices(int jurnal_touch_devices) {
		this.jurnal_touch_devices = jurnal_touch_devices;
	}
    
    
    
    
}