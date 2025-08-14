package com.example.demo.controller;

import com.example.demo.model.Employee;
import com.example.demo.model.LoginRequest;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Employee employee) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.save(employee));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @PostMapping("/all/login")
    public String login(@RequestBody LoginRequest login) {
        return employeeService.verify(login);
    }

    @GetMapping("/greet")
    public String greet() {
        return "Hello Employee";
    }

    @GetMapping("/greetAll")
    public String greetAll() {
        return "Hello Super Admin";
    }


    @GetMapping("/all/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        if (employees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/employee/{username}")
    public ResponseEntity<?> getEmployeeByUsername(@PathVariable String username) {
        Employee employee = employeeService.findByUsername(username);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employee/{username}")
    public ResponseEntity<?> updateEmployee(@PathVariable String username, @RequestBody Employee employee) {
        employee.setUsername(username);
        try {
            employeeService.update(employee);
            return ResponseEntity.ok("Employee updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/employee/{username}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String username) {
        try {
            employeeService.delete(username);
            return ResponseEntity.ok("Employee deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
