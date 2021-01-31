package com.accounting.project.accounting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.Account;

@Service
public interface AccountRepository extends JpaRepository<Account, Integer> {

	@Query(nativeQuery = true,value = "select * from account where company_id=?1 ORDER BY number_account asc")
	List<Account> getAllAccountByCompany(int id);

	@Query(value = "select a from Account a where a.name=?1")
	Account findByName(String childrenName);

	@Query(value = "select a from Account a where a.company_id=?1 and a.name=?2")
	Account findByName(int company_id, String childrenName);

	@Query(value = "select a from Account a where a.company_id=?1 and a.number_account=?2")
	Account findByNumber(int company_id, String number);
	
	@Query(value = "select a from Account a where a.company_id=?1 and a.parent_id=?2")
	List<Account> findByParentId(int company_id, int parentid);

	
	
//	SELECT * FROM ACCOUNT WHERE company_id=21 AND NAME LIKE '%'"w"'%' OR category LIKE '&'"w"'%' OR number_account LIKE  '&'"1"'%'
	@Query(value = "select a from Account a where a.name like %?1% or a.category  like %?1%  or a.number_account like %?1% ")
	List<Account> seachAccount(@Param("q")String q);

	
	@Query(value = "select a from Account a where a.company_id=?1 and a.category=?2")
	List<Account> findAccountByCategoryName(int company_id, String category_name);

	@Query(value = "select a from Account a where a.company_id=?1 and a.category_id=?2")
	List<Account> findAccountByCategoryId(int company_id, String category_id);

	@Query(value = "select a from Account a where a.company_id=?1 and a.number_account=?2")
	Account findAccountByNumber(int i, String number);
	
}
