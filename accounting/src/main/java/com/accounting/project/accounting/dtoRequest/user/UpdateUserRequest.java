package com.accounting.project.accounting.dtoRequest.user;

public class UpdateUserRequest {

	private String active;
	private String email;
	private String name;
	private String password;
	private String role;
	private String username;
	
	public UpdateUserRequest(String active, String email, String name, String password, String role, String username) {
		super();
		this.active = active;
		this.email = email;
		this.name = name;
		this.password = password;
		this.role = role;
		this.username = username;
	}

	public UpdateUserRequest() {
		// TODO Auto-generated constructor stub
	}
	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}



}
