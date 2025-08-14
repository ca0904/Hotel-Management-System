package com.example.demo.repository;

import com.example.demo.model.EmployeeEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class EmployeeEmailRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<EmployeeEmail> employeeEmailRowMapper = new RowMapper<EmployeeEmail>() {
        @Override
        public EmployeeEmail mapRow(ResultSet rs, int rowNum) throws SQLException {
            EmployeeEmail employeeEmail = new EmployeeEmail();
            employeeEmail.setUsername(rs.getString("username"));
            employeeEmail.setEmail(rs.getString("email"));
            return employeeEmail;
        }
    };

    public List<EmployeeEmail> findEmailsByUsername(String username) {
        String sql = "SELECT * FROM EmployeeEmail WHERE username = ?";
        return jdbcTemplate.query(sql, employeeEmailRowMapper, username);
    }

    public boolean checkEmailExists(String username, String email) {
        String sql = "SELECT COUNT(*) FROM EmployeeEmail WHERE username = ? AND email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, username, email);
        return count != null && count > 0;
    }

    public void saveEmail(String username, String email) {
        if (checkEmailExists(username, email)) {
            throw new RuntimeException("Email Already Exists.");
        }
        String sql = "INSERT INTO EmployeeEmail (username, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, username, email);
    }

    public void updateEmail(String username, String oldEmail, String newEmail) {
        if (!checkEmailExists(username, oldEmail)) {
            throw new RuntimeException("Email: " + oldEmail + " doesn't exist for username: " + username + '.');
        }
        String sql = "UPDATE EmployeeEmail SET email = ? WHERE username = ? AND email = ?";
        jdbcTemplate.update(sql, newEmail, username, oldEmail);
    }

    public void deleteEmail(String username, String email) {
        if (!checkEmailExists(username, email)) {
            throw new RuntimeException("Email: " + email + " doesn't exist for username: " + username + '.');
        }
        String sql = "DELETE FROM EmployeeEmail WHERE username = ? AND email = ?";
        jdbcTemplate.update(sql, username, email);
    }

}
