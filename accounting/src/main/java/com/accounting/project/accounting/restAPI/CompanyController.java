package com.accounting.project.accounting.restAPI;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.accounting.project.accounting.dtoRequest.company.CompanyRequest;
import com.accounting.project.accounting.dtoRequest.company.CompanySettingRequest;
import com.accounting.project.accounting.dtoRequest.company.PurchaseSettingRequset;
import com.accounting.project.accounting.dtoRequest.company.UpdateCompanyRequest;
import com.accounting.project.accounting.dtoRequest.company.UpdateMappingRequest;
import com.accounting.project.accounting.dtoRequest.company.UpdateProductStock;
import com.accounting.project.accounting.dtoResponse.company.CompanyCurrencyResponse;
import com.accounting.project.accounting.dtoResponse.company.DefaultAccountPayable;
import com.accounting.project.accounting.dtoResponse.company.DefaultAccountReceivable;
import com.accounting.project.accounting.dtoResponse.company.DefaultAccountResponse;
import com.accounting.project.accounting.dtoResponse.company.DefaultCostOfGoodSold;
import com.accounting.project.accounting.dtoResponse.company.DefaultFixedAssetAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultInventoryAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultOpeningBalanceEquity;
import com.accounting.project.accounting.dtoResponse.company.DefaultPrepaymentAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultPurchaseShippingAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultPurchaseTaxAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultSaleAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultSaleDiscount;
import com.accounting.project.accounting.dtoResponse.company.DefaultSaleShippingAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultSaleTaxAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultSalesReturnAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultStockAdjAccountGeneral;
import com.accounting.project.accounting.dtoResponse.company.DefaultStockAdjAccountProduction;
import com.accounting.project.accounting.dtoResponse.company.DefaultStockAdjAccountWaste;
import com.accounting.project.accounting.dtoResponse.company.DefaultUnbilledApAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultUnbilledArAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultUnbilledSalesAccount;
import com.accounting.project.accounting.dtoResponse.company.DefaultUnearnedRevenueAccount;
import com.accounting.project.accounting.dtoResponse.company.GetCompanyResponse;
import com.accounting.project.accounting.dtoResponse.company.PreferredInvoiceTerm;
import com.accounting.project.accounting.dtoResponse.company.PreferredPurchaseTerm;
import com.accounting.project.accounting.dtoResponse.company.SalesSettingRequest;
import com.accounting.project.accounting.dtoResponse.company.UserResponse;
import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.Payment_Termin;
import com.accounting.project.accounting.entity.User;
import com.accounting.project.accounting.repository.AccountRepository;
import com.accounting.project.accounting.repository.TerminatedRepository;
import com.accounting.project.accounting.repository.impl.CompanyRepositoryImpl;


	@CrossOrigin
	@RestController
	@RequestMapping(value = "/api/v1/")
public class CompanyController {

	
	@Autowired
	private CompanyRepositoryImpl services;
	
	@Autowired
	private TerminatedRepository terminRepository;
	
	@Autowired
	private AccountRepository AccountRepository;
	
	@RequestMapping(value = "company", method = RequestMethod.GET)
	public ResponseEntity<?> listCompany(){
		List<Company> companies = services.listCompany();
		List<UserResponse> userResponse = new ArrayList<>();
		List<GetCompanyResponse> response = new ArrayList<>();
		for(Company company : companies) {
			for (User user : company.getUser()) {
				
				UserResponse userRes = new UserResponse(
						user.getId(), 
						user.getName(),
						user.getUsername(), 
						user.getPassword(),
						user.getEmail(),
						user.getRole(),
						user.getActive(),
						user.getCreatedDate(),
						user.getDeleteDate());
				userResponse.add(userRes);
			};
			
			GetCompanyResponse companyResponse = new GetCompanyResponse();
			companyResponse.setId(company.getId());
			companyResponse.setName(company.getName());
			companyResponse.setIndustry(company.getIndustry());
			companyResponse.setShipping_address(company.getShipping_address());
			companyResponse.setShipping_sale(company.isShipping_sale());
			companyResponse.setShipping_purchase(company.isShipping_purchase());
			companyResponse.setPhone(company.getPhone());
			companyResponse.setFax(company.getFax());
			companyResponse.setCompany_tax_number(company.getCompany_tax_number());
			companyResponse.setTag(false);
			companyResponse.setUse_multi_currency(company.isUse_multi_currency());
			companyResponse.setCurrency_format_view(company.getCurrency_format_view());
			companyResponse.setShow_logo_report(company.isShow_logo_report());
			companyResponse.setCompany_website(company.getCompany_website());
			companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
			companyResponse.setProduct_image(company.getProduct_image());
			companyResponse.setProduct_category(company.isProduct_category());
			companyResponse.setShow_stock(company.isShow_stock());
			companyResponse.setCompany_email(company.getCompany_email());
			companyResponse.setdefault_invoice_message(company.getDefult_invoice_message());
			companyResponse.setdefault_delivery_slip_message(company.getDefult_delivery_slip_message());
			companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
			companyResponse.setUse_profit_margin(company.isUse_profit_margin());
			companyResponse.setdefault_purchase_order_message(company.getDefult_purchase_order_message());
			companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
			companyResponse.setDeposit_sale(company.isDeposit_sale());
			companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
			companyResponse.setDiscount_purchase(company.isDiscount_purchase());
			companyResponse.setDeposit_purchase(company.isDeposit_purchase());
			companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
			companyResponse.setLogo(company.getLogo());
			companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
			companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
			companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
			companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
			companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
			companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
			companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
			companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
			
			Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
			
			PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
					invoiceTerm.getId(),
					invoiceTerm.getName(), 
					invoiceTerm.getLongetivity());
			
			companyResponse.setPreferred_invoice_term(preferred_invoice_term);
			
			Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
			
			PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
					purchaseTerm.getId(),
					purchaseTerm.getName(), 
					purchaseTerm.getLongetivity());
			
			companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
			
			companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
			companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
			companyResponse.setTotal_accounts(company.getTotal_accounts());
			
			CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
					company.getCompany_currency().getId(),
					company.getCompany_currency().getCountry(), 
					company.getCompany_currency().getCode(), 
					company.getCompany_currency().getSymbol(), 
					company.getCompany_currency().getCurrency_in_words());
			
			companyResponse.setCompany_currency(company_currency);
			
			companyResponse.setCompany_billing_details(company.getCompany_billing_details());
			
			Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
			Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
			Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
			Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
			Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
			Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
			Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
			Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
			Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
			Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
			Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
			Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
			Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
			Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
			Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
			Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
			Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
			Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
			Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
			Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
			Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
		
			DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
					acc1.getId(), 
					acc1.getCategory_id(), 
					acc1.getName(), 
					acc1.getNumber_account());
			
			DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
					acc2.getId(), 
					acc2.getCategory_id(), 
					acc2.getName(), 
					acc2.getNumber_account());
			
			DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
					acc3.getId(), 
					acc3.getCategory_id(), 
					acc3.getName(), 
					acc3.getNumber_account());
			
			DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
					acc4.getId(), 
					acc4.getCategory_id(), 
					acc4.getName(), 
					acc4.getNumber_account());
			
			DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
					acc5.getId(), 
					acc5.getCategory_id(), 
					acc5.getName(), 
					acc5.getNumber_account());
			
			DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
					acc6.getId(), 
					acc6.getCategory_id(), 
					acc6.getName(), 
					acc6.getNumber_account());

			DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
					acc7.getId(), 
					acc7.getCategory_id(), 
					acc7.getName(), 
					acc7.getNumber_account());
			
			
			DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
					acc8.getId(), 
					acc8.getCategory_id(), 
					acc8.getName(), 
					acc8.getNumber_account());
			
			DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
					acc9.getId(), 
					acc9.getCategory_id(), 
					acc9.getName(), 
					acc9.getNumber_account());
			
			DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
					acc10.getId(), 
					acc10.getCategory_id(), 
					acc10.getName(), 
					acc10.getNumber_account());
			
			DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
					acc11.getId(), 
					acc11.getCategory_id(), 
					acc11.getName(), 
					acc11.getNumber_account());
			
			DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
					acc12.getId(), 
					acc12.getCategory_id(), 
					acc12.getName(), 
					acc12.getNumber_account());
			
			DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
					acc13.getId(), 
					acc13.getCategory_id(), 
					acc13.getName(), 
					acc13.getNumber_account());
			
			DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
					acc14.getId(), 
					acc14.getCategory_id(), 
					acc14.getName(), 
					acc14.getNumber_account());
			
			DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
					acc15.getId(), 
					acc15.getCategory_id(), 
					acc15.getName(), 
					acc15.getNumber_account());
			
			DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
					acc16.getId(), 
					acc16.getCategory_id(), 
					acc16.getName(), 
					acc16.getNumber_account());
			
			DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
					acc17.getId(), 
					acc17.getCategory_id(), 
					acc17.getName(), 
					acc17.getNumber_account());
			
			
			DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
					acc18.getId(), 
					acc18.getCategory_id(), 
					acc18.getName(), 
					acc18.getNumber_account());
			
			DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
					acc19.getId(), 
					acc19.getCategory_id(), 
					acc19.getName(), 
					acc19.getNumber_account());
			
			DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
					acc20.getId(), 
					acc20.getCategory_id(), 
					acc20.getName(), 
					acc20.getNumber_account());
			
			
			DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
					acc21.getId(), 
					acc21.getCategory_id(), 
					acc21.getName(), 
					acc21.getNumber_account());
			

			DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
			defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
			defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
			defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
			defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
			defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
			defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
			defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
			defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
			defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
			defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
			defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
			defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
			defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
			defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
			defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
			defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
			defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
			defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
			defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
			defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
			defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
			
			companyResponse.setDefault_accounts(defaultAccountResponse);
			companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
			companyResponse.setUser(userResponse);
			
		response.add(companyResponse);
			
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "company", method = RequestMethod.POST)
	public ResponseEntity<?> addCompany(@RequestBody CompanyRequest request){
		Company company = services.addCompany(request);
		return new ResponseEntity<>(company, HttpStatus.OK);
	}

	
