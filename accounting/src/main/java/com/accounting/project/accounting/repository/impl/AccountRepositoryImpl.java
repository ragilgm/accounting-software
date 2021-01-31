package com.accounting.project.accounting.repository.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.repository.AccountRepository;

@Service
public class AccountRepositoryImpl {

	@Autowired
	private AccountRepository accountRepository;
	
	public List<Account> getAllAccount(int id){
		return accountRepository.getAllAccountByCompany(id);
	}
	
	public Account addAccount(Account account) {
		return accountRepository.save(account);
	}
	
	public Account findAccountById(int id) {
		return accountRepository.getOne(id);
	}
	
	public Account findAccountByAccountNumber(int i, String number) {
		return accountRepository.findAccountByNumber( i,number);
	}
//	
//	public Account editAccount(int id, Account account) {
//		Account currentAccount = findAccountById(id);
//		currentAccount.setAccount_code(account.getAccount_code());
//		currentAccount.setAccount_name(account.getAccount_name());
//		currentAccount.setBalance(account.getBalance());
//		currentAccount.setDescription(account.getDescription());
//		
//		return accountRepository.save(currentAccount);
//	}
	
	public void deleteAccount(int id) {
		accountRepository.deleteById(id);
	}

	public Account findAccountByName(int company_id,String accountName) {
	
		return accountRepository.findByName(company_id,accountName);
	}
	
	
	public List<Account> findByParentId(int company_id,int parentid) {
		return accountRepository.findByParentId(company_id,parentid);
	}

	public List<Account> seachAccount(String q) {
		return accountRepository.seachAccount(q);
	}

	public List<Account> findByCategoryName(int company_id, String category_name) {
		return accountRepository.findAccountByCategoryName(company_id,category_name);
	}

	public List<Account> findByCategoryId(int company_id, String category_id) {
		return accountRepository.findAccountByCategoryId(company_id,category_id);
	}


	
}
