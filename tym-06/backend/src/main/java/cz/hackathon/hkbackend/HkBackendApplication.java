package cz.hackathon.hkbackend;

import cz.hackathon.hkbackend.schedules.APIScheduler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HkBackendApplication {
	public static void main(String[] args) {
		new APIScheduler().start();
		SpringApplication.run(HkBackendApplication.class, args);
	}

}