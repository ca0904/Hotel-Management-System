package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.EmployeeEmailRepository;
import com.example.demo.repository.EmployeePhoneRepository;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeEmailRepository employeeEmailRepository;

    @Autowired
    private EmployeePhoneRepository employeePhoneRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    public Employee findByUsername(String username) {
        return employeeRepository.findByUsername(username);
    }

    public List<EmployeeEmail> findEmailsByUsername(String username) {
        return employeeEmailRepository.findEmailsByUsername(username);
    }

    public List<EmployeePhone> findPhonesByUsername(String username) {
        return employeePhoneRepository.findPhonesByUsername(username);
    }

    public String save(Employee employee) {
        if (employeeRepository.findByUsername(employee.getUsername()) != null) {
            throw new RuntimeException("Username already exists.");
        }
        employee.setPassword(encoder.encode(employee.getPassword()));
        employeeRepository.save(employee);
        return "Added successfully.";
    }

    public String saveEmail(String username, String email) {
        try {
            employeeEmailRepository.saveEmail(username, email);
            return "Email added.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String savePhone(String username, String phone) {
        try {
            employeePhoneRepository.savePhone(username, phone);
            return "Phone number added.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String update(Employee employee) {
        try {
            employeeRepository.update(employee);
            return "Updated successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String updateEmail(String username, String oldEmail, String newEmail) {
        try {
            employeeEmailRepository.updateEmail(username, oldEmail, newEmail);
            return "Updated successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String updatePhone(String username, String oldPhoneNo, String newPhoneNo) {
        try {
            employeePhoneRepository.updatePhone(username, oldPhoneNo, newPhoneNo);
            return "Updated successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String delete(String username) {
        try {
            employeeRepository.delete(username);
            return "Deleted successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String deleteEmail(String username, String email) {
        try {
            employeeEmailRepository.deleteEmail(username, email);
            return "Deleted email successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String deletePhone(String username, String phoneNo) {
        try {
            employeePhoneRepository.deletePhone(username, phoneNo);
            return "Deleted phone number successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String verify(LoginRequest login) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
        if (authentication.isAuthenticated()) {
            Employee employee = findByUsername(login.getUsername());
            Set<Role> roles = employee.getAuthorities();
            return jwtService.generateToken(employee.getUsername(), roles);
        }
        return "Invalid Credentials.";
    }



}
