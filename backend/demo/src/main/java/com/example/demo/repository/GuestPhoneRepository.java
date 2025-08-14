package com.example.demo.repository;

import com.example.demo.model.GuestPhone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class GuestPhoneRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<GuestPhone> guestPhoneRowMapper = new RowMapper<GuestPhone>() {
        @Override
        public GuestPhone mapRow(ResultSet rs, int rowNum) throws SQLException {
            GuestPhone guestPhone = new GuestPhone();
            guestPhone.setUsername(rs.getString("username"));
            guestPhone.setPhoneNo(rs.getString("phone_no"));
            return guestPhone;
        }
    };

    public List<GuestPhone> findPhonesByUsername(String username) {
        String query = "SELECT * FROM GuestPhone WHERE username = ?";
        return jdbcTemplate.query(query, guestPhoneRowMapper, username);
    }

    public boolean checkPhoneExists(String username, String phoneNo) {
        String query = "SELECT COUNT(*) FROM GuestPhone WHERE username = ? AND phone_no = ?";
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, username, phoneNo);
        return count != null && count > 0;
    }

    public void savePhone(String username, String phone) {
        if (checkPhoneExists(username, phone)) {
            throw new RuntimeException("Phone Number Already Exists.");
        }
        String sql = "INSERT INTO GuestPhone (username, phone_no) VALUES (?, ?)";
        jdbcTemplate.update(sql, username, phone);
    }

    public void updatePhone(String username, String oldPhoneNo, String newPhoneNo) {
        if (!checkPhoneExists(username, oldPhoneNo)) {
            throw new RuntimeException("Phone Number: " + oldPhoneNo + " doesn't exist for username: " + username + '.');
        }
        String sql = "UPDATE GuestPhone SET phone_no = ? WHERE username = ? AND phone_no = ?";
        jdbcTemplate.update(sql, newPhoneNo, username, oldPhoneNo);
    }

    public void deletePhone(String username, String phoneNo) {
        if (!checkPhoneExists(username, phoneNo)) {
            throw new RuntimeException("Phone Number: " + phoneNo + " doesn't exist for username: " + username + '.');
        }
        String sql = "DELETE FROM GuestPhone WHERE username = ? AND phone_no = ?";
        jdbcTemplate.update(sql, username, phoneNo);
    }

}
