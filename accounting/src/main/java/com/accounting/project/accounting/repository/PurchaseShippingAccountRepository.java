package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.PurchaseShippingAccount;

@Service
public interface PurchaseShippingAccountRepository extends JpaRepository<PurchaseShippingAccount, Integer>{

}
