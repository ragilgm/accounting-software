package com.accounting.project.accounting.dtoResponse.company;

public class CompanyCurrencyResponse {

	private int id;
	private String country;
	private String code;
	private String symbol;
	private String currency_in_words;

	public CompanyCurrencyResponse() {
		super();
	}

	public CompanyCurrencyResponse(int id, String country, String code, String symbol, String currency_in_words) {
		super();
		this.id = id;
		this.country = country;
		this.code = code;
		this.symbol = symbol;
		this.currency_in_words = currency_in_words;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getCurrency_in_words() {
		return currency_in_words;
	}

	public void setCurrency_in_words(String currency_in_words) {
		this.currency_in_words = currency_in_words;
	}

}