//	@Cacheable(value = "company_id", key = "#id")
	@RequestMapping(value = "company/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> findCompanyById(@PathVariable(value = "id") int id){
		Company company = services.findById(id);
		GetCompanyResponse companyResponse = new GetCompanyResponse();
		companyResponse.setId(company.getId());
		companyResponse.setName(company.getName());
		companyResponse.setIndustry(company.getIndustry());
		companyResponse.setAddress(company.getAddress());
		companyResponse.setShipping_address(company.getShipping_address());
		companyResponse.setShipping_sale(company.isShipping_sale());
		companyResponse.setShipping_purchase(company.isShipping_purchase());
		companyResponse.setPhone(company.getPhone());
		companyResponse.setFax(company.getFax());
		companyResponse.setCompany_tax_number(company.getCompany_tax_number());
		companyResponse.setTag(false);
		companyResponse.setUse_multi_currency(company.isUse_multi_currency());
		companyResponse.setCurrency_format_view(company.getCurrency_format_view());
		companyResponse.setShow_logo_report(company.isShow_logo_report());
		companyResponse.setCompany_website(company.getCompany_website());
		companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		companyResponse.setProduct_image(company.getProduct_image());
		companyResponse.setProduct_category(company.isProduct_category());
		companyResponse.setShow_stock(company.isShow_stock());
		companyResponse.setCompany_email(company.getCompany_email());
		companyResponse.setdefault_invoice_message(company.getDefault_invoice_message());
		companyResponse.setdefault_delivery_slip_message(company.getDefault_delivery_slip_message());
		companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
		companyResponse.setUse_profit_margin(company.isUse_profit_margin());
		companyResponse.setdefault_purchase_order_message(company.getDefault_purchase_order_message());
		companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
		companyResponse.setDiscount_sale(company.isDiscount_sale());
		companyResponse.setDeposit_sale(company.isDeposit_sale());
		companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		companyResponse.setDiscount_purchase(company.isDiscount_purchase());
		companyResponse.setDeposit_purchase(company.isDeposit_purchase());
		companyResponse.setFeature(company.getFeature());
		companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
		companyResponse.setLogo(company.getLogo());
		companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
		companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
		companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
		companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
		companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
		companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
		companyResponse.setHas_sales_transaction_with_discount(company.isHas_sales_transaction_with_discount());
		companyResponse.setHas_purchase_transaction_with_discount(company.isHas_purchase_transaction_with_discount());
		companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
		companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
	
		Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
		
		PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
				invoiceTerm.getId(),
				invoiceTerm.getName(), 
				invoiceTerm.getLongetivity());
		
		companyResponse.setPreferred_invoice_term(preferred_invoice_term);
		
		Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
		
		PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
				purchaseTerm.getId(),
				purchaseTerm.getName(), 
				purchaseTerm.getLongetivity());
		
		companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
		
		companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
		companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
		companyResponse.setTotal_accounts(company.getTotal_accounts());
		
		CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
				company.getCompany_currency().getId(),
				company.getCompany_currency().getCountry(), 
				company.getCompany_currency().getCode(), 
				company.getCompany_currency().getSymbol(), 
				company.getCompany_currency().getCurrency_in_words());
		
		companyResponse.setCompany_currency(company_currency);
		
		companyResponse.setCompany_billing_details(company.getCompany_billing_details());
		
		Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
		Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
		Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
		Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
		Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
		Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
		Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
		Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
		Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
		Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
		Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
		Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
		Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
		Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
		Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
		Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
		Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
		Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
		Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
		Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
		Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
	
		DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
				acc1.getId(), 
				acc1.getCategory_id(), 
				acc1.getName(), 
				acc1.getNumber_account());
		
		DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
				acc2.getId(), 
				acc2.getCategory_id(), 
				acc2.getName(), 
				acc2.getNumber_account());
		
		DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
				acc3.getId(), 
				acc3.getCategory_id(), 
				acc3.getName(), 
				acc3.getNumber_account());
		
		DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
				acc4.getId(), 
				acc4.getCategory_id(), 
				acc4.getName(), 
				acc4.getNumber_account());
		
		DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
				acc5.getId(), 
				acc5.getCategory_id(), 
				acc5.getName(), 
				acc5.getNumber_account());
		
		DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
				acc6.getId(), 
				acc6.getCategory_id(), 
				acc6.getName(), 
				acc6.getNumber_account());

		DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
				acc7.getId(), 
				acc7.getCategory_id(), 
				acc7.getName(), 
				acc7.getNumber_account());
		
		
		DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
				acc8.getId(), 
				acc8.getCategory_id(), 
				acc8.getName(), 
				acc8.getNumber_account());
		
		DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
				acc9.getId(), 
				acc9.getCategory_id(), 
				acc9.getName(), 
				acc9.getNumber_account());
		
		DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
				acc10.getId(), 
				acc10.getCategory_id(), 
				acc10.getName(), 
				acc10.getNumber_account());
		
		DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
				acc11.getId(), 
				acc11.getCategory_id(), 
				acc11.getName(), 
				acc11.getNumber_account());
		
		DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
				acc12.getId(), 
				acc12.getCategory_id(), 
				acc12.getName(), 
				acc12.getNumber_account());
		
		DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
				acc13.getId(), 
				acc13.getCategory_id(), 
				acc13.getName(), 
				acc13.getNumber_account());
		
		DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
				acc14.getId(), 
				acc14.getCategory_id(), 
				acc14.getName(), 
				acc14.getNumber_account());
		
		DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
				acc15.getId(), 
				acc15.getCategory_id(), 
				acc15.getName(), 
				acc15.getNumber_account());
		
		DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
				acc16.getId(), 
				acc16.getCategory_id(), 
				acc16.getName(), 
				acc16.getNumber_account());
		
		DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
				acc17.getId(), 
				acc17.getCategory_id(), 
				acc17.getName(), 
				acc17.getNumber_account());
		
		
		DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
				acc18.getId(), 
				acc18.getCategory_id(), 
				acc18.getName(), 
				acc18.getNumber_account());
		
		DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
				acc19.getId(), 
				acc19.getCategory_id(), 
				acc19.getName(), 
				acc19.getNumber_account());
		
		DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
				acc20.getId(), 
				acc20.getCategory_id(), 
				acc20.getName(), 
				acc20.getNumber_account());
		
		
		DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
				acc21.getId(), 
				acc21.getCategory_id(), 
				acc21.getName(), 
				acc21.getNumber_account());
		

		DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
		defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
		defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
		defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
		defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
		defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
		defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
		defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
		defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
		defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
		defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
		defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
		defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
		defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
		defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
		defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
		defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
		defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
		defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
		defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
		defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
		defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
		
		companyResponse.setDefault_accounts(defaultAccountResponse);
		companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
		
		List<UserResponse> usersResponse = new ArrayList<>();
		for (User user : company.getUser()) {
			
			UserResponse u = new UserResponse(
					user.getId(), 
					user.getName(),
					user.getUsername(), 
					user.getPassword(),
					user.getEmail(),
					user.getRole(),
					user.getActive(),
					user.getCreatedDate(),
					user.getDeleteDate());
			usersResponse.add(u);
		}
		
		companyResponse.setUser(usersResponse);
		
		return new ResponseEntity<>(companyResponse, HttpStatus.OK);
	}
	
	
