package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.OpeningBalance;

@Service
public interface OpeningBalanceRepository extends JpaRepository<OpeningBalance, Integer>{
	
	@Query(nativeQuery = true,value = "select * from opening_balance where account_id=?1 ORDER BY account_number asc")
	OpeningBalance findByAccountId(int account_id);

}
