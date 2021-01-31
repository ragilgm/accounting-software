package com.accounting.project.accounting.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.accounting.project.accounting.entity.BankTransfer;

public interface BankTransferRepository extends JpaRepository<BankTransfer, Integer>{
	
	
}
