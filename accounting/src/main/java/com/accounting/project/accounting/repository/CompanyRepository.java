package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accounting.project.accounting.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer>{

}
