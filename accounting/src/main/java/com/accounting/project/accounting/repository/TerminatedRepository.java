package com.accounting.project.accounting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.Payment_Termin;


@Service
public interface TerminatedRepository extends JpaRepository<Payment_Termin, Integer>{
	
	@Query(value = "select t from Payment_Termin t where t.company_id=?1")
	List<Payment_Termin> findAllTermin(int company_id);

}
