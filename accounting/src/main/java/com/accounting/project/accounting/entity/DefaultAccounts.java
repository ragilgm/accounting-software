package com.accounting.project.accounting.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "default_Accounts")
public class DefaultAccounts {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private int default_sale_account;
	private int sale_discount_account;
	private int default_sales_return_account;
	private int sale_shipping_account;
	private int default_prepayment_account;
	private int default_unbilled_sales_account;
	private int default_unbilled_ar_account;
	private int default_cost_of_good_sold;
	private int purchase_shipping_account;
	private int default_unearned_revenue_account;
	private int default_unbilled_ap_account;
	private int default_account_receiveable;
	private int default_account_payable;
	private int default_inventory_account;
	private int default_stock_adj_account_general;
	private int default_stock_adj_account_waste;
	private int default_stock_adj_account_production;
	private int default_opening_balance_equity;
	private int default_sale_tax_account;
	private int default_purchase_tax_account;
	private int default_fixed_asset_account;

	public DefaultAccounts() {
		super();
	}

	public DefaultAccounts(int default_sale_account, int sale_discount_account, int default_sales_return_account,
			int sale_shipping_account, int default_prepayment_account, int default_unbilled_sales_account,
			int default_unbilled_ar_account, int default_cost_of_good_sold, int purchase_shipping_account,
			int default_unearned_revenue_account, int default_unbilled_ap_account, int default_account_receiveable,
			int default_account_payable, int default_inventory_account, int default_stock_adj_account_general,
			int default_stock_adj_account_waste, int default_stock_adj_account_production,
			int default_opening_balance_equity, int default_sale_tax_account, int default_purchase_tax_account,
			int default_fixed_asset_account) {
		super();
		this.default_sale_account = default_sale_account;
		this.sale_discount_account = sale_discount_account;
		this.default_sales_return_account = default_sales_return_account;
		this.sale_shipping_account = sale_shipping_account;
		this.default_prepayment_account = default_prepayment_account;
		this.default_unbilled_sales_account = default_unbilled_sales_account;
		this.default_unbilled_ar_account = default_unbilled_ar_account;
		this.default_cost_of_good_sold = default_cost_of_good_sold;
		this.purchase_shipping_account = purchase_shipping_account;
		this.default_unearned_revenue_account = default_unearned_revenue_account;
		this.default_unbilled_ap_account = default_unbilled_ap_account;
		this.default_account_receiveable = default_account_receiveable;
		this.default_account_payable = default_account_payable;
		this.default_inventory_account = default_inventory_account;
		this.default_stock_adj_account_general = default_stock_adj_account_general;
		this.default_stock_adj_account_waste = default_stock_adj_account_waste;
		this.default_stock_adj_account_production = default_stock_adj_account_production;
		this.default_opening_balance_equity = default_opening_balance_equity;
		this.default_sale_tax_account = default_sale_tax_account;
		this.default_purchase_tax_account = default_purchase_tax_account;
		this.default_fixed_asset_account = default_fixed_asset_account;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getDefault_sale_account() {
		return default_sale_account;
	}

	public void setDefault_sale_account(int default_sale_account) {
		this.default_sale_account = default_sale_account;
	}

	public int getSale_discount_account() {
		return sale_discount_account;
	}

	public void setSale_discount_account(int sale_discount_account) {
		this.sale_discount_account = sale_discount_account;
	}

	public int getDefault_sales_return_account() {
		return default_sales_return_account;
	}

	public void setDefault_sales_return_account(int default_sales_return_account) {
		this.default_sales_return_account = default_sales_return_account;
	}

	public int getSale_shipping_account() {
		return sale_shipping_account;
	}

	public void setSale_shipping_account(int sale_shipping_account) {
		this.sale_shipping_account = sale_shipping_account;
	}

	public int getDefault_prepayment_account() {
		return default_prepayment_account;
	}

	public void setDefault_prepayment_account(int default_prepayment_account) {
		this.default_prepayment_account = default_prepayment_account;
	}

	public int getDefault_unbilled_sales_account() {
		return default_unbilled_sales_account;
	}

	public void setDefault_unbilled_sales_account(int default_unbilled_sales_account) {
		this.default_unbilled_sales_account = default_unbilled_sales_account;
	}

	public int getDefault_unbilled_ar_account() {
		return default_unbilled_ar_account;
	}

	public void setDefault_unbilled_ar_account(int default_unbilled_ar_account) {
		this.default_unbilled_ar_account = default_unbilled_ar_account;
	}

	public int getDefault_cost_of_good_sold() {
		return default_cost_of_good_sold;
	}

	public void setDefault_cost_of_good_sold(int default_cost_of_good_sold) {
		this.default_cost_of_good_sold = default_cost_of_good_sold;
	}

	public int getPurchase_shipping_account() {
		return purchase_shipping_account;
	}

	public void setPurchase_shipping_account(int purchase_shipping_account) {
		this.purchase_shipping_account = purchase_shipping_account;
	}

	public int getDefault_unearned_revenue_account() {
		return default_unearned_revenue_account;
	}

	public void setDefault_unearned_revenue_account(int default_unearned_revenue_account) {
		this.default_unearned_revenue_account = default_unearned_revenue_account;
	}

	public int getDefault_unbilled_ap_account() {
		return default_unbilled_ap_account;
	}

	public void setDefault_unbilled_ap_account(int default_unbilled_ap_account) {
		this.default_unbilled_ap_account = default_unbilled_ap_account;
	}

	public int getDefault_account_receiveable() {
		return default_account_receiveable;
	}

	public void setDefault_account_receiveable(int default_account_receiveable) {
		this.default_account_receiveable = default_account_receiveable;
	}

	public int getDefault_account_payable() {
		return default_account_payable;
	}

	public void setDefault_account_payable(int default_account_payable) {
		this.default_account_payable = default_account_payable;
	}

	public int getDefault_inventory_account() {
		return default_inventory_account;
	}

	public void setDefault_inventory_account(int default_inventory_account) {
		this.default_inventory_account = default_inventory_account;
	}

	public int getDefault_stock_adj_account_general() {
		return default_stock_adj_account_general;
	}

	public void setDefault_stock_adj_account_general(int default_stock_adj_account_general) {
		this.default_stock_adj_account_general = default_stock_adj_account_general;
	}

	public int getDefault_stock_adj_account_waste() {
		return default_stock_adj_account_waste;
	}

	public void setDefault_stock_adj_account_waste(int default_stock_adj_account_waste) {
		this.default_stock_adj_account_waste = default_stock_adj_account_waste;
	}

	public int getDefault_stock_adj_account_production() {
		return default_stock_adj_account_production;
	}

	public void setDefault_stock_adj_account_production(int default_stock_adj_account_production) {
		this.default_stock_adj_account_production = default_stock_adj_account_production;
	}

	public int getDefault_opening_balance_equity() {
		return default_opening_balance_equity;
	}

	public void setDefault_opening_balance_equity(int default_opening_balance_equity) {
		this.default_opening_balance_equity = default_opening_balance_equity;
	}

	public int getDefault_sale_tax_account() {
		return default_sale_tax_account;
	}

	public void setDefault_sale_tax_account(int default_sale_tax_account) {
		this.default_sale_tax_account = default_sale_tax_account;
	}

	public int getDefault_purchase_tax_account() {
		return default_purchase_tax_account;
	}

	public void setDefault_purchase_tax_account(int default_purchase_tax_account) {
		this.default_purchase_tax_account = default_purchase_tax_account;
	}

	public int getDefault_fixed_asset_account() {
		return default_fixed_asset_account;
	}

	public void setDefault_fixed_asset_account(int default_fixed_asset_account) {
		this.default_fixed_asset_account = default_fixed_asset_account;
	}

}