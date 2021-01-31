package com.accounting.project.accounting.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tax")
public class Tax implements Serializable{

	 private static final long serialVersionUID = 7156526077883281623L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private int id;
	private String taxName;
	private int value;
	
	public Tax(String taxName, int value) {
		super();
		this.taxName = taxName;
		this.value = value;
	}

	public Tax() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getTaxName() {
		return taxName;
	}

	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}
	
	

}
