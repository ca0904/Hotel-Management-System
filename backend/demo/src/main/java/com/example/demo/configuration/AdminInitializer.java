package com.example.demo.configuration;

import com.example.demo.model.Employee;
import com.example.demo.model.Role;
import com.example.demo.service.EmployeeService;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class AdminInitializer {

    @Bean
    public CommandLineRunner initAdmin(EmployeeService employeeService, EmployeeRepository employeeRepository) {
        return args -> {
            String username = "employee_admin1";

            // Check if admin already exists
            if (employeeRepository.findByUsername(username) != null) {
                System.out.println("ℹ️ Admin already exists: " + username);
                return;
            }

            // Create and save Admin
            Employee admin = new Employee();
            admin.setUsername(username);
            admin.setPassword("Admin@1234"); // Will be encoded in service
            admin.setFirstName("Site");
            admin.setLastName("Admin");
            admin.setAadharNo("234567890123");
            admin.setCity("Mumbai");
            admin.setCountry("India");
            admin.setDepartmentName("AdminDept"); // Make sure this department exists in DB
            admin.setGender("F");
            admin.setHouseNo("7B");
            admin.setPinCode("400001");
            admin.setState("Maharashtra");
            admin.setSalary(70000.00);

            // Assign role
            admin.setRoles(Set.of(new Role("ROLE_ADMIN")));

            // Save using service (hash password and insert into DB)
            employeeService.save(admin);

            System.out.println("✅ Admin created: " + username + " / Admin@1234");
        };
    }
}
