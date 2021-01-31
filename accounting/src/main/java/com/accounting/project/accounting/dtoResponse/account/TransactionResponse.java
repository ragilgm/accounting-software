package com.accounting.project.accounting.dtoResponse.account;

public class TransactionResponse {

	private int id;
	private String date;
	private int transaction_id;
	private int journal_id;
	private String transaction_type;
	private String transaction_no;
	private String transaction_no_format;
	private String person_id;
	private String person_name;
	private String person_type;
	private String debit;
	private String credit;
	private String balance;

	

	public TransactionResponse(int id, String date, int transaction_id, int journal_id, String transaction_type,
			String transaction_no, String transaction_no_format, String person_id, String person_name,
			String person_type, String debit, String credit, String balance) {
		super();
		this.id = id;
		this.date = date;
		this.setTransaction_id(transaction_id);
		this.setJournal_id(journal_id);
		this.transaction_type = transaction_type;
		this.transaction_no = transaction_no;
		this.transaction_no_format = transaction_no_format;
		this.person_id = person_id;
		this.person_name = person_name;
		this.person_type = person_type;
		this.debit = debit;
		this.credit = credit;
		this.balance = balance;
	}

	public TransactionResponse() {
		super();
	}

	public TransactionResponse(String date2, String transaction_type2, String transaction_no2,
			String transaction_no_format, String person_id2, String person_name2, String person_type2,
			String balanceString, String balanceString2, String balanceString3) {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTransaction_type() {
		return transaction_type;
	}

	public void setTransaction_type(String transaction_type) {
		this.transaction_type = transaction_type;
	}

	public String getTransaction_no() {
		return transaction_no;
	}

	public void setTransaction_no(String transaction_no) {
		this.transaction_no = transaction_no;
	}

	public String getPerson_id() {
		return person_id;
	}

	public void setPerson_id(String person_id) {
		this.person_id = person_id;
	}

	public String getPerson_name() {
		return person_name;
	}

	public void setPerson_name(String person_name) {
		this.person_name = person_name;
	}

	public String getPerson_type() {
		return person_type;
	}

	public void setPerson_type(String person_type) {
		this.person_type = person_type;
	}

	public String getDebit() {
		return debit;
	}

	public void setDebit(String debit) {
		this.debit = debit;
	}

	public String getCredit() {
		return credit;
	}

	public void setCredit(String credit) {
		this.credit = credit;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public String getTransaction_no_format() {
		return transaction_no_format;
	}

	public void setTransaction_no_format(String transaction_no_format) {
		this.transaction_no_format = transaction_no_format;
	}

	public int getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(int transaction_id) {
		this.transaction_id = transaction_id;
	}

	public int getJournal_id() {
		return journal_id;
	}

	public void setJournal_id(int journal_id) {
		this.journal_id = journal_id;
	}

}
