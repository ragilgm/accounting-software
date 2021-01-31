package com.accounting.project.accounting.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.CategoryAccount;
import com.accounting.project.accounting.repository.CategoryAccountRepository;


@Service
public class CategoryAccountImpl {

	@Autowired
	private CategoryAccountRepository categoryAccountRepository;
	
	public List<CategoryAccount> listCategoryAccount(){
		return categoryAccountRepository.findAll();
	}
	
	public CategoryAccount addCategoryAccount(CategoryAccount CategoryAccount) {
		return categoryAccountRepository.save(CategoryAccount);
	}
	
	public CategoryAccount findById(int id) {
		return categoryAccountRepository.getOne(id);
	}
	
	public CategoryAccount editCategoryAccount(int id, CategoryAccount CategoryAccount) {
		CategoryAccount currentCategoryAccount = findById(id);
//		currentCategoryAccount.setCategoryName(CategoryAccount.getCategoryName());
		return categoryAccountRepository.save(currentCategoryAccount);
	}
	
	public void deleteCategoryAccount(int id) {
		categoryAccountRepository.deleteById(id);
	}
	
}
