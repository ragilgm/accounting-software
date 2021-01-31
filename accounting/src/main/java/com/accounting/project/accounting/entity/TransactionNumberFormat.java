package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TransactionNumberFormat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int companyId;
	private int type_id;
	private String startInvoice;
	private int startNumber;
	private String endInvoice;
	private boolean defaultFormat;

	public TransactionNumberFormat() {
		// TODO Auto-generated constructor stub
	}

	public TransactionNumberFormat(int companyId, int type_id, String startInvoice, int startNumber, String endInvoice,
			boolean defaultFormat) {
		super();
		this.companyId = companyId;
		this.type_id = type_id;
		this.startInvoice = startInvoice;
		this.startNumber = startNumber;
		this.endInvoice = endInvoice;
		this.defaultFormat = defaultFormat;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCompanyId() {
		return companyId;
	}

	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}

	public int getType_id() {
		return type_id;
	}

	public void setType_id(int type_id) {
		this.type_id = type_id;
	}

	public String getStartInvoice() {
		return startInvoice;
	}

	public void setStartInvoice(String startInvoice) {
		this.startInvoice = startInvoice;
	}

	public int getStartNumber() {
		return startNumber;
	}

	public void setStartNumber(int startNumber) {
		this.startNumber = startNumber;
	}

	public String getEndInvoice() {
		return endInvoice;
	}

	public void setEndInvoice(String endInvoice) {
		this.endInvoice = endInvoice;
	}

	public boolean isDefaultFormat() {
		return defaultFormat;
	}

	public void setDefaultFormat(boolean defaultFormat) {
		this.defaultFormat = defaultFormat;
	}

}
