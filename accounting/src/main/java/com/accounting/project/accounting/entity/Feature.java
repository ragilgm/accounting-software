package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "feature")
public class Feature{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
    private boolean use_po;
    private boolean warehouse;
    private boolean quote;
    private boolean print_receipt;
    private boolean draft_cash_transaction;
    private boolean enable_overpayment;
    private boolean use_screen_sharing;
    private boolean use_new_bank_recon;
    
	public Feature(boolean use_po, boolean warehouse, boolean quote, boolean print_receipt,
			boolean draft_cash_transaction, boolean enable_overpayment, boolean use_screen_sharing,
			boolean use_new_bank_recon) {
		super();
		this.use_po = use_po;
		this.warehouse = warehouse;
		this.quote = quote;
		this.print_receipt = print_receipt;
		this.draft_cash_transaction = draft_cash_transaction;
		this.enable_overpayment = enable_overpayment;
		this.use_screen_sharing = use_screen_sharing;
		this.use_new_bank_recon = use_new_bank_recon;
	}
		
	public Feature() {
		super();
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isUse_po() {
		return use_po;
	}
	public void setUse_po(boolean use_po) {
		this.use_po = use_po;
	}
	public boolean isWarehouse() {
		return warehouse;
	}
	public void setWarehouse(boolean warehouse) {
		this.warehouse = warehouse;
	}
	public boolean isQuote() {
		return quote;
	}
	public void setQuote(boolean quote) {
		this.quote = quote;
	}
	public boolean isPrint_receipt() {
		return print_receipt;
	}
	public void setPrint_receipt(boolean print_receipt) {
		this.print_receipt = print_receipt;
	}
	public boolean isDraft_cash_transaction() {
		return draft_cash_transaction;
	}
	public void setDraft_cash_transaction(boolean draft_cash_transaction) {
		this.draft_cash_transaction = draft_cash_transaction;
	}
	public boolean isEnable_overpayment() {
		return enable_overpayment;
	}
	public void setEnable_overpayment(boolean enable_overpayment) {
		this.enable_overpayment = enable_overpayment;
	}
	public boolean isUse_screen_sharing() {
		return use_screen_sharing;
	}
	public void setUse_screen_sharing(boolean use_screen_sharing) {
		this.use_screen_sharing = use_screen_sharing;
	}
	public boolean isUse_new_bank_recon() {
		return use_new_bank_recon;
	}
	public void setUse_new_bank_recon(boolean use_new_bank_recon) {
		this.use_new_bank_recon = use_new_bank_recon;
	}
    
    
    
    
}