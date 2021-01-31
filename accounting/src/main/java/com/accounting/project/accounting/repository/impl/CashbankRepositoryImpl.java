//package com.accounting.project.accounting.repository.impl;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.accounting.project.accounting.entity.CashBank;
//import com.accounting.project.accounting.repository.CashbankRepository;
//
//@Service
//public class CashbankRepositoryImpl {
//
//	@Autowired
//	private CashbankRepository cashbankRepository;
//	
//	
//	public List<CashBank> listCashBank(){
//		return cashbankRepository.findAll();
//	}
//	
//	public CashBank getCashBankById(int id) {
//		return cashbankRepository.findCashbankById(id);
//	}
//	
//	public CashBank addCashBank(CashBank cashBank) {
//		return cashbankRepository.save(cashBank);
//	}
//	
//	public CashBank editCashBank(int id, CashBank cashBank) {
//		CashBank currenCashBank = cashbankRepository.findCashbankById(id);
//		currenCashBank.setCode(cashBank.getCode());
//		currenCashBank.setType(cashBank.getType());
//		currenCashBank.setAccount(cashBank.getAccount());
//		currenCashBank.setCurrency_id(cashBank.getCurrency_id());
//		currenCashBank.setSaldo(cashBank.getSaldo());
//		currenCashBank.setTotal_demand_deposits_out(cashBank.getTotal_demand_deposits_out());
//		currenCashBank.setInformation(cashBank.getInformation());
//		return cashbankRepository.save(currenCashBank);
//	}
//	
//	public void deletecashBank(int id) {
//		cashbankRepository.deleteById(id);
//	}
//}
