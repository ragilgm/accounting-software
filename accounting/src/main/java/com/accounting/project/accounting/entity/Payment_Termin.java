package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Payment_Termin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int company_id;
	private String name;
	private int longetivity;
		
	public Payment_Termin() {}

	public Payment_Termin(int company_id, String name, int longetivity) {
		super();
		this.company_id = company_id;
		this.name = name;
		this.longetivity = longetivity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLongetivity() {
		return longetivity;
	}

	public void setLongetivity(int longetivity) {
		this.longetivity = longetivity;
	}
	
	
	
}