//	@CachePut(value = "company_edit", key = "#id")
	@RequestMapping(value = "company/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editCompany(@PathVariable("id") int id, @RequestBody UpdateCompanyRequest request){

		
		Company company = services.editCompany(id, request);
		
		GetCompanyResponse companyResponse = new GetCompanyResponse();
		companyResponse.setId(company.getId());
		companyResponse.setName(company.getName());
		companyResponse.setIndustry(company.getIndustry());
		companyResponse.setAddress(company.getAddress());
		companyResponse.setShipping_address(company.getShipping_address());
		companyResponse.setShipping_sale(company.isShipping_sale());
		companyResponse.setShipping_purchase(company.isShipping_purchase());
		companyResponse.setPhone(company.getPhone());
		companyResponse.setFax(company.getFax());
		companyResponse.setCompany_tax_number(company.getCompany_tax_number());
		companyResponse.setTag(false);
		companyResponse.setUse_multi_currency(company.isUse_multi_currency());
		companyResponse.setCurrency_format_view(company.getCurrency_format_view());
		companyResponse.setShow_logo_report(company.isShow_logo_report());
		companyResponse.setCompany_website(company.getCompany_website());
		companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		companyResponse.setProduct_image(company.getProduct_image());
		companyResponse.setProduct_category(company.isProduct_category());
		companyResponse.setShow_stock(company.isShow_stock());
		companyResponse.setCompany_email(company.getCompany_email());
		companyResponse.setdefault_invoice_message(company.getDefault_invoice_message());
		companyResponse.setdefault_delivery_slip_message(company.getDefault_delivery_slip_message());
		companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
		companyResponse.setUse_profit_margin(company.isUse_profit_margin());
		companyResponse.setdefault_purchase_order_message(company.getDefault_purchase_order_message());
		companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
		companyResponse.setDiscount_sale(company.isDiscount_sale());
		companyResponse.setDeposit_sale(company.isDeposit_sale());
		companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		companyResponse.setDiscount_purchase(company.isDiscount_purchase());
		companyResponse.setDeposit_purchase(company.isDeposit_purchase());
		companyResponse.setFeature(company.getFeature());
		companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
		companyResponse.setLogo(company.getLogo());
		companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
		companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
		companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
		companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
		companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
		companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
		companyResponse.setHas_sales_transaction_with_discount(company.isHas_sales_transaction_with_discount());
		companyResponse.setHas_purchase_transaction_with_discount(company.isHas_purchase_transaction_with_discount());
		companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
		companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
	
		Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
		
		PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
				invoiceTerm.getId(),
				invoiceTerm.getName(), 
				invoiceTerm.getLongetivity());
		
		companyResponse.setPreferred_invoice_term(preferred_invoice_term);
		
		Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
		
		PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
				purchaseTerm.getId(),
				purchaseTerm.getName(), 
				purchaseTerm.getLongetivity());
		
		companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
		
		companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
		companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
		companyResponse.setTotal_accounts(company.getTotal_accounts());
		
		CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
				company.getCompany_currency().getId(),
				company.getCompany_currency().getCountry(), 
				company.getCompany_currency().getCode(), 
				company.getCompany_currency().getSymbol(), 
				company.getCompany_currency().getCurrency_in_words());
		
		companyResponse.setCompany_currency(company_currency);
		
		companyResponse.setCompany_billing_details(company.getCompany_billing_details());
		
		Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
		Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
		Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
		Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
		Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
		Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
		Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
		Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
		Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
		Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
		Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
		Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
		Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
		Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
		Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
		Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
		Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
		Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
		Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
		Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
		Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
	
		DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
				acc1.getId(), 
				acc1.getCategory_id(), 
				acc1.getName(), 
				acc1.getNumber_account());
		
		DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
				acc2.getId(), 
				acc2.getCategory_id(), 
				acc2.getName(), 
				acc2.getNumber_account());
		
		DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
				acc3.getId(), 
				acc3.getCategory_id(), 
				acc3.getName(), 
				acc3.getNumber_account());
		
		DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
				acc4.getId(), 
				acc4.getCategory_id(), 
				acc4.getName(), 
				acc4.getNumber_account());
		
		DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
				acc5.getId(), 
				acc5.getCategory_id(), 
				acc5.getName(), 
				acc5.getNumber_account());
		
		DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
				acc6.getId(), 
				acc6.getCategory_id(), 
				acc6.getName(), 
				acc6.getNumber_account());

		DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
				acc7.getId(), 
				acc7.getCategory_id(), 
				acc7.getName(), 
				acc7.getNumber_account());
		
		
		DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
				acc8.getId(), 
				acc8.getCategory_id(), 
				acc8.getName(), 
				acc8.getNumber_account());
		
		DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
				acc9.getId(), 
				acc9.getCategory_id(), 
				acc9.getName(), 
				acc9.getNumber_account());
		
		DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
				acc10.getId(), 
				acc10.getCategory_id(), 
				acc10.getName(), 
				acc10.getNumber_account());
		
		DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
				acc11.getId(), 
				acc11.getCategory_id(), 
				acc11.getName(), 
				acc11.getNumber_account());
		
		DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
				acc12.getId(), 
				acc12.getCategory_id(), 
				acc12.getName(), 
				acc12.getNumber_account());
		
		DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
				acc13.getId(), 
				acc13.getCategory_id(), 
				acc13.getName(), 
				acc13.getNumber_account());
		
		DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
				acc14.getId(), 
				acc14.getCategory_id(), 
				acc14.getName(), 
				acc14.getNumber_account());
		
		DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
				acc15.getId(), 
				acc15.getCategory_id(), 
				acc15.getName(), 
				acc15.getNumber_account());
		
		DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
				acc16.getId(), 
				acc16.getCategory_id(), 
				acc16.getName(), 
				acc16.getNumber_account());
		
		DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
				acc17.getId(), 
				acc17.getCategory_id(), 
				acc17.getName(), 
				acc17.getNumber_account());
		
		
		DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
				acc18.getId(), 
				acc18.getCategory_id(), 
				acc18.getName(), 
				acc18.getNumber_account());
		
		DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
				acc19.getId(), 
				acc19.getCategory_id(), 
				acc19.getName(), 
				acc19.getNumber_account());
		
		DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
				acc20.getId(), 
				acc20.getCategory_id(), 
				acc20.getName(), 
				acc20.getNumber_account());
		
		
		DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
				acc21.getId(), 
				acc21.getCategory_id(), 
				acc21.getName(), 
				acc21.getNumber_account());
		

		DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
		defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
		defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
		defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
		defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
		defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
		defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
		defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
		defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
		defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
		defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
		defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
		defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
		defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
		defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
		defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
		defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
		defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
		defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
		defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
		defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
		defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
		
		companyResponse.setDefault_accounts(defaultAccountResponse);
		companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
		
		List<UserResponse> usersResponse = new ArrayList<>();
		for (User user : company.getUser()) {
			
			UserResponse u = new UserResponse(
					user.getId(), 
					user.getName(),
					user.getUsername(), 
					user.getPassword(),
					user.getEmail(),
					user.getRole(),
					user.getActive(),
					user.getCreatedDate(),
					user.getDeleteDate());
			usersResponse.add(u);
		}
		
		companyResponse.setUser(usersResponse);
		
		return new ResponseEntity<>(companyResponse, HttpStatus.OK);
	}
	
