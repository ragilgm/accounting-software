package com.accounting.project.accounting.restAPI;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.accounting.project.accounting.dtoResponse.CategoryAccount.CategoryAccountResponse;
import com.accounting.project.accounting.entity.CategoryAccount;
import com.accounting.project.accounting.repository.impl.CategoryAccountImpl;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class CategoryController {

	
	@Autowired
	private CategoryAccountImpl categoryServices;


	@RequestMapping(value = "category_account", method = RequestMethod.GET)
	public List<CategoryAccountResponse> ListCategory(){
		
		List<CategoryAccount> categoryAccount = categoryServices.listCategoryAccount();
		List<CategoryAccountResponse> response = new ArrayList<>();
		for (CategoryAccount category : categoryAccount) {
			CategoryAccountResponse res = new CategoryAccountResponse(
					category.getId(), category.getCategory_name());
			response.add(res);
		}
		return response;
	}

}
