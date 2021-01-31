package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accounting.project.accounting.entity.JournalEntry;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Integer> {
	
}
