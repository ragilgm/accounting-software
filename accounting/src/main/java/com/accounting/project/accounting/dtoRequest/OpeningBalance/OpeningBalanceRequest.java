package com.accounting.project.accounting.dtoRequest.OpeningBalance;

import java.util.List;

public class OpeningBalanceRequest {

	private String transaction_date;
	private String person_id;
	private List<AccountLine> accountLine;

	public OpeningBalanceRequest() {
		// TODO Auto-generated constructor stub
	}

	public OpeningBalanceRequest(String transaction_date, String person_id, List<AccountLine> accountLine) {
		super();
		this.transaction_date = transaction_date;
		this.person_id = person_id;
		this.accountLine = accountLine;
	}

	public String getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}

	public String getPerson_id() {
		return person_id;
	}

	public void setPerson_id(String person_id) {
		this.person_id = person_id;
	}

	public List<AccountLine> getAccountLines() {
		return accountLine;
	}

	public void setAccountLines(List<AccountLine> accountLine) {
		this.accountLine = accountLine;
	}

}