//	@CachePut(value = "company_edit", key = "#id")
	@RequestMapping(value = "company/{id}/company_setting", method = RequestMethod.PUT)
	public ResponseEntity<?> companySetting(@PathVariable("id") int id, @RequestBody CompanySettingRequest request){
		
		Company company = services.updateCompanySetting(id, request);
		GetCompanyResponse companyResponse = new GetCompanyResponse();
		companyResponse.setId(company.getId());
		companyResponse.setName(company.getName());
		companyResponse.setIndustry(company.getIndustry());
		companyResponse.setAddress(company.getAddress());
		companyResponse.setShipping_address(company.getShipping_address());
		companyResponse.setShipping_sale(company.isShipping_sale());
		companyResponse.setShipping_purchase(company.isShipping_purchase());
		companyResponse.setPhone(company.getPhone());
		companyResponse.setFax(company.getFax());
		companyResponse.setCompany_tax_number(company.getCompany_tax_number());
		companyResponse.setTag(false);
		companyResponse.setUse_multi_currency(company.isUse_multi_currency());
		companyResponse.setCurrency_format_view(company.getCurrency_format_view());
		companyResponse.setShow_logo_report(company.isShow_logo_report());
		companyResponse.setCompany_website(company.getCompany_website());
		companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		companyResponse.setProduct_image(company.getProduct_image());
		companyResponse.setProduct_category(company.isProduct_category());
		companyResponse.setShow_stock(company.isShow_stock());
		companyResponse.setCompany_email(company.getCompany_email());
		companyResponse.setdefault_invoice_message(company.getDefault_invoice_message());
		companyResponse.setdefault_delivery_slip_message(company.getDefault_delivery_slip_message());
		companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
		companyResponse.setUse_profit_margin(company.isUse_profit_margin());
		companyResponse.setdefault_purchase_order_message(company.getDefault_purchase_order_message());
		companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
		companyResponse.setDiscount_sale(company.isDiscount_sale());
		companyResponse.setDeposit_sale(company.isDeposit_sale());
		companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		companyResponse.setDiscount_purchase(company.isDiscount_purchase());
		companyResponse.setDeposit_purchase(company.isDeposit_purchase());
		companyResponse.setFeature(company.getFeature());
		companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
		companyResponse.setLogo(company.getLogo());
		companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
		companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
		companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
		companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
		companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
		companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
		companyResponse.setHas_sales_transaction_with_discount(company.isHas_sales_transaction_with_discount());
		companyResponse.setHas_purchase_transaction_with_discount(company.isHas_purchase_transaction_with_discount());
		companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
		companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
	
		Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
		
		PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
				invoiceTerm.getId(),
				invoiceTerm.getName(), 
				invoiceTerm.getLongetivity());
		
		companyResponse.setPreferred_invoice_term(preferred_invoice_term);
		
		Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
		
		PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
				purchaseTerm.getId(),
				purchaseTerm.getName(), 
				purchaseTerm.getLongetivity());
		
		companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
		
		companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
		companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
		companyResponse.setTotal_accounts(company.getTotal_accounts());
		
		CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
				company.getCompany_currency().getId(),
				company.getCompany_currency().getCountry(), 
				company.getCompany_currency().getCode(), 
				company.getCompany_currency().getSymbol(), 
				company.getCompany_currency().getCurrency_in_words());
		
		companyResponse.setCompany_currency(company_currency);
		
		companyResponse.setCompany_billing_details(company.getCompany_billing_details());
		
		Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
		Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
		Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
		Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
		Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
		Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
		Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
		Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
		Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
		Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
		Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
		Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
		Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
		Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
		Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
		Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
		Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
		Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
		Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
		Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
		Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
	
		DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
				acc1.getId(), 
				acc1.getCategory_id(), 
				acc1.getName(), 
				acc1.getNumber_account());
		
		DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
				acc2.getId(), 
				acc2.getCategory_id(), 
				acc2.getName(), 
				acc2.getNumber_account());
		
		DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
				acc3.getId(), 
				acc3.getCategory_id(), 
				acc3.getName(), 
				acc3.getNumber_account());
		
		DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
				acc4.getId(), 
				acc4.getCategory_id(), 
				acc4.getName(), 
				acc4.getNumber_account());
		
		DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
				acc5.getId(), 
				acc5.getCategory_id(), 
				acc5.getName(), 
				acc5.getNumber_account());
		
		DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
				acc6.getId(), 
				acc6.getCategory_id(), 
				acc6.getName(), 
				acc6.getNumber_account());

		DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
				acc7.getId(), 
				acc7.getCategory_id(), 
				acc7.getName(), 
				acc7.getNumber_account());
		
		
		DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
				acc8.getId(), 
				acc8.getCategory_id(), 
				acc8.getName(), 
				acc8.getNumber_account());
		
		DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
				acc9.getId(), 
				acc9.getCategory_id(), 
				acc9.getName(), 
				acc9.getNumber_account());
		
		DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
				acc10.getId(), 
				acc10.getCategory_id(), 
				acc10.getName(), 
				acc10.getNumber_account());
		
		DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
				acc11.getId(), 
				acc11.getCategory_id(), 
				acc11.getName(), 
				acc11.getNumber_account());
		
		DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
				acc12.getId(), 
				acc12.getCategory_id(), 
				acc12.getName(), 
				acc12.getNumber_account());
		
		DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
				acc13.getId(), 
				acc13.getCategory_id(), 
				acc13.getName(), 
				acc13.getNumber_account());
		
		DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
				acc14.getId(), 
				acc14.getCategory_id(), 
				acc14.getName(), 
				acc14.getNumber_account());
		
		DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
				acc15.getId(), 
				acc15.getCategory_id(), 
				acc15.getName(), 
				acc15.getNumber_account());
		
		DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
				acc16.getId(), 
				acc16.getCategory_id(), 
				acc16.getName(), 
				acc16.getNumber_account());
		
		DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
				acc17.getId(), 
				acc17.getCategory_id(), 
				acc17.getName(), 
				acc17.getNumber_account());
		
		
		DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
				acc18.getId(), 
				acc18.getCategory_id(), 
				acc18.getName(), 
				acc18.getNumber_account());
		
		DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
				acc19.getId(), 
				acc19.getCategory_id(), 
				acc19.getName(), 
				acc19.getNumber_account());
		
		DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
				acc20.getId(), 
				acc20.getCategory_id(), 
				acc20.getName(), 
				acc20.getNumber_account());
		
		
		DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
				acc21.getId(), 
				acc21.getCategory_id(), 
				acc21.getName(), 
				acc21.getNumber_account());
		

		DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
		defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
		defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
		defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
		defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
		defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
		defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
		defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
		defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
		defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
		defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
		defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
		defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
		defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
		defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
		defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
		defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
		defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
		defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
		defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
		defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
		defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
		
		companyResponse.setDefault_accounts(defaultAccountResponse);
		companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
		
		List<UserResponse> usersResponse = new ArrayList<>();
		for (User user : company.getUser()) {
			
			UserResponse u = new UserResponse(
					user.getId(), 
					user.getName(),
					user.getUsername(), 
					user.getPassword(),
					user.getEmail(),
					user.getRole(),
					user.getActive(),
					user.getCreatedDate(),
					user.getDeleteDate());
			usersResponse.add(u);
		}
		
		companyResponse.setUser(usersResponse);
		return new ResponseEntity<>(companyResponse, HttpStatus.OK);
		
	}
	
