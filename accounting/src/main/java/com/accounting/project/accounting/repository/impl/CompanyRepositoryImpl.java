package com.accounting.project.accounting.repository.impl;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.accounting.project.accounting.dtoRequest.AccountImportRequest;
import com.accounting.project.accounting.dtoRequest.company.CompanyRequest;
import com.accounting.project.accounting.dtoRequest.company.CompanySettingRequest;
import com.accounting.project.accounting.dtoRequest.company.PurchaseSettingRequset;
import com.accounting.project.accounting.dtoRequest.company.UpdateCompanyRequest;
import com.accounting.project.accounting.dtoRequest.company.UpdateMappingRequest;
import com.accounting.project.accounting.dtoRequest.company.UpdateProductStock;
import com.accounting.project.accounting.dtoResponse.company.SalesSettingRequest;
import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.CompanyBankDetail;
import com.accounting.project.accounting.entity.CompanyCurrency;
import com.accounting.project.accounting.entity.DefaultAccounts;
import com.accounting.project.accounting.entity.Payment_Termin;
import com.accounting.project.accounting.entity.User;
import com.accounting.project.accounting.repository.AccountRepository;
import com.accounting.project.accounting.repository.CategoryAccountRepository;
import com.accounting.project.accounting.repository.CompanyCurrencyRepository;
import com.accounting.project.accounting.repository.CompanyRepository;
import com.accounting.project.accounting.repository.TerminatedRepository;
import com.accounting.project.accounting.repository.PurchaseShippingAccountRepository;
import com.accounting.project.accounting.repository.SaleShippingAccountRepository;
import com.accounting.project.accounting.utils.BalanceFormat;
import com.google.gson.Gson;

@Service
public class CompanyRepositoryImpl {

	String directory = System.getProperty("user.dir") + "/src/main/resources/logoCompany/";
	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	SaleShippingAccountRepository saleShippingAccountRepository;

	@Autowired
	PurchaseShippingAccountRepository purchaseShippingAccountRepository;

	@Autowired
	CompanyCurrencyRepository companyCurrencyRepository;

	@Autowired
	TerminatedRepository preferredInvoiceTermRepository;

	@Autowired
	AccountRepository accountrepository;

	@Autowired
	CategoryAccountRepository categoryAccountRepository;
	
	@Autowired
	TerminatedRepository terminatedRepository;

	public List<Company> listCompany() {
		return companyRepository.findAll();
	}

