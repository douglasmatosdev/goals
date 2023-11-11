


















package com.douglasmatosdev.goals;

import com.douglasmatosdev.goals.security.PasswordEnconder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GoalsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GoalsApplication.class, args);
		String result1 = PasswordEnconder.encode("admin123");
		String result2 = PasswordEnconder.encode("admin234");
		System.out.println("My hash result1 " + result1);
		System.out.println("My hash result2 " + result2);
	}

}
