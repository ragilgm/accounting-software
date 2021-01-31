package com.accounting.project.accounting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.TransactionNumberFormat;

@Service
public interface TransactionNumberFormatRepository extends JpaRepository<TransactionNumberFormat, Integer>{

	
	@Query(value = "select a from TransactionNumberFormat a where a.companyId=?1 and a.type_id=?2")
	List<TransactionNumberFormat> getTransactionByTypeId(int id, int type_id);

	
	
}
