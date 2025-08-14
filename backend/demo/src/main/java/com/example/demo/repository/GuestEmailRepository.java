package com.example.demo.repository;

import com.example.demo.model.GuestEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class GuestEmailRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<GuestEmail> guestEmailRowMapper = new RowMapper<GuestEmail>() {
        @Override
        public GuestEmail mapRow(ResultSet rs, int rowNum) throws SQLException {
            GuestEmail guestEmail = new GuestEmail();
            guestEmail.setUsername(rs.getString("username"));
            guestEmail.setEmail(rs.getString("email"));
            return guestEmail;
        }
    };

    public List<GuestEmail> findEmailsByUsername(String username) {
        String query = "SELECT * FROM GuestEmail WHERE username = ?";
        return jdbcTemplate.query(query, guestEmailRowMapper, username);
    }

    public boolean checkEmailExists(String username, String email) {
        String query = "SELECT COUNT(*) FROM GuestEmail WHERE username = ? AND email = ?";
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, username, email);
        return count != null && count > 0;
    }

    public void saveEmail(String username, String email) {
        if (checkEmailExists(username, email)) {
            throw new RuntimeException("Email Already Exists.");
        }
        String sql = "INSERT INTO GuestEmail (username, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, username, email);
    }

    public void updateEmail(String username, String oldEmail, String newEmail) {
        if (!checkEmailExists(username, oldEmail)) {
            throw new RuntimeException("Email: " + oldEmail + " doesn't exist for username: " + username + '.');
        }
        String sql = "UPDATE GuestEmail SET email = ? WHERE username = ? AND email = ?";
        jdbcTemplate.update(sql, newEmail, username, oldEmail);
    }

    public void deleteEmail(String username, String email) {
        if (!checkEmailExists(username, email)) {
            throw new RuntimeException("Email: " + email + " doesn't exist for username: " + username + '.');
        }
        String sql = "DELETE FROM GuestEmail WHERE username = ? AND email = ?";
        jdbcTemplate.update(sql, username, email);
    }

}
