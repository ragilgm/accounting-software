package com.accounting.project.accounting.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accounting.project.accounting.entity.User;
import com.accounting.project.accounting.repository.UserRepository;

@Service
public class UserRepositoryImpl {

	@Autowired
	private UserRepository userRepository;
	
	
	public User addUser(User user) {
		User checkUsername = findUserByUsername(user.getUsername());
		if(checkUsername==null) {
		return userRepository.save(user);
		}else {
			return null;
		}
	}
	
	public User findById(int id) {
		return userRepository.findUserById(id);
	}
	
	public User editUser(int id, User user) {
		
		User userEdit = userRepository.getOne(id);
	System.out.println(userEdit.getId());
		userEdit.setName(user.getName());
		userEdit.setUsername(user.getUsername());
		userEdit.setPassword(user.getPassword());
		userEdit.setEmail(user.getEmail());
		userEdit.setRole(user.getRole());
		userEdit.setActive(user.getActive());
		return userRepository.save(userEdit);
	}
	
	
	public void deleteUser(int id) {
		userRepository.deleteById(id);
	}
	
	public List<User> listUser(){
		return userRepository.findAll();
	}
	
	public User loginUser(String username, String password) {
		User user = userRepository.loginUser(username, password);
		System.out.println(user);
		
		if(user==null) {
			return null;
		}
		
		if(user.getActive().equals("active")) {
			return user;
		}else {
			return null;
		}
		
	}
	
	public User findUserByUsername(String username) {
		return userRepository.findUserByUsername(username);
	}
	
}
