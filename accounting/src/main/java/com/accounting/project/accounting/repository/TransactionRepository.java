package com.accounting.project.accounting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.Account;
import com.accounting.project.accounting.entity.Transaction;

@Service
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

	@Query(nativeQuery = true, value = "select * from transaction where account_id=?1 ORDER BY created_at desc LIMIT 50")
		List<Transaction> getListTransactionByAccountId(int id);

	@Query(value = "select * from transaction where account_id=?1 and date >= ?2 and date <= ?3", nativeQuery=true)
	List<Transaction> getTransactionByDate(int id,String from,String to);

	
	@Query(value = "select a from Transaction a where a.journal_id=?1")
	List<Transaction> getTransactionByJournalId(int id);
}
