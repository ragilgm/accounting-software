package com.accounting.project.accounting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.User;

@Service
public interface UserRepository extends JpaRepository<User, Integer>{

	
	@Query(value = "select u from User u where u.username=?1 and u.password=?2")
	User loginUser(String username, String password);

	
	@Query(value = "select u from User u where u.id = ?1")
	User findUserById(int id);


	@Query(value = "select u from User u where u.username=?1")
	User findUserByUsername(String username);

}