//	@CachePut(value = "company_edit", key = "#id")
	@RequestMapping(value = "company/{id}/product_stock", method = RequestMethod.PUT)
	public ResponseEntity<?> productStock(@PathVariable("id") int id, @RequestBody UpdateProductStock request){
		Company company = services.updateProductStock(id, request);

		GetCompanyResponse companyResponse = new GetCompanyResponse();
		companyResponse.setId(company.getId());
		companyResponse.setName(company.getName());
		companyResponse.setIndustry(company.getIndustry());
		companyResponse.setAddress(company.getAddress());
		companyResponse.setShipping_address(company.getShipping_address());
		companyResponse.setShipping_sale(company.isShipping_sale());
		companyResponse.setShipping_purchase(company.isShipping_purchase());
		companyResponse.setPhone(company.getPhone());
		companyResponse.setFax(company.getFax());
		companyResponse.setCompany_tax_number(company.getCompany_tax_number());
		companyResponse.setTag(false);
		companyResponse.setUse_multi_currency(company.isUse_multi_currency());
		companyResponse.setCurrency_format_view(company.getCurrency_format_view());
		companyResponse.setShow_logo_report(company.isShow_logo_report());
		companyResponse.setCompany_website(company.getCompany_website());
		companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		companyResponse.setProduct_image(company.getProduct_image());
		companyResponse.setProduct_category(company.isProduct_category());
		companyResponse.setShow_stock(company.isShow_stock());
		companyResponse.setCompany_email(company.getCompany_email());
		companyResponse.setdefault_invoice_message(company.getDefault_invoice_message());
		companyResponse.setdefault_delivery_slip_message(company.getDefault_delivery_slip_message());
		companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
		companyResponse.setUse_profit_margin(company.isUse_profit_margin());
		companyResponse.setdefault_purchase_order_message(company.getDefault_purchase_order_message());
		companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
		companyResponse.setDiscount_sale(company.isDiscount_sale());
		companyResponse.setDeposit_sale(company.isDeposit_sale());
		companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		companyResponse.setDiscount_purchase(company.isDiscount_purchase());
		companyResponse.setDeposit_purchase(company.isDeposit_purchase());
		companyResponse.setFeature(company.getFeature());
		companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
		companyResponse.setLogo(company.getLogo());
		companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
		companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
		companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
		companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
		companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
		companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
		companyResponse.setHas_sales_transaction_with_discount(company.isHas_sales_transaction_with_discount());
		companyResponse.setHas_purchase_transaction_with_discount(company.isHas_purchase_transaction_with_discount());
		companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
		companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
	
		Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
		
		PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
				invoiceTerm.getId(),
				invoiceTerm.getName(), 
				invoiceTerm.getLongetivity());
		
		companyResponse.setPreferred_invoice_term(preferred_invoice_term);
		
		Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
		
		PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
				purchaseTerm.getId(),
				purchaseTerm.getName(), 
				purchaseTerm.getLongetivity());
		
		companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
		
		companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
		companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
		companyResponse.setTotal_accounts(company.getTotal_accounts());
		
		CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
				company.getCompany_currency().getId(),
				company.getCompany_currency().getCountry(), 
				company.getCompany_currency().getCode(), 
				company.getCompany_currency().getSymbol(), 
				company.getCompany_currency().getCurrency_in_words());
		
		companyResponse.setCompany_currency(company_currency);
		
		companyResponse.setCompany_billing_details(company.getCompany_billing_details());
		
		Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
		Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
		Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
		Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
		Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
		Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
		Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
		Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
		Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
		Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
		Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
		Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
		Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
		Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
		Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
		Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
		Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
		Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
		Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
		Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
		Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
	
		DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
				acc1.getId(), 
				acc1.getCategory_id(), 
				acc1.getName(), 
				acc1.getNumber_account());
		
		DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
				acc2.getId(), 
				acc2.getCategory_id(), 
				acc2.getName(), 
				acc2.getNumber_account());
		
		DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
				acc3.getId(), 
				acc3.getCategory_id(), 
				acc3.getName(), 
				acc3.getNumber_account());
		
		DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
				acc4.getId(), 
				acc4.getCategory_id(), 
				acc4.getName(), 
				acc4.getNumber_account());
		
		DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
				acc5.getId(), 
				acc5.getCategory_id(), 
				acc5.getName(), 
				acc5.getNumber_account());
		
		DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
				acc6.getId(), 
				acc6.getCategory_id(), 
				acc6.getName(), 
				acc6.getNumber_account());

		DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
				acc7.getId(), 
				acc7.getCategory_id(), 
				acc7.getName(), 
				acc7.getNumber_account());
		
		
		DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
				acc8.getId(), 
				acc8.getCategory_id(), 
				acc8.getName(), 
				acc8.getNumber_account());
		
		DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
				acc9.getId(), 
				acc9.getCategory_id(), 
				acc9.getName(), 
				acc9.getNumber_account());
		
		DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
				acc10.getId(), 
				acc10.getCategory_id(), 
				acc10.getName(), 
				acc10.getNumber_account());
		
		DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
				acc11.getId(), 
				acc11.getCategory_id(), 
				acc11.getName(), 
				acc11.getNumber_account());
		
		DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
				acc12.getId(), 
				acc12.getCategory_id(), 
				acc12.getName(), 
				acc12.getNumber_account());
		
		DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
				acc13.getId(), 
				acc13.getCategory_id(), 
				acc13.getName(), 
				acc13.getNumber_account());
		
		DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
				acc14.getId(), 
				acc14.getCategory_id(), 
				acc14.getName(), 
				acc14.getNumber_account());
		
		DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
				acc15.getId(), 
				acc15.getCategory_id(), 
				acc15.getName(), 
				acc15.getNumber_account());
		
		DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
				acc16.getId(), 
				acc16.getCategory_id(), 
				acc16.getName(), 
				acc16.getNumber_account());
		
		DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
				acc17.getId(), 
				acc17.getCategory_id(), 
				acc17.getName(), 
				acc17.getNumber_account());
		
		
		DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
				acc18.getId(), 
				acc18.getCategory_id(), 
				acc18.getName(), 
				acc18.getNumber_account());
		
		DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
				acc19.getId(), 
				acc19.getCategory_id(), 
				acc19.getName(), 
				acc19.getNumber_account());
		
		DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
				acc20.getId(), 
				acc20.getCategory_id(), 
				acc20.getName(), 
				acc20.getNumber_account());
		
		
		DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
				acc21.getId(), 
				acc21.getCategory_id(), 
				acc21.getName(), 
				acc21.getNumber_account());
		

		DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
		defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
		defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
		defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
		defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
		defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
		defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
		defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
		defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
		defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
		defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
		defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
		defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
		defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
		defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
		defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
		defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
		defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
		defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
		defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
		defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
		defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
		
		companyResponse.setDefault_accounts(defaultAccountResponse);
		companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
		
		List<UserResponse> usersResponse = new ArrayList<>();
		for (User user : company.getUser()) {
			
			UserResponse u = new UserResponse(
					user.getId(), 
					user.getName(),
					user.getUsername(), 
					user.getPassword(),
					user.getEmail(),
					user.getRole(),
					user.getActive(),
					user.getCreatedDate(),
					user.getDeleteDate());
			usersResponse.add(u);
		}
		
		companyResponse.setUser(usersResponse);
		return new ResponseEntity<>(companyResponse, HttpStatus.OK);
	}
//	@CachePut(value = "company_edit", key = "#id")
	@RequestMapping(value = "company/{id}/account_mapping", method = RequestMethod.PUT)
	public ResponseEntity<?> editAccountMapping(@PathVariable("id") int id, @RequestBody UpdateMappingRequest request){
		Company company = services.updateAccountMapping(id, request);
		GetCompanyResponse companyResponse = new GetCompanyResponse();
		companyResponse.setId(company.getId());
		companyResponse.setName(company.getName());
		companyResponse.setIndustry(company.getIndustry());
		companyResponse.setAddress(company.getAddress());
		companyResponse.setShipping_address(company.getShipping_address());
		companyResponse.setShipping_sale(company.isShipping_sale());
		companyResponse.setShipping_purchase(company.isShipping_purchase());
		companyResponse.setPhone(company.getPhone());
		companyResponse.setFax(company.getFax());
		companyResponse.setCompany_tax_number(company.getCompany_tax_number());
		companyResponse.setTag(false);
		companyResponse.setUse_multi_currency(company.isUse_multi_currency());
		companyResponse.setCurrency_format_view(company.getCurrency_format_view());
		companyResponse.setShow_logo_report(company.isShow_logo_report());
		companyResponse.setCompany_website(company.getCompany_website());
		companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		companyResponse.setProduct_image(company.getProduct_image());
		companyResponse.setProduct_category(company.isProduct_category());
		companyResponse.setShow_stock(company.isShow_stock());
		companyResponse.setCompany_email(company.getCompany_email());
		companyResponse.setdefault_invoice_message(company.getDefault_invoice_message());
		companyResponse.setdefault_delivery_slip_message(company.getDefault_delivery_slip_message());
		companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
		companyResponse.setUse_profit_margin(company.isUse_profit_margin());
		companyResponse.setdefault_purchase_order_message(company.getDefault_purchase_order_message());
		companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
		companyResponse.setDiscount_sale(company.isDiscount_sale());
		companyResponse.setDeposit_sale(company.isDeposit_sale());
		companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		companyResponse.setDiscount_purchase(company.isDiscount_purchase());
		companyResponse.setDeposit_purchase(company.isDeposit_purchase());
		companyResponse.setFeature(company.getFeature());
		companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
		companyResponse.setLogo(company.getLogo());
		companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
		companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
		companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
		companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
		companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
		companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
		companyResponse.setHas_sales_transaction_with_discount(company.isHas_sales_transaction_with_discount());
		companyResponse.setHas_purchase_transaction_with_discount(company.isHas_purchase_transaction_with_discount());
		companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
		companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
	
		Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
		
		PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
				invoiceTerm.getId(),
				invoiceTerm.getName(), 
				invoiceTerm.getLongetivity());
		
		companyResponse.setPreferred_invoice_term(preferred_invoice_term);
		
		Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
		
		PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
				purchaseTerm.getId(),
				purchaseTerm.getName(), 
				purchaseTerm.getLongetivity());
		
		companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
		
		companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
		companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
		companyResponse.setTotal_accounts(company.getTotal_accounts());
		
		CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
				company.getCompany_currency().getId(),
				company.getCompany_currency().getCountry(), 
				company.getCompany_currency().getCode(), 
				company.getCompany_currency().getSymbol(), 
				company.getCompany_currency().getCurrency_in_words());
		
		companyResponse.setCompany_currency(company_currency);
		
		companyResponse.setCompany_billing_details(company.getCompany_billing_details());
		
		Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
		Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
		Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
		Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
		Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
		Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
		Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
		Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
		Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
		Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
		Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
		Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
		Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
		Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
		Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
		Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
		Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
		Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
		Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
		Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
		Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
	
		DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
				acc1.getId(), 
				acc1.getCategory_id(), 
				acc1.getName(), 
				acc1.getNumber_account());
		
		DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
				acc2.getId(), 
				acc2.getCategory_id(), 
				acc2.getName(), 
				acc2.getNumber_account());
		
		DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
				acc3.getId(), 
				acc3.getCategory_id(), 
				acc3.getName(), 
				acc3.getNumber_account());
		
		DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
				acc4.getId(), 
				acc4.getCategory_id(), 
				acc4.getName(), 
				acc4.getNumber_account());
		
		DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
				acc5.getId(), 
				acc5.getCategory_id(), 
				acc5.getName(), 
				acc5.getNumber_account());
		
		DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
				acc6.getId(), 
				acc6.getCategory_id(), 
				acc6.getName(), 
				acc6.getNumber_account());

		DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
				acc7.getId(), 
				acc7.getCategory_id(), 
				acc7.getName(), 
				acc7.getNumber_account());
		
		
		DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
				acc8.getId(), 
				acc8.getCategory_id(), 
				acc8.getName(), 
				acc8.getNumber_account());
		
		DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
				acc9.getId(), 
				acc9.getCategory_id(), 
				acc9.getName(), 
				acc9.getNumber_account());
		
		DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
				acc10.getId(), 
				acc10.getCategory_id(), 
				acc10.getName(), 
				acc10.getNumber_account());
		
		DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
				acc11.getId(), 
				acc11.getCategory_id(), 
				acc11.getName(), 
				acc11.getNumber_account());
		
		DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
				acc12.getId(), 
				acc12.getCategory_id(), 
				acc12.getName(), 
				acc12.getNumber_account());
		
		DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
				acc13.getId(), 
				acc13.getCategory_id(), 
				acc13.getName(), 
				acc13.getNumber_account());
		
		DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
				acc14.getId(), 
				acc14.getCategory_id(), 
				acc14.getName(), 
				acc14.getNumber_account());
		
		DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
				acc15.getId(), 
				acc15.getCategory_id(), 
				acc15.getName(), 
				acc15.getNumber_account());
		
		DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
				acc16.getId(), 
				acc16.getCategory_id(), 
				acc16.getName(), 
				acc16.getNumber_account());
		
		DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
				acc17.getId(), 
				acc17.getCategory_id(), 
				acc17.getName(), 
				acc17.getNumber_account());
		
		
		DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
				acc18.getId(), 
				acc18.getCategory_id(), 
				acc18.getName(), 
				acc18.getNumber_account());
		
		DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
				acc19.getId(), 
				acc19.getCategory_id(), 
				acc19.getName(), 
				acc19.getNumber_account());
		
		DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
				acc20.getId(), 
				acc20.getCategory_id(), 
				acc20.getName(), 
				acc20.getNumber_account());
		
		
		DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
				acc21.getId(), 
				acc21.getCategory_id(), 
				acc21.getName(), 
				acc21.getNumber_account());
		

		DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
		defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
		defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
		defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
		defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
		defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
		defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
		defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
		defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
		defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
		defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
		defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
		defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
		defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
		defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
		defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
		defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
		defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
		defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
		defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
		defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
		defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
		
		companyResponse.setDefault_accounts(defaultAccountResponse);
		companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
		
		List<UserResponse> usersResponse = new ArrayList<>();
		for (User user : company.getUser()) {
			
			UserResponse u = new UserResponse(
					user.getId(), 
					user.getName(),
					user.getUsername(), 
					user.getPassword(),
					user.getEmail(),
					user.getRole(),
					user.getActive(),
					user.getCreatedDate(),
					user.getDeleteDate());
			usersResponse.add(u);
		}
		
		companyResponse.setUser(usersResponse);
		return new ResponseEntity<>(companyResponse, HttpStatus.OK);
	}
	
