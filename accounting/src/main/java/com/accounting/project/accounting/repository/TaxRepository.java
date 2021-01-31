package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.accounting.project.accounting.entity.Tax;

public interface TaxRepository extends JpaRepository<Tax, Integer>{

	
	@Query(value = "select c from Tax c where c.taxName=?1")
	Tax findByName(String company_tax_name);

}
