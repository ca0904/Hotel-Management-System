package com.example.demo.repository;

import com.example.demo.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class EmployeeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private EmployeeEmailRepository employeeEmailRepository;

    @Autowired
    private EmployeePhoneRepository employeePhoneRepository;

    private static final RowMapper<Employee> employeeRowMapper = new RowMapper<Employee>() {
        @Override
        public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
            Employee employee = new Employee();
            employee.setUsername(rs.getString("username"));
            employee.setAadharNo(rs.getString("aadhar_no"));
            employee.setCity(rs.getString("city"));
            employee.setCountry(rs.getString("country"));
            employee.setDepartmentName(rs.getString("department_name"));
            employee.setFirstName(rs.getString("first_name"));
            employee.setGender(rs.getString("gender"));
            employee.setHouseNo(rs.getString("house_no"));
            employee.setLastName(rs.getString("last_name"));
            employee.setPassword(rs.getString("password"));
            employee.setPinCode(rs.getString("pin_code"));
            employee.setSalary(rs.getDouble("salary"));
            employee.setState(rs.getString("state"));
            return employee;
        }
    };

    private static final RowMapper<EmployeeRole> employeeRoleRowMapper = new RowMapper<EmployeeRole>() {
        @Override
        public EmployeeRole mapRow(ResultSet rs, int rowNum) throws SQLException {
            EmployeeRole employeeRole = new EmployeeRole();
            employeeRole.setUsername(rs.getString("username"));
            employeeRole.setRoleName(rs.getString("role_name"));
            return employeeRole;
        }
    };

    public List<Employee> getAllEmployees() {
        String sql = "SELECT * FROM Employee";
        List<Employee> employees = jdbcTemplate.query(sql, employeeRowMapper);
        for (Employee employee : employees) {
            List<EmployeeEmail> emails = employeeEmailRepository.findEmailsByUsername(employee.getUsername());
            employee.setEmail(emails.stream().map(EmployeeEmail::getEmail).collect(Collectors.toList()));

            List<EmployeePhone> phones = employeePhoneRepository.findPhonesByUsername(employee.getUsername());
            employee.setPhoneNo(phones.stream().map(EmployeePhone::getPhoneNo).collect(Collectors.toList()));

            List<EmployeeRole> roles = findRoleByUsername(employee.getUsername());
            employee.setRoles(roles.stream().map(employeeRole -> new Role(employeeRole.getRoleName())).collect(Collectors.toSet()));
        }
        return employees;
    }

    public Employee findByUsername(String username) {
        try {
            String sql = "SELECT * FROM Employee WHERE username = ?";
            Employee employee = jdbcTemplate.queryForObject(sql, employeeRowMapper, username);

            List<EmployeeEmail> emails = employeeEmailRepository.findEmailsByUsername(username);
            employee.setEmail(emails.stream().map(EmployeeEmail::getEmail).collect(Collectors.toList()));

            List<EmployeePhone> phones = employeePhoneRepository.findPhonesByUsername(username);
            employee.setPhoneNo(phones.stream().map(EmployeePhone::getPhoneNo).collect(Collectors.toList()));

            List<EmployeeRole> roles = findRoleByUsername(username);
            employee.setRoles(roles.stream().map(employeeRole -> new Role(employeeRole.getRoleName())).collect(Collectors.toSet()));

            return employee;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<EmployeeRole> findRoleByUsername(String username) {
        String sql = "SELECT * FROM EmployeeRole WHERE username = ?";
        return jdbcTemplate.query(sql, employeeRoleRowMapper, username);
    }

    public void save(Employee employee) {
        String sql = "INSERT INTO Employee (username, aadhar_no, city, country, department_name, first_name, gender, house_no, last_name, password, pin_code, salary, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, employee.getUsername(), employee.getAadharNo(), employee.getCity(), employee.getCountry(), employee.getDepartmentName(), employee.getFirstName(), employee.getGender(), employee.getHouseNo(), employee.getLastName(), employee.getPassword(), employee.getPinCode(), employee.getSalary(), employee.getState());

        if (employee.getEmail() != null) {
            String emailSql = "INSERT INTO EmployeeEmail (username, email) VALUES (?, ?)";
            for (String email : employee.getEmail()) {
                jdbcTemplate.update(emailSql, employee.getUsername(), email);
            }
        }

        if (employee.getPhoneNo() != null) {
            String phoneSql = "INSERT INTO EmployeePhone (username, phone_no) VALUES (?, ?)";
            for (String phone : employee.getPhoneNo()) {
                jdbcTemplate.update(phoneSql, employee.getUsername(), phone);
            }
        }

        if (employee.getRoles() != null) {
            String rolesSql = "INSERT INTO EmployeeRole (username, role_name) VALUES (?, ?)";
            for (Role role : employee.getRoles()) {
                jdbcTemplate.update(rolesSql, employee.getUsername(), role.getRoleName());
            }
        }
    }

    public void update(Employee employee) {
        if (findByUsername(employee.getUsername()) == null) {
            throw new RuntimeException("User not found.");
        }
        String sql = "UPDATE Employee SET aadhar_no = ?, city = ?, country = ?, department_name = ?, first_name = ?, gender = ?, house_no = ?, last_name = ?, password = ?, pin_code = ?, salary = ?, state = ? WHERE username = ?";
        jdbcTemplate.update(sql, employee.getAadharNo(), employee.getCity(), employee.getCountry(), employee.getDepartmentName(), employee.getFirstName(), employee.getGender(), employee.getHouseNo(), employee.getLastName(), employee.getPassword(), employee.getPinCode(), employee.getSalary(), employee.getState(), employee.getUsername());
    }

    public void delete(String username) {
        if (findByUsername(username) == null) {
            throw new RuntimeException("Employee doesn't exist.");
        }
        String sql = "DELETE FROM Employee WHERE username = ?";
        jdbcTemplate.update(sql, username);
    }

}