//	@CachePut(value = "company_edit", key = "#id")
	@RequestMapping(value = "company/{id}/sales_setting", method = RequestMethod.PUT)
	public ResponseEntity<?> companySalesSetting(@PathVariable("id") int id, @RequestBody SalesSettingRequest request){
		
		System.out.println(request.getTermId());
		Company company = services.updateCompanySalesSetting(id, request);
		GetCompanyResponse companyResponse = new GetCompanyResponse();
		companyResponse.setId(company.getId());
		companyResponse.setName(company.getName());
		companyResponse.setIndustry(company.getIndustry());
		companyResponse.setAddress(company.getAddress());
		companyResponse.setShipping_address(company.getShipping_address());
		companyResponse.setShipping_sale(company.isShipping_sale());
		companyResponse.setShipping_purchase(company.isShipping_purchase());
		companyResponse.setPhone(company.getPhone());
		companyResponse.setFax(company.getFax());
		companyResponse.setCompany_tax_number(company.getCompany_tax_number());
		companyResponse.setTag(false);
		companyResponse.setUse_multi_currency(company.isUse_multi_currency());
		companyResponse.setCurrency_format_view(company.getCurrency_format_view());
		companyResponse.setShow_logo_report(company.isShow_logo_report());
		companyResponse.setCompany_website(company.getCompany_website());
		companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		companyResponse.setProduct_image(company.getProduct_image());
		companyResponse.setProduct_category(company.isProduct_category());
		companyResponse.setShow_stock(company.isShow_stock());
		companyResponse.setCompany_email(company.getCompany_email());
		companyResponse.setdefault_invoice_message(company.getDefault_invoice_message());
		companyResponse.setdefault_delivery_slip_message(company.getDefault_delivery_slip_message());
		companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
		companyResponse.setUse_profit_margin(company.isUse_profit_margin());
		companyResponse.setdefault_purchase_order_message(company.getDefault_purchase_order_message());
		companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
		companyResponse.setDiscount_sale(company.isDiscount_sale());
		companyResponse.setDeposit_sale(company.isDeposit_sale());
		companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		companyResponse.setDiscount_purchase(company.isDiscount_purchase());
		companyResponse.setDeposit_purchase(company.isDeposit_purchase());
		companyResponse.setFeature(company.getFeature());
		companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
		companyResponse.setLogo(company.getLogo());
		companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
		companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
		companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
		companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
		companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
		companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
		companyResponse.setHas_sales_transaction_with_discount(company.isHas_sales_transaction_with_discount());
		companyResponse.setHas_purchase_transaction_with_discount(company.isHas_purchase_transaction_with_discount());
		companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
		companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
	
		Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
		
		PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
				invoiceTerm.getId(),
				invoiceTerm.getName(), 
				invoiceTerm.getLongetivity());
		
		companyResponse.setPreferred_invoice_term(preferred_invoice_term);
		
		Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
		
		PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
				purchaseTerm.getId(),
				purchaseTerm.getName(), 
				purchaseTerm.getLongetivity());
		
		companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
		
		companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
		companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
		companyResponse.setTotal_accounts(company.getTotal_accounts());
		
		CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
				company.getCompany_currency().getId(),
				company.getCompany_currency().getCountry(), 
				company.getCompany_currency().getCode(), 
				company.getCompany_currency().getSymbol(), 
				company.getCompany_currency().getCurrency_in_words());
		
		companyResponse.setCompany_currency(company_currency);
		
		companyResponse.setCompany_billing_details(company.getCompany_billing_details());
		
		Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
		Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
		Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
		Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
		Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
		Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
		Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
		Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
		Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
		Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
		Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
		Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
		Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
		Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
		Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
		Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
		Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
		Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
		Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
		Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
		Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
	
		DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
				acc1.getId(), 
				acc1.getCategory_id(), 
				acc1.getName(), 
				acc1.getNumber_account());
		
		DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
				acc2.getId(), 
				acc2.getCategory_id(), 
				acc2.getName(), 
				acc2.getNumber_account());
		
		DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
				acc3.getId(), 
				acc3.getCategory_id(), 
				acc3.getName(), 
				acc3.getNumber_account());
		
		DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
				acc4.getId(), 
				acc4.getCategory_id(), 
				acc4.getName(), 
				acc4.getNumber_account());
		
		DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
				acc5.getId(), 
				acc5.getCategory_id(), 
				acc5.getName(), 
				acc5.getNumber_account());
		
		DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
				acc6.getId(), 
				acc6.getCategory_id(), 
				acc6.getName(), 
				acc6.getNumber_account());

		DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
				acc7.getId(), 
				acc7.getCategory_id(), 
				acc7.getName(), 
				acc7.getNumber_account());
		
		
		DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
				acc8.getId(), 
				acc8.getCategory_id(), 
				acc8.getName(), 
				acc8.getNumber_account());
		
		DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
				acc9.getId(), 
				acc9.getCategory_id(), 
				acc9.getName(), 
				acc9.getNumber_account());
		
		DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
				acc10.getId(), 
				acc10.getCategory_id(), 
				acc10.getName(), 
				acc10.getNumber_account());
		
		DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
				acc11.getId(), 
				acc11.getCategory_id(), 
				acc11.getName(), 
				acc11.getNumber_account());
		
		DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
				acc12.getId(), 
				acc12.getCategory_id(), 
				acc12.getName(), 
				acc12.getNumber_account());
		
		DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
				acc13.getId(), 
				acc13.getCategory_id(), 
				acc13.getName(), 
				acc13.getNumber_account());
		
		DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
				acc14.getId(), 
				acc14.getCategory_id(), 
				acc14.getName(), 
				acc14.getNumber_account());
		
		DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
				acc15.getId(), 
				acc15.getCategory_id(), 
				acc15.getName(), 
				acc15.getNumber_account());
		
		DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
				acc16.getId(), 
				acc16.getCategory_id(), 
				acc16.getName(), 
				acc16.getNumber_account());
		
		DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
				acc17.getId(), 
				acc17.getCategory_id(), 
				acc17.getName(), 
				acc17.getNumber_account());
		
		
		DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
				acc18.getId(), 
				acc18.getCategory_id(), 
				acc18.getName(), 
				acc18.getNumber_account());
		
		DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
				acc19.getId(), 
				acc19.getCategory_id(), 
				acc19.getName(), 
				acc19.getNumber_account());
		
		DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
				acc20.getId(), 
				acc20.getCategory_id(), 
				acc20.getName(), 
				acc20.getNumber_account());
		
		
		DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
				acc21.getId(), 
				acc21.getCategory_id(), 
				acc21.getName(), 
				acc21.getNumber_account());
		

		DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
		defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
		defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
		defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
		defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
		defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
		defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
		defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
		defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
		defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
		defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
		defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
		defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
		defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
		defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
		defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
		defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
		defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
		defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
		defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
		defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
		defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
		
		companyResponse.setDefault_accounts(defaultAccountResponse);
		companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
		
		List<UserResponse> usersResponse = new ArrayList<>();
		for (User user : company.getUser()) {
			
			UserResponse u = new UserResponse(
					user.getId(), 
					user.getName(),
					user.getUsername(), 
					user.getPassword(),
					user.getEmail(),
					user.getRole(),
					user.getActive(),
					user.getCreatedDate(),
					user.getDeleteDate());
			usersResponse.add(u);
		}
		
		companyResponse.setUser(usersResponse);
		return new ResponseEntity<>(companyResponse, HttpStatus.OK);
	}
