package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.CompanyCurrency;

@Service
public interface CompanyCurrencyRepository extends JpaRepository<CompanyCurrency, Integer> {
	
	@Query(value = "select c from CompanyCurrency c where c.country=?1")
	CompanyCurrency findByName(String currency);

}
