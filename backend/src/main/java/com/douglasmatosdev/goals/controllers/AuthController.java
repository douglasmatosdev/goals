package com.douglasmatosdev.goals.controllers;

import com.douglasmatosdev.goals.model.Permission;
import com.douglasmatosdev.goals.model.User;
import com.douglasmatosdev.goals.repositories.UserRepository;
import com.douglasmatosdev.goals.security.PasswordEnconder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.douglasmatosdev.goals.data.vo.v1.security.AccountCredentialsVO;
import com.douglasmatosdev.goals.services.AuthServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.ArrayList;
import java.util.List;

@Tag(name = "Authentication Endpoint")
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	AuthServices authServices;

	@Autowired
	private UserRepository repository;

	@SuppressWarnings("rawtypes")
	@Operation(summary = "Authenticates a user and returns a token")
	@PostMapping(value = "/signin", produces = "application/json")
	public ResponseEntity signin(@RequestBody AccountCredentialsVO data) {
		if (checkIfParamsIsNotNull(data))
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		var token = authServices.signin(data);
		if (token == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		return token;
	}

	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid User data){
		if(this.repository.findByUsername(data.getUsername()) != null) return ResponseEntity.badRequest().build();

		String encryptedPassword = PasswordEnconder.encode(data.getPassword());
		data.setPassword(encryptedPassword);

		this.repository.save(data);

		return ResponseEntity.status(HttpStatus.OK).body(data);
	}

	@DeleteMapping("/delete")
	public ResponseEntity delete(@RequestBody @Valid User data){
		if(this.repository.findByUsername(data.getUsername()) == null) return ResponseEntity.badRequest().build();

		this.repository.delete(data);

		return ResponseEntity.status(HttpStatus.OK).body(data);
	}

	@SuppressWarnings("rawtypes")
	@Operation(summary = "Refresh token for authenticated user and returns a token")
	@PutMapping(value = "/refresh/{username}")
	public ResponseEntity refreshToken(@PathVariable("username") String username,
									   @RequestHeader("Authorization") String refreshToken) {
		if (checkIfParamsIsNotNull(username, refreshToken))
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		var token = authServices.refreshToken(username, refreshToken);
		if (token == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		return token;
	}

	private boolean checkIfParamsIsNotNull(String username, String refreshToken) {
		return refreshToken == null || refreshToken.isBlank() ||
				username == null || username.isBlank();
	}

	private boolean checkIfParamsIsNotNull(AccountCredentialsVO data) {
		return data == null || data.getUsername() == null || data.getUsername().isBlank()
				|| data.getPassword() == null || data.getPassword().isBlank();
	}
}