//	@CachePut(value = "company_edit", key = "#id")
	@RequestMapping(value = "company/{id}/purchase_setting", method = RequestMethod.PUT)
	public ResponseEntity<?> companyPurchaseSetting(@PathVariable("id") int id, @RequestBody PurchaseSettingRequset request){
		
		System.out.println(request.getTermId());
		Company company = services.updateCompanyPurchaseSetting(id, request);
		GetCompanyResponse companyResponse = new GetCompanyResponse();
		companyResponse.setId(company.getId());
		companyResponse.setName(company.getName());
		companyResponse.setIndustry(company.getIndustry());
		companyResponse.setAddress(company.getAddress());
		companyResponse.setShipping_address(company.getShipping_address());
		companyResponse.setShipping_sale(company.isShipping_sale());
		companyResponse.setShipping_purchase(company.isShipping_purchase());
		companyResponse.setPhone(company.getPhone());
		companyResponse.setFax(company.getFax());
		companyResponse.setCompany_tax_number(company.getCompany_tax_number());
		companyResponse.setTag(false);
		companyResponse.setUse_multi_currency(company.isUse_multi_currency());
		companyResponse.setCurrency_format_view(company.getCurrency_format_view());
		companyResponse.setShow_logo_report(company.isShow_logo_report());
		companyResponse.setCompany_website(company.getCompany_website());
		companyResponse.setEnable_monthly_performance_email(company.isEnable_monthly_performance_email());
		companyResponse.setProduct_image(company.getProduct_image());
		companyResponse.setProduct_category(company.isProduct_category());
		companyResponse.setShow_stock(company.isShow_stock());
		companyResponse.setCompany_email(company.getCompany_email());
		companyResponse.setdefault_invoice_message(company.getDefault_invoice_message());
		companyResponse.setdefault_delivery_slip_message(company.getDefault_delivery_slip_message());
		companyResponse.setDisable_sell_on_no_product(company.isDisable_sell_on_no_product());
		companyResponse.setUse_profit_margin(company.isUse_profit_margin());
		companyResponse.setdefault_purchase_order_message(company.getDefault_purchase_order_message());
		companyResponse.setDiscount_lines_sale(company.isDiscount_lines_sale());
		companyResponse.setDiscount_sale(company.isDiscount_sale());
		companyResponse.setDeposit_sale(company.isDeposit_sale());
		companyResponse.setDiscount_lines_purchase(company.isDiscount_lines_purchase());
		companyResponse.setDiscount_purchase(company.isDiscount_purchase());
		companyResponse.setDeposit_purchase(company.isDeposit_purchase());
		companyResponse.setFeature(company.getFeature());
		companyResponse.setLast_closing_the_book_date(company.getLast_closing_the_book_date());
		companyResponse.setLogo(company.getLogo());
		companyResponse.setSales_shipping_account_changeable(company.isSales_shipping_account_changeable());
		companyResponse.setPurchases_shipping_account_changeable(company.isPurchases_shipping_account_changeable());
		companyResponse.setHas_sales_transaction_with_shipping(company.isHas_sales_transaction_with_shipping());
		companyResponse.setHas_purchase_transaction_with_shipping(company.isHas_purchase_transaction_with_shipping());
		companyResponse.setHas_purchase_with_discount_lines(company.isHas_purchase_with_discount_lines());
		companyResponse.setHas_sale_with_discount_lines(company.isHas_sale_with_discount_lines());
		companyResponse.setHas_sales_transaction_with_discount(company.isHas_sales_transaction_with_discount());
		companyResponse.setHas_purchase_transaction_with_discount(company.isHas_purchase_transaction_with_discount());
		companyResponse.setHas_sales_transaction_with_deposit(company.isHas_sales_transaction_with_deposit());
		companyResponse.setHas_purchase_transaction_with_deposit(company.isHas_purchase_transaction_with_deposit());
	
		Payment_Termin invoiceTerm = terminRepository.getOne(company.getPreferred_invoice_term());
		
		PreferredInvoiceTerm preferred_invoice_term = new PreferredInvoiceTerm(
				invoiceTerm.getId(),
				invoiceTerm.getName(), 
				invoiceTerm.getLongetivity());
		
		companyResponse.setPreferred_invoice_term(preferred_invoice_term);
		
		Payment_Termin purchaseTerm = terminRepository.getOne(company.getPreferred_purchase_term());
		
		PreferredPurchaseTerm preferredPurchaseTerm = new PreferredPurchaseTerm(
				purchaseTerm.getId(),
				purchaseTerm.getName(), 
				purchaseTerm.getLongetivity());
		
		companyResponse.setPreferred_purchase_term(preferredPurchaseTerm);
		
		companyResponse.setDraft_cash_transaction_feature(company.isDraft_cash_transaction_feature());
		companyResponse.setCompany_bank_detail(company.getCompany_bank_detail());
		companyResponse.setTotal_accounts(company.getTotal_accounts());
		
		CompanyCurrencyResponse company_currency = new CompanyCurrencyResponse(
				company.getCompany_currency().getId(),
				company.getCompany_currency().getCountry(), 
				company.getCompany_currency().getCode(), 
				company.getCompany_currency().getSymbol(), 
				company.getCompany_currency().getCurrency_in_words());
		
		companyResponse.setCompany_currency(company_currency);
		
		companyResponse.setCompany_billing_details(company.getCompany_billing_details());
		
		Account acc1 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_payable());
		Account acc2 = AccountRepository.getOne(company.getDefault_accounts().getDefault_account_receiveable());
		Account acc3 = AccountRepository.getOne(company.getDefault_accounts().getDefault_cost_of_good_sold());
		Account acc4 = AccountRepository.getOne(company.getDefault_accounts().getDefault_fixed_asset_account());
		Account acc5 = AccountRepository.getOne(company.getDefault_accounts().getDefault_inventory_account());
		Account acc6 = AccountRepository.getOne(company.getDefault_accounts().getDefault_opening_balance_equity());
		Account acc7 = AccountRepository.getOne(company.getDefault_accounts().getDefault_prepayment_account());
		Account acc8 = AccountRepository.getOne(company.getDefault_accounts().getDefault_purchase_tax_account());
		Account acc9 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_account());
		Account acc10 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sale_tax_account());
		Account acc11 = AccountRepository.getOne(company.getDefault_accounts().getDefault_sales_return_account());
		Account acc12 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_general());
		Account acc13 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_production());
		Account acc14 = AccountRepository.getOne(company.getDefault_accounts().getDefault_stock_adj_account_waste());
		Account acc15 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ap_account());
		Account acc16 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_ar_account());
		Account acc17 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unbilled_sales_account());
		Account acc18 = AccountRepository.getOne(company.getDefault_accounts().getDefault_unearned_revenue_account());
		Account acc19 = AccountRepository.getOne(company.getDefault_accounts().getPurchase_shipping_account());
		Account acc20 = AccountRepository.getOne(company.getDefault_accounts().getSale_discount_account());
		Account acc21 = AccountRepository.getOne(company.getDefault_accounts().getSale_shipping_account());
	
		DefaultAccountPayable defaultAccountPayable = new DefaultAccountPayable(
				acc1.getId(), 
				acc1.getCategory_id(), 
				acc1.getName(), 
				acc1.getNumber_account());
		
		DefaultAccountReceivable defaultAccountReceivable = new DefaultAccountReceivable(
				acc2.getId(), 
				acc2.getCategory_id(), 
				acc2.getName(), 
				acc2.getNumber_account());
		
		DefaultCostOfGoodSold defaultCostOfGoodSold = new DefaultCostOfGoodSold(
				acc3.getId(), 
				acc3.getCategory_id(), 
				acc3.getName(), 
				acc3.getNumber_account());
		
		DefaultFixedAssetAccount defaultFixedAssetAccount = new DefaultFixedAssetAccount(
				acc4.getId(), 
				acc4.getCategory_id(), 
				acc4.getName(), 
				acc4.getNumber_account());
		
		DefaultInventoryAccount defaultInventoryAccount = new DefaultInventoryAccount(
				acc5.getId(), 
				acc5.getCategory_id(), 
				acc5.getName(), 
				acc5.getNumber_account());
		
		DefaultOpeningBalanceEquity defaultOpeningBalanceEquity = new DefaultOpeningBalanceEquity(
				acc6.getId(), 
				acc6.getCategory_id(), 
				acc6.getName(), 
				acc6.getNumber_account());

		DefaultPrepaymentAccount defaultPrepaymentAccount = new DefaultPrepaymentAccount(
				acc7.getId(), 
				acc7.getCategory_id(), 
				acc7.getName(), 
				acc7.getNumber_account());
		
		
		DefaultPurchaseTaxAccount defaultPurchaseTaxAccount = new DefaultPurchaseTaxAccount(
				acc8.getId(), 
				acc8.getCategory_id(), 
				acc8.getName(), 
				acc8.getNumber_account());
		
		DefaultSaleAccount defaultSaleAccount = new DefaultSaleAccount(
				acc9.getId(), 
				acc9.getCategory_id(), 
				acc9.getName(), 
				acc9.getNumber_account());
		
		DefaultSaleTaxAccount defaultSaleTaxAccount = new DefaultSaleTaxAccount(
				acc10.getId(), 
				acc10.getCategory_id(), 
				acc10.getName(), 
				acc10.getNumber_account());
		
		DefaultSalesReturnAccount defaultSalesReturnAccount = new DefaultSalesReturnAccount(
				acc11.getId(), 
				acc11.getCategory_id(), 
				acc11.getName(), 
				acc11.getNumber_account());
		
		DefaultStockAdjAccountGeneral defaultStockAdjAccountGeneral = new DefaultStockAdjAccountGeneral(
				acc12.getId(), 
				acc12.getCategory_id(), 
				acc12.getName(), 
				acc12.getNumber_account());
		
		DefaultStockAdjAccountProduction defaultStockAdjAccountProduction = new DefaultStockAdjAccountProduction(
				acc13.getId(), 
				acc13.getCategory_id(), 
				acc13.getName(), 
				acc13.getNumber_account());
		
		DefaultStockAdjAccountWaste defaultStockAdjAccountWaste = new DefaultStockAdjAccountWaste(
				acc14.getId(), 
				acc14.getCategory_id(), 
				acc14.getName(), 
				acc14.getNumber_account());
		
		DefaultUnbilledApAccount defaultUnbilledApAccount = new DefaultUnbilledApAccount(
				acc15.getId(), 
				acc15.getCategory_id(), 
				acc15.getName(), 
				acc15.getNumber_account());
		
		DefaultUnbilledArAccount defaultUnbilledArAccount = new DefaultUnbilledArAccount(
				acc16.getId(), 
				acc16.getCategory_id(), 
				acc16.getName(), 
				acc16.getNumber_account());
		
		DefaultUnbilledSalesAccount defaultUnbilledSalesAccount = new DefaultUnbilledSalesAccount(
				acc17.getId(), 
				acc17.getCategory_id(), 
				acc17.getName(), 
				acc17.getNumber_account());
		
		
		DefaultUnearnedRevenueAccount defaultUnearnedRevenueAccount = new DefaultUnearnedRevenueAccount(
				acc18.getId(), 
				acc18.getCategory_id(), 
				acc18.getName(), 
				acc18.getNumber_account());
		
		DefaultPurchaseShippingAccount defaultPurchaseShippingAccount = new DefaultPurchaseShippingAccount(
				acc19.getId(), 
				acc19.getCategory_id(), 
				acc19.getName(), 
				acc19.getNumber_account());
		
		DefaultSaleShippingAccount defaultSaleShippingAccount = new DefaultSaleShippingAccount(
				acc20.getId(), 
				acc20.getCategory_id(), 
				acc20.getName(), 
				acc20.getNumber_account());
		
		
		DefaultSaleDiscount defaultSaleDiscount = new DefaultSaleDiscount(
				acc21.getId(), 
				acc21.getCategory_id(), 
				acc21.getName(), 
				acc21.getNumber_account());
		

		DefaultAccountResponse defaultAccountResponse = new DefaultAccountResponse();
		defaultAccountResponse.setDefault_account_payable(defaultAccountPayable);
		defaultAccountResponse.setDefault_account_receiveable(defaultAccountReceivable);
		defaultAccountResponse.setDefault_cost_of_good_sold(defaultCostOfGoodSold);
		defaultAccountResponse.setDefault_fixed_asset_account(defaultFixedAssetAccount);
		defaultAccountResponse.setDefault_inventory_account(defaultInventoryAccount);
		defaultAccountResponse.setDefault_opening_balance_equity(defaultOpeningBalanceEquity);
		defaultAccountResponse.setDefault_prepayment_account(defaultPrepaymentAccount);
		defaultAccountResponse.setDefault_purchase_shipping_account(defaultPurchaseShippingAccount);
		defaultAccountResponse.setDefault_purchase_tax_account(defaultPurchaseTaxAccount);
		defaultAccountResponse.setDefault_sale_account(defaultSaleAccount);
		defaultAccountResponse.setDefault_sale_discount_account(defaultSaleDiscount);
		defaultAccountResponse.setDefault_sale_shipping_account(defaultSaleShippingAccount);
		defaultAccountResponse.setDefault_sale_tax_account(defaultSaleTaxAccount);
		defaultAccountResponse.setDefault_sales_return_account(defaultSalesReturnAccount);
		defaultAccountResponse.setDefault_stock_adj_account_general(defaultStockAdjAccountGeneral);
		defaultAccountResponse.setDefault_stock_adj_account_production(defaultStockAdjAccountProduction);
		defaultAccountResponse.setDefault_stock_adj_account_waste(defaultStockAdjAccountWaste);
		defaultAccountResponse.setDefault_unbilled_ap_account(defaultUnbilledApAccount);
		defaultAccountResponse.setDefault_unbilled_ar_account(defaultUnbilledArAccount);
		defaultAccountResponse.setDefault_unbilled_sales_account(defaultUnbilledSalesAccount);
		defaultAccountResponse.setDefault_unearned_revenue_account(defaultUnearnedRevenueAccount);
		
		companyResponse.setDefault_accounts(defaultAccountResponse);
		companyResponse.setSelling_price_follow_price_rule(company.isSelling_price_follow_price_rule());
		
		List<UserResponse> usersResponse = new ArrayList<>();
		for (User user : company.getUser()) {
			
			UserResponse u = new UserResponse(
					user.getId(), 
					user.getName(),
					user.getUsername(), 
					user.getPassword(),
					user.getEmail(),
					user.getRole(),
					user.getActive(),
					user.getCreatedDate(),
					user.getDeleteDate());
			usersResponse.add(u);
		}
		
		companyResponse.setUser(usersResponse);
		return new ResponseEntity<>(companyResponse, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "company/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteCompany(@PathVariable("id") int id){
		services.deleteCompany(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "company/{id}/logo", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteLogo(@PathVariable("id") int id){
		services.deleteLogoCompany(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "company/logo/{logo}", produces = {MediaType.IMAGE_PNG_VALUE, "application/json"}, method = RequestMethod.GET)
	public ResponseEntity<?> displayLogo(@PathVariable("logo") String logo) throws IOException{
        Resource imgFile = services.getCompanyLogo(logo);
        InputStreamResource inputStreamResource =  new InputStreamResource(imgFile.getInputStream());
        return new ResponseEntity<>(inputStreamResource, HttpStatus.OK);
	}
	
	
	
	@RequestMapping(value = "company/{id}/image_upload", produces = {MediaType.IMAGE_PNG_VALUE, "application/json"}, method = RequestMethod.POST)
	public ResponseEntity<?> uploadLogo(@PathVariable("id") int id, @RequestParam("logo") MultipartFile imageFile){
				boolean upload = services.updateImage(id,imageFile);
				if(upload) {					
					return new ResponseEntity<>(new String("upload Successfull"),HttpStatus.OK);
				}else {
					return new ResponseEntity<>(new String("upload failed"),HttpStatus.BAD_REQUEST);
				}
	}
	


}
