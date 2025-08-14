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
public class SuperAdminInitializer {

    @Bean
    public CommandLineRunner initSuperAdmin(EmployeeService employeeService, EmployeeRepository employeeRepository) {
        return args -> {
            String username = "employee_superadmin1";

            // Check if superadmin exists
            if (employeeRepository.findByUsername(username) != null) {
                System.out.println("ℹ️ Superadmin already exists: " + username);
                return;
            }

            // Create and save Superadmin
            Employee superAdmin = new Employee();
            superAdmin.setUsername(username);
            superAdmin.setPassword("Super@1234"); // Will be encoded in service
            superAdmin.setFirstName("Super");
            superAdmin.setLastName("Admin");
            superAdmin.setAadharNo("123456789012");
            superAdmin.setCity("Delhi");
            superAdmin.setCountry("India");
            superAdmin.setDepartmentName("AdminDept"); // Assumed to already exist
            superAdmin.setGender("M");
            superAdmin.setHouseNo("1A");
            superAdmin.setPinCode("110001");
            superAdmin.setState("Delhi");
            superAdmin.setSalary(100000.00);

            // Assign role
            superAdmin.setRoles(Set.of(new Role("ROLE_SUPER_ADMIN")));

            // Save using service (will hash password + delegate to repository)
            employeeService.save(superAdmin);

            System.out.println("✅ Superadmin created: " + username + " / Super@1234");
        };
    }
}
