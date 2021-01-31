//package com.accounting.project.accounting.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Service;
//
//import com.accounting.project.accounting.entity.CashBank;
//
//@Service
//public interface CashbankRepository extends JpaRepository<CashBank, Integer>{
//	
//	
//	@Query(value = "select c from CashBank c where c.id=?1")
//	CashBank findCashbankById(int id);
//
//}
