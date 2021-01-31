package com.accounting.project.accounting.dtoRequest.company;

public class UpdateProductStock {

	private boolean show_stock;

	public UpdateProductStock(boolean show_stock) {
		super();
		this.show_stock = show_stock;
	}

	public UpdateProductStock() {
		// TODO Auto-generated constructor stub
	}

	public boolean isShow_stock() {
		return show_stock;
	}

	public void setShow_stock(boolean show_stock) {
		this.show_stock = show_stock;
	}

}
