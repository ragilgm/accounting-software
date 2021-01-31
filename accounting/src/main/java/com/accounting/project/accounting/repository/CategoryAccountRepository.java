package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.CategoryAccount;

@Service
public interface CategoryAccountRepository extends JpaRepository<CategoryAccount, Integer>{

	
	@Query(value = "select c from CategoryAccount c where c.category_name=?1")
	CategoryAccount findByName(String name);

}