	public Company addCompany(CompanyRequest request) {
		Company company = new Company();
		company.setName(request.getName());
		company.setIndustry(request.getIndustry());
		company.setAddress(request.getAddress());
		company.setShipping_address(request.getShipping_address());
		company.setPhone(request.getPhone());
		company.setCurrency_format_view(request.getCurrency_format_view());
		company.setFax(request.getFax());
		company.setShow_logo_report(request.isShow_logo_report());
		company.setCompany_website(request.getCompany_website());
		company.setEnable_monthly_performance_email(request.isEnable_monthly_performance_email());
		CompanyCurrency companyCurrency = companyCurrencyRepository.findByName(request.getCompany_currency_country());
		company.setCompany_currency(companyCurrency);
		company.setUse_multi_currency(false);
		company.setShipping_purchase(false);
		company.setEnable_monthly_performance_email(false);
		company.setProduct_image(null);
		company.setProduct_category(false);
		company.setShow_stock(false);
		company.setDefult_invoice_message("hello");
		company.setDefult_delivery_slip_message("hello");
		company.setDisable_sell_on_no_product(false);
		company.setUse_profit_margin(false);
		company.setDefult_purchase_order_message("hello");
		company.setDiscount_lines_sale(false);
		company.setDiscount_sale(false);
		company.setDeposit_sale(false);
		company.setDiscount_lines_purchase(false);
		company.setDiscount_purchase(false);
		company.setDeposit_purchase(false);
		company.setSelling_price_follow_price_rule(false);
		company.setFeature(null);
		company.setLast_closing_the_book_date("");
		company.setLogo(null);
		company.setHas_sales_transaction_with_shipping(false);
		company.setHas_purchase_transaction_with_shipping(false);
		company.setHas_purchase_with_discount_lines(false);
		company.setHas_sale_with_discount_lines(false);
		company.setHas_sales_transaction_with_discount(false);
		company.setHas_purchase_transaction_with_discount(false);
		company.setHas_sales_transaction_with_deposit(false);
		company.setHas_purchase_transaction_with_deposit(false);
		Company com = companyRepository.save(company);

		System.out.println(com.getId());
		File accountResource = null;
		File terminResource = null;
		try {
			accountResource = new ClassPathResource("json/accounts.json").getFile();
			terminResource = new ClassPathResource("json/term.json").getFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String accounts = null;
		String termin = null;
		try {
			accounts = new String(Files.readAllBytes(accountResource.toPath()));
			termin = new String(Files.readAllBytes(terminResource.toPath()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		List<Payment_Termin> listTerm = new ArrayList<>();
		Gson gson = new Gson();
		
		List<Account> listAccount = new ArrayList<>();
		Gson terminGson = new Gson();
		Payment_Termin[] term = terminGson.fromJson(termin, Payment_Termin[].class);
		for(Payment_Termin payment_Termin : term) {
			Payment_Termin p = new Payment_Termin(com.getId(), payment_Termin.getName(), payment_Termin.getLongetivity());
			listTerm.add(p);
		}
		
		List<Payment_Termin> termSave = terminatedRepository.saveAll(listTerm);
		company.setPreferred_purchase_term(termSave.get(0).getId());
		company.setPreferred_invoice_term(termSave.get(0).getId());
		
		
		AccountImportRequest[] account = gson.fromJson(accounts, AccountImportRequest[].class);
		for (AccountImportRequest acc : account) {

			double balance = acc.getBalance();

			Account a = new Account(acc.getAccountName(), acc.getDescription(), acc.getAccountNumber(), false, 0, 0,
					false, companyCurrency.getCode(), acc.getCategoryName(), acc.getCategoryNumber(), com.getId(), null,
					acc.getBalance(), acc.getBalance(),
					BalanceFormat.balanceString(company.getCompany_currency().getSymbol(), balance), 0, new Date(),
					null, null);

			System.out.println(acc.getAccountName());

			listAccount.add(a);
		}
		List<Account> list = accountrepository.saveAll(listAccount);

		int default_sale_account = 0;
		int sale_discount_account = 0;
		int default_sales_return_account = 0;
		int sale_shipping_account = 0;
		int default_prepayment_account = 0;
		int default_unbilled_sales_account = 0;
		int default_unbilled_ar_account = 0;
		int default_cost_of_good_sold = 0;
		int purchase_shipping_account = 0;
		int default_unearned_revenue_account = 0;
		int default_unbilled_ap_account = 0;
		int default_account_receiveable = 0;
		int default_account_payable = 0;
		int default_inventory_account = 0;
		int default_stock_adj_account_general = 0;
		int default_stock_adj_account_waste = 0;
		int default_stock_adj_account_production = 0;
		int default_opening_balance_equity = 0;
		int default_sale_tax_account = 0;
		int default_purchase_tax_account = 0;
		int default_fixed_asset_account = 0;

		for (Account ac : list) {
			if (ac.getName().equals("Other Income")) {
				ac.setLock(true);
				sale_shipping_account = ac.getId();
			}

			if (ac.getName().equals("Shipping/Freight & Delivery")) {
				ac.setLock(true);
				purchase_shipping_account = ac.getId();
			}

			if (ac.getName().equals("Sales Return")) {
				ac.setLock(true);
				default_sales_return_account= ac.getId();
				
			}
			if (ac.getName().equals("Construction Income")) {
				ac.setLock(true);
				default_sale_account = ac.getId();
			}
			if (ac.getName().equals("Sales Discount")) {
				ac.setLock(true);
				sale_discount_account = ac.getId();
			}

			if (ac.getName().equals("Prepaid expenses")) {
				ac.setLock(true);
				default_prepayment_account = ac.getId();
			}

			if (ac.getName().equals("Unbilled Revenues")) {
				ac.setLock(true);
				default_unbilled_sales_account = ac.getId();
			}

			if (ac.getName().equals("Unbilled Accounts Receivable")) {
				ac.setLock(true);
				default_unbilled_ar_account =ac.getId();
			}

			if (ac.getName().equals("Cost of Sales")) {
				ac.setLock(true);
				default_cost_of_good_sold = ac.getId();
			}
			if (ac.getName().equals("Unearned Revenue")) {
				ac.setLock(true);
				default_unearned_revenue_account =ac.getId();
			}

			if (ac.getName().equals("Unbilled Accounts Payable")) {
				ac.setLock(true);
				default_unbilled_ap_account = ac.getId();
			}

			if (ac.getName().equals("Account Receivable")) {
				ac.setLock(true);
				default_account_receiveable =ac.getId();
			}

			if (ac.getName().equals("Trade Payable")) {
				ac.setLock(true);
				default_account_payable = ac.getId();
			}

			if (ac.getName().equals("Inventory")) {
				ac.setLock(true);
				default_inventory_account =ac.getId();
			}

			if (ac.getName().equals("Inventory Adjustments")) {
				ac.setLock(true);
				default_stock_adj_account_general = ac.getId();
			}

			if (ac.getName().equals("Waste Goods Expense")) {
				ac.setLock(true);
				default_stock_adj_account_waste = ac.getId();
			}

			if (ac.getName().equals("Cost of Production")) {
				ac.setLock(true);
				default_stock_adj_account_production = ac.getId();
			}

			if (ac.getName().equals("Opening Balance Equity")) {
				ac.setLock(true);
				default_opening_balance_equity = ac.getId();
			}

			if (ac.getName().equals("VAT Out")) {
				ac.setLock(true);
				default_sale_tax_account = ac.getId();
			}

			if (ac.getName().equals("VAT In")) {
				ac.setLock(true);
				default_purchase_tax_account = ac.getId();
			}

			if (ac.getName().equals("Fixed Assets - Office Equipment")) {
				ac.setLock(true);
				default_fixed_asset_account = ac.getId();
			}

		}
		accountrepository.saveAll(list);
		com.setTotal_accounts(list.size());
		com.setCompany_bank_detail(new CompanyBankDetail(null, null, null, null, null, null));

		DefaultAccounts defaultAccounts = new DefaultAccounts(
				default_sale_account, 
				sale_discount_account,
				default_sales_return_account,
				sale_shipping_account, 
				default_prepayment_account,
				default_unbilled_sales_account,
				default_unbilled_ar_account, 
				default_cost_of_good_sold,
				purchase_shipping_account,
				default_unearned_revenue_account, 
				default_unbilled_ap_account,
				default_account_receiveable,
				default_account_payable, 
				default_inventory_account,
				default_stock_adj_account_general,
				default_stock_adj_account_waste,
				default_stock_adj_account_production,
				default_opening_balance_equity, 
				default_sale_tax_account,
				default_purchase_tax_account,
				default_fixed_asset_account);
		
		com.setDefault_accounts(defaultAccounts);

		return companyRepository.save(com);
	}

	public Company findById(int id) {
		return companyRepository.getOne(id);
	}

	public Company addUser(int id, User user) {
		Company company = companyRepository.getOne(id);
		company.getUser().add(user);
		return companyRepository.save(company);
	}

	public Company editCompany(int id, UpdateCompanyRequest company) {
		Company currentCompany = findById(id);
		currentCompany.setName(company.getName());
		currentCompany.setIndustry(company.getIndustry());
		currentCompany.setAddress(company.getAddress());
		currentCompany.setShipping_address(company.getShipping_address());
		currentCompany.setPhone(company.getPhone());
		currentCompany.setFax(company.getFax());
		currentCompany.setCompany_tax_number(company.getCompany_tax_number());
		currentCompany.setShow_logo_report(company.isShow_logo_report());
		currentCompany.setCompany_website(company.getCompany_website());
		currentCompany.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		CompanyCurrency company_currency = companyCurrencyRepository.findByName(company.getCompany_currency_country());
		currentCompany.setCompany_currency(company_currency);
		currentCompany.setDefult_invoice_message(company.getDefult_invoice_message());
		currentCompany.setDefult_delivery_slip_message(company.getDefult_delivery_slip_message());
		currentCompany.setDefult_purchase_order_message(company.getDefult_purchase_order_message());
		currentCompany.setDiscount_lines_sale(company.isDiscount_lines_sale());
		currentCompany.setDiscount_sale(company.isDiscount_sale());
		currentCompany.setDeposit_sale(company.isDeposit_sale());
		currentCompany.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		currentCompany.setDiscount_purchase(company.isDiscount_purchase());
		currentCompany.setDeposit_purchase(company.isDeposit_purchase());
		currentCompany.setShipping_purchase(company.isShipping_purchase());
		currentCompany.setShipping_sale(company.isShipping_sale());
		currentCompany.setCompany_bank_detail(company.getCompany_bank_detail_attributes());

		List<Account> acc = accountrepository.getAllAccountByCompany(currentCompany.getId());

		for (Account a : acc) {
			a.setCurrency_code(currentCompany.getCompany_currency().getCode());
			a.setBalance_ammount(
					BalanceFormat.balanceString(currentCompany.getCompany_currency().getSymbol(), a.getBalance()));
		}
		accountrepository.saveAll(acc);
		return companyRepository.save(currentCompany);
	}

	public void deleteCompany(int id) {
		companyRepository.deleteById(id);
	}

	public Company updateCompanySetting(int id, CompanySettingRequest request) {
		Company currentCompany = findById(id);
		currentCompany.setName(request.getName());
		currentCompany.setIndustry(request.getIndustry());
		currentCompany.setShipping_address(request.getShipping_address());
		currentCompany.setCompany_tax_number(request.getCompany_tax_number());
		currentCompany.setShow_logo_report(request.isShow_logo_report());
		currentCompany.setCompany_website(request.getCompany_website());
		currentCompany.setCompany_email(request.getCompany_email());
		currentCompany.setEnable_monthly_performance_email(request.isEnable_monthly_performance_email());
		CompanyBankDetail companyBankDetail = currentCompany.getCompany_bank_detail();
		companyBankDetail.setAccount_name(request.getAccount_name());
		companyBankDetail.setAccount_number(request.getAccount_number());
		companyBankDetail.setBank_address(request.getBank_address());
		companyBankDetail.setBank_branch(request.getBank_branch());
		companyBankDetail.setBank_name(request.getBank_name());
		companyBankDetail.setSwift_code(request.getSwift_code());
		currentCompany.setCompany_bank_detail(companyBankDetail);

		CompanyCurrency companyCurrency = companyCurrencyRepository.getOne(request.getCurrency_id());
		currentCompany.setCompany_currency(companyCurrency);

		System.out.println(companyCurrency.getId());
		List<Account> acc = accountrepository.getAllAccountByCompany(currentCompany.getId());

		for (Account a : acc) {
			a.setCurrency_code(currentCompany.getCompany_currency().getCode());
			a.setBalance_ammount(
					BalanceFormat.balanceString(currentCompany.getCompany_currency().getCode(), a.getEndBalance()));
		}
		accountrepository.saveAll(acc);

		return companyRepository.save(currentCompany);

	}

	public Company updateCompanySalesSetting(int id, SalesSettingRequest request) {
		Company currentCompany = findById(id);
		currentCompany.setDefult_invoice_message(request.getDefault_invoice_message());
		currentCompany.setDefault_invoice_message(request.getDefault_invoice_message());
		currentCompany.setDefult_delivery_slip_message(request.getdefault_delivery_slip_message());
		currentCompany.setDisable_sell_on_no_product(request.isDisable_sell_on_no_product());
		currentCompany.setDiscount_lines_sale(request.isDiscount_lines_sale());
		currentCompany.setDiscount_sale(request.isDiscount_sale());
		currentCompany.setSelling_price_follow_price_rule(request.isSelling_price_follow_price_rule());
		currentCompany.setPreferred_invoice_term(request.getTermId());
		currentCompany.setUse_profit_margin(request.isUse_profit_margin());
		currentCompany.setSelling_price_follow_price_rule(request.isSelling_price_follow_price_rule());

		return companyRepository.save(currentCompany);
	}

	public Company updateCompanyPurchaseSetting(int id, PurchaseSettingRequset request) {
		Company currentCompany = findById(id);
		currentCompany.setDefault_purchase_order_message(request.getDefault_purchase_order_message());
		currentCompany.setDiscount_lines_purchase(request.isDiscount_lines_purchase());
		currentCompany.setDiscount_purchase(request.isDiscount_purchase());
		currentCompany.setPreferred_purchase_term(request.getTermId());
		return companyRepository.save(currentCompany);
	}

	public Company updateProductStock(int id, UpdateProductStock request) {
		Company currentCompany = findById(id);
		currentCompany.setShow_stock(request.isShow_stock());
		return companyRepository.save(currentCompany);
	}

	public Company updateAccountMapping(int id, UpdateMappingRequest request) {
		Company currentCompany = findById(id);
		DefaultAccounts defaultAccounts = currentCompany.getDefault_accounts();
		
		// change lock account if account don't have balance
		Account removedefaultAccountPayable = accountrepository.getOne(defaultAccounts.getDefault_account_payable());
		if (removedefaultAccountPayable.getBalance() == 0 || removedefaultAccountPayable.getEndBalance() == 0) {
			removedefaultAccountPayable.setLock(false);
			accountrepository.save(removedefaultAccountPayable);
		}
		
		// change lock account to true if account locked is false
		Account account = accountrepository.getOne(request.getDefault_account_payable());
		if(account.isLock()==false) {			
		account.setLock(true);
		accountrepository.save(account);
		}
		
		// change lock account if account don't have balance
		Account removedefaultAccountReceivable = accountrepository.getOne(defaultAccounts.getDefault_account_receiveable());
		if (removedefaultAccountReceivable.getBalance() == 0 || removedefaultAccountReceivable.getEndBalance() == 0) {
			removedefaultAccountReceivable.setLock(false);
			accountrepository.save(removedefaultAccountReceivable);
		}
		
		// change lock account to true if account locked is false
		Account account2 = accountrepository.getOne(request.getDefault_account_receiveable());
		if(account2.isLock()==false) {			
			account2.setLock(true);
		accountrepository.save(account2);
		}
		
		// change lock account if account don't have balance
		Account removeCogs = accountrepository.getOne(defaultAccounts.getDefault_cost_of_good_sold());
		if (removeCogs.getBalance() == 0 || removeCogs.getEndBalance() == 0) {
			removeCogs.setLock(false);
			accountrepository.save(removeCogs);
		}
		
		// change lock account to true if account locked is false
		Account account3 = accountrepository.getOne(request.getDefault_cost_of_good_sold());
		if(account3.isLock()==false) {			
			account3.setLock(true);
		accountrepository.save(account3);
		}
		
		// change lock account if account don't have balance
		Account fixedAsset = accountrepository.getOne(defaultAccounts.getDefault_fixed_asset_account());
		if (fixedAsset.getBalance() == 0 || fixedAsset.getEndBalance() == 0) {
			fixedAsset.setLock(false);
			accountrepository.save(fixedAsset);
		}
		
		// change lock account to true if account locked is false
		Account account4 = accountrepository.getOne(request.getDefault_fixed_asset_account());
		if(account4.isLock()==false) {			
			account4.setLock(true);
		accountrepository.save(account4);
		}
		
		// change lock account if account don't have balance
		Account inventory = accountrepository.getOne(defaultAccounts.getDefault_inventory_account());
		if (inventory.getBalance() == 0 || inventory.getEndBalance() == 0) {
			inventory.setLock(false);
			accountrepository.save(inventory);
		}
		
		// change lock account to true if account locked is false
		Account account5 = accountrepository.getOne(request.getDefault_inventory_account());
		if(account5.isLock()==false) {			
			account5.setLock(true);
		accountrepository.save(account5);
		}
		
		// change lock account if account don't have balance
		Account openingBalance = accountrepository.getOne(defaultAccounts.getDefault_opening_balance_equity());
		if (openingBalance.getBalance() == 0 || openingBalance.getEndBalance() == 0) {
			openingBalance.setLock(false);
			accountrepository.save(openingBalance);
		}
		
		// change lock account to true if account locked is false
		Account account6 = accountrepository.getOne(request.getDefault_opening_balance_equity());
		if(account6.isLock()==false) {			
			account6.setLock(true);
		accountrepository.save(account6);
		}
		
		// change lock account if account don't have balance
		Account prepayment = accountrepository.getOne(defaultAccounts.getDefault_prepayment_account());
		if (prepayment.getBalance() == 0 || prepayment.getEndBalance() == 0) {
			prepayment.setLock(false);
			accountrepository.save(prepayment);
		}
		
		// change lock account to true if account locked is false
		Account account7 = accountrepository.getOne(request.getDefault_prepayment_account());
		if(account7.isLock()==false) {			
			account7.setLock(true);
			accountrepository.save(account7);
		}
		
		// change lock account if account don't have balance
		Account purchaseTax = accountrepository.getOne(defaultAccounts.getDefault_purchase_tax_account());
		if (purchaseTax.getBalance() == 0 || purchaseTax.getEndBalance() == 0) {
			purchaseTax.setLock(false);
			accountrepository.save(purchaseTax);
		}
		
		// change lock account to true if account locked is false
		Account account8 = accountrepository.getOne(request.getDefault_purchase_tax_account());
		if(account8.isLock()==false) {			
			account8.setLock(true);
			accountrepository.save(account8);
		}
		
		
		// change lock account if account don't have balance
		Account saleAccount = accountrepository.getOne(defaultAccounts.getDefault_sale_account());
		if (saleAccount.getBalance() == 0 || saleAccount.getEndBalance() == 0) {
			saleAccount.setLock(false);
			accountrepository.save(saleAccount);
		}
		
		// change lock account to true if account locked is false
		Account account9 = accountrepository.getOne(request.getDefault_sale_account());
		if(account9.isLock()==false) {			
			account9.setLock(true);
			accountrepository.save(account9);
		}
		
		
		// change lock account if account don't have balance
		Account saleTax = accountrepository.getOne(defaultAccounts.getDefault_sale_tax_account());
		if (saleTax.getBalance() == 0 || saleTax.getEndBalance() == 0) {
			saleTax.setLock(false);
			accountrepository.save(saleTax);
		}
		
		// change lock account to true if account locked is false
		Account account10 = accountrepository.getOne(request.getDefault_sale_tax_account());
		if(account10.isLock()==false) {			
			account10.setLock(true);
			accountrepository.save(account10);
		}
		
		
		// change lock account if account don't have balance
		Account salesReturn = accountrepository.getOne(defaultAccounts.getDefault_sales_return_account());
		if (salesReturn.getBalance() == 0 || salesReturn.getEndBalance() == 0) {
			salesReturn.setLock(false);
			accountrepository.save(salesReturn);
		}
		
		// change lock account to true if account locked is false
		Account account11 = accountrepository.getOne(request.getDefault_sales_return_account());
		if(account11.isLock()==false) {			
			account11.setLock(true);
			accountrepository.save(account11);
		}
		
		// change lock account if account don't have balance
		Account stockAjustment = accountrepository.getOne(defaultAccounts.getDefault_stock_adj_account_general());
		if (stockAjustment.getBalance() == 0 || stockAjustment.getEndBalance() == 0) {
			stockAjustment.setLock(false);
			accountrepository.save(stockAjustment);
		}
		
		// change lock account to true if account locked is false
		Account account12 = accountrepository.getOne(request.getDefault_stock_adj_account_general());
		if(account12.isLock()==false) {			
			account12.setLock(true);
			accountrepository.save(account12);
		}
		
		
		// change lock account if account don't have balance
		Account adjProduction = accountrepository.getOne(defaultAccounts.getDefault_stock_adj_account_production());
		if (adjProduction.getBalance() == 0 || adjProduction.getEndBalance() == 0) {
			adjProduction.setLock(false);
			accountrepository.save(adjProduction);
		}
		
		// change lock account to true if account locked is false
		Account account13 = accountrepository.getOne(request.getDefault_stock_adj_account_production());
		if(account13.isLock()==false) {			
			account13.setLock(true);
			accountrepository.save(account13);
		}
		
		// change lock account if account don't have balance
		Account stockWaste = accountrepository.getOne(defaultAccounts.getDefault_stock_adj_account_waste());
		if (stockWaste.getBalance() == 0 || stockWaste.getEndBalance() == 0) {
			stockWaste.setLock(false);
			accountrepository.save(stockWaste);
		}
		
		// change lock account to true if account locked is false
		Account account14 = accountrepository.getOne(request.getDefault_stock_adj_account_waste());
		if(account14.isLock()==false) {			
			account14.setLock(true);
			accountrepository.save(account14);
		}
		
		
		// change lock account if account don't have balance
		Account unbilledAccount = accountrepository.getOne(defaultAccounts.getDefault_unbilled_ap_account());
		if (unbilledAccount.getBalance() == 0 || unbilledAccount.getEndBalance() == 0) {
			unbilledAccount.setLock(false);
			accountrepository.save(unbilledAccount);
		}
		
		// change lock account to true if account locked is false
		Account account15 = accountrepository.getOne(request.getDefault_unbilled_ap_account());
		if(account15.isLock()==false) {			
			account15.setLock(true);
			accountrepository.save(account15);
		}
		
		
		// change lock account if account don't have balance
		Account unbilledAccountAp = accountrepository.getOne(defaultAccounts.getDefault_unbilled_ar_account());
		if (unbilledAccountAp.getBalance() == 0 || unbilledAccountAp.getEndBalance() == 0) {
			unbilledAccountAp.setLock(false);
			accountrepository.save(unbilledAccountAp);
		}
		
		// change lock account to true if account locked is false
		Account account16 = accountrepository.getOne(request.getDefault_unbilled_ar_account());
		if(account16.isLock()==false) {			
			account16.setLock(true);
			accountrepository.save(account16);
		}
		
		
		// change lock account if account don't have balance
		Account unbiledsales = accountrepository.getOne(defaultAccounts.getDefault_unbilled_sales_account());
		if (unbiledsales.getBalance() == 0 || unbiledsales.getEndBalance() == 0) {
			unbiledsales.setLock(false);
			accountrepository.save(unbiledsales);
		}
		
		// change lock account to true if account locked is false
		Account account17 = accountrepository.getOne(request.getDefault_unbilled_sales_account());
		if(account17.isLock()==false) {			
			account17.setLock(true);
			accountrepository.save(account17);
		}
		
		
		// change lock account if account don't have balance
		Account unearnedRevenue = accountrepository.getOne(defaultAccounts.getDefault_unearned_revenue_account());
		if (unearnedRevenue.getBalance() == 0 || unearnedRevenue.getEndBalance() == 0) {
			unearnedRevenue.setLock(false);
			accountrepository.save(unearnedRevenue);
		}
		
		// change lock account to true if account locked is false
		Account account18 = accountrepository.getOne(request.getDefault_unearned_revenue_account());
		if(account18.isLock()==false) {			
			account18.setLock(true);
			accountrepository.save(account18);
		}
		
		
		
		// change lock account if account don't have balance
		Account purchaseShipping = accountrepository.getOne(defaultAccounts.getPurchase_shipping_account());
		if (purchaseShipping.getBalance() == 0 || purchaseShipping.getEndBalance() == 0) {
			purchaseShipping.setLock(false);
			accountrepository.save(unearnedRevenue);
		}
		
		// change lock account to true if account locked is false
		Account account19 = accountrepository.getOne(request.getDefault_purchase_shipping_account());
		if(account19.isLock()==false) {			
			account19.setLock(true);
			accountrepository.save(account19);
		}
		
		
		
		// change lock account if account don't have balance
		Account saleDiscount = accountrepository.getOne(defaultAccounts.getSale_discount_account());
		if (saleDiscount.getBalance() == 0 || saleDiscount.getEndBalance() == 0) {
			saleDiscount.setLock(false);
			accountrepository.save(saleDiscount);
		}
		
		// change lock account to true if account locked is false
		Account account20 = accountrepository.getOne(request.getDefault_sale_discount_account());
		if(account20.isLock()==false) {			
			account20.setLock(true);
			accountrepository.save(account20);
		}
		
		
		// change lock account if account don't have balance
		Account salesShipping = accountrepository.getOne(defaultAccounts.getSale_shipping_account());
		if (salesShipping.getBalance() == 0 || salesShipping.getEndBalance() == 0) {
			salesShipping.setLock(false);
			accountrepository.save(salesShipping);
		}
		
		// change lock account to true if account locked is false
		Account account21 = accountrepository.getOne(request.getDefault_sale_shipping_account());
		if(account21.isLock()==false) {			
			account21.setLock(true);
			accountrepository.save(account21);
		}
		
		defaultAccounts.setDefault_account_payable(request.getDefault_account_payable());
		defaultAccounts.setDefault_account_receiveable(request.getDefault_account_receiveable());
		defaultAccounts.setDefault_cost_of_good_sold(request.getDefault_cost_of_good_sold());
		defaultAccounts.setDefault_fixed_asset_account(request.getDefault_fixed_asset_account());
		defaultAccounts.setDefault_inventory_account(request.getDefault_inventory_account());
		defaultAccounts.setDefault_opening_balance_equity(request.getDefault_opening_balance_equity());
		defaultAccounts.setDefault_prepayment_account(request.getDefault_prepayment_account());
		defaultAccounts.setDefault_purchase_tax_account(request.getDefault_purchase_tax_account());
		defaultAccounts.setDefault_sale_account(request.getDefault_sale_account());
		defaultAccounts.setDefault_sale_tax_account(request.getDefault_sale_tax_account());
		defaultAccounts.setDefault_sales_return_account(request.getDefault_sales_return_account());
		defaultAccounts.setDefault_stock_adj_account_general(request.getDefault_stock_adj_account_general());
		defaultAccounts.setDefault_stock_adj_account_production(request.getDefault_stock_adj_account_production());
		defaultAccounts.setDefault_stock_adj_account_waste(request.getDefault_stock_adj_account_waste());
		defaultAccounts.setDefault_unbilled_ap_account(request.getDefault_unbilled_ap_account());
		defaultAccounts.setDefault_unbilled_ar_account(request.getDefault_unbilled_ar_account());
		defaultAccounts.setDefault_unbilled_sales_account(request.getDefault_unbilled_sales_account());
		defaultAccounts.setDefault_unearned_revenue_account(request.getDefault_unearned_revenue_account());
		defaultAccounts.setPurchase_shipping_account(request.getDefault_purchase_shipping_account());
		defaultAccounts.setSale_discount_account(request.getDefault_sale_discount_account());
		defaultAccounts.setSale_shipping_account(request.getDefault_sale_shipping_account());
		
		return companyRepository.save(currentCompany);
	}

	public boolean updateImage(int id, MultipartFile imageFile) {
		boolean status;
		Company currentCompany = findById(id);
		System.out.println("logo :" + currentCompany.getLogo());
		if (currentCompany.getLogo() != null) {
			File filetoDelete = new File(directory + currentCompany.getLogo());
			filetoDelete.delete();
		}

		Path filePath = Paths.get(directory, imageFile.getOriginalFilename());

		try {
			Files.write(filePath, imageFile.getBytes());
			System.out.println("upload successfull");
			status = true;
			currentCompany.setLogo(imageFile.getOriginalFilename());
			System.out.println(filePath);
			companyRepository.save(currentCompany);
		} catch (Exception e) {
			System.out.println("failed " + e);
			status = false;
		}
		return status;
	}

	public Resource getCompanyLogo(String logo) throws MalformedURLException {
		Path filePath = Paths.get(directory + logo).toAbsolutePath().normalize();
		Resource resource = new UrlResource(filePath.toUri());
		return resource;

	}

	public void deleteLogoCompany(int id) {
		Company currentCompany = findById(id);
		File filetoDelete = new File(directory + currentCompany.getLogo());
		filetoDelete.delete();
		currentCompany.setLogo(null);
		companyRepository.save(currentCompany);
	}

}
