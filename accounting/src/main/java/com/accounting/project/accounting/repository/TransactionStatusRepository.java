package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.TransactionStatus;

@Service
public interface TransactionStatusRepository extends JpaRepository<TransactionStatus, Integer>{

}
