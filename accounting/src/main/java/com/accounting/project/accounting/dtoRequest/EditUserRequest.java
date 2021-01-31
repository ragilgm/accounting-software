package com.accounting.project.accounting.dtoRequest;

public class EditUserRequest {
	
	private String name;
	private String username;
	private String password;
	private String email;
	private String role;
	private String active;
	
	public EditUserRequest( String name, String username, String password,String email, String role,String active) {
		this.username = username;
		this.password = password;
		this.role = role;
		this.email = email;
		this.active = active;
	}
	
	public EditUserRequest() {}
	
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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
	

}
