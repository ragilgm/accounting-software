package com.accounting.project.accounting;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

//import java.io.File;
//import java.io.IOException;
//import java.io.InputStream;
//import java.nio.file.Files;
//import java.util.ArrayList;
//import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.core.io.ClassPathResource;

import com.accounting.project.accounting.entity.CategoryAccount;
import com.accounting.project.accounting.entity.CompanyCurrency;
import com.accounting.project.accounting.entity.Payment_Termin;
import com.accounting.project.accounting.entity.TransactionStatus;
import com.accounting.project.accounting.repository.CategoryAccountRepository;
import com.accounting.project.accounting.repository.CompanyCurrencyRepository;
import com.accounting.project.accounting.repository.TerminatedRepository;
import com.accounting.project.accounting.repository.TransactionStatusRepository;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;
import com.google.gson.Gson;


@SpringBootApplication
@EnableCaching
public class AccountingApplication implements CommandLineRunner{


	    final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	public static void main(String[] args) {
		SpringApplication.run(AccountingApplication.class, args);
	}

	
	@Autowired
	CategoryAccountRepository categoryAccountRepository;
	
	@Autowired
	CompanyRepositoryImpl companyRepository;
	
	@Autowired
	CompanyCurrencyRepository companyCurrencyRepository;

	@Autowired
	TransactionStatusRepository transactionStatusRepository;
	

	@Override
	public void run(String... args) throws Exception {
		
		List<TransactionStatus> transactionStatus = transactionStatusRepository.findAll();
		if(transactionStatus.size()==0) {
			List<TransactionStatus> addTransactionStatus = new ArrayList<>();
			addTransactionStatus.add(new TransactionStatus("Closed"));
			addTransactionStatus.add(new TransactionStatus("Open"));
			addTransactionStatus.add(new TransactionStatus("Overdue"));
			addTransactionStatus.add(new TransactionStatus("Paid"));
			transactionStatusRepository.saveAll(addTransactionStatus);
		}

        File categoryResourse = null;
        File currencyResource = null;
 
		try {
			currencyResource = new ClassPathResource("json/currency.json").getFile();
			categoryResourse = new ClassPathResource("json/category.json").getFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String category = null;
		String currency = null;
		String term = null;
		try {
			category = new String(
					Files.readAllBytes(categoryResourse.toPath())
					);
			currency = new String(
					Files.readAllBytes(currencyResource.toPath())
					);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<CategoryAccount> categoryAccounts = new ArrayList<>();
		List<CompanyCurrency> companyCurrencies = new ArrayList<>();
		Gson g1 = new Gson();
		CompanyCurrency[] coCurrencies = g1.fromJson(currency, CompanyCurrency[].class);
		
		for (CompanyCurrency companyCurrency : coCurrencies) {
			CompanyCurrency comCurrency = new CompanyCurrency(companyCurrency.getCountry(), companyCurrency.getCode(), companyCurrency.getSymbol(), companyCurrency.getCurrency_in_words());
			companyCurrencies.add(comCurrency);
		}
		
		List<CompanyCurrency> listCurenCurrencies = companyCurrencyRepository.findAll();
		if(listCurenCurrencies.size()==0) {
			companyCurrencyRepository.saveAll(companyCurrencies);
		}
		
		Gson g = new Gson();
		CategoryAccount[] caAccounts = g.fromJson(category, CategoryAccount[].class);
		
		for (CategoryAccount categoryAccount : caAccounts) {
			CategoryAccount categoaccount = new CategoryAccount(categoryAccount.getCategory_name());
			categoryAccounts.add(categoaccount);
		}
		List<CategoryAccount> caList = categoryAccountRepository.findAll();
		if(caList.size()==0) {
			categoryAccountRepository.saveAll(categoryAccounts);
		}
		
				
			
		}
		
	
	
	

}
