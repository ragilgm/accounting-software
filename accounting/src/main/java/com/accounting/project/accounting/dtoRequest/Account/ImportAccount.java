package com.accounting.project.accounting.dtoRequest.Account;

import java.util.List;

public class ImportAccount {
	
	private String setupType;
	private List<AccountImportRequest> data;
	
	public ImportAccount() {}
	
	public ImportAccount(String setupType, List<AccountImportRequest> data) {
		super();
		this.setupType = setupType;
		this.data = data;
	}

	public String getSetupType() {
		return setupType;
	}

	public void setSetupType(String setupType) {
		this.setupType = setupType;
	}

	public List<AccountImportRequest> getData() {
		return data;
	}

	public void setData(List<AccountImportRequest> data) {
		this.data = data;
	}
	
	

}
