package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.SaleShippingAccount;

@Service
public interface SaleShippingAccountRepository extends JpaRepository<SaleShippingAccount, Integer>{

}
