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
public class GuestRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private GuestEmailRepository guestEmailRepository;

    @Autowired
    private GuestPhoneRepository guestPhoneRepository;

    private static final RowMapper<Guest> guestRowMapper = new RowMapper<Guest>() {
        @Override
        public Guest mapRow(ResultSet rs, int rowNum) throws SQLException {
            Guest guest = new Guest();
            guest.setUsername(rs.getString("username"));
            guest.setAadharNo(rs.getString("aadhar_no"));
            guest.setCity(rs.getString("city"));
            guest.setCountry(rs.getString("country"));
            guest.setFirstName(rs.getString("first_name"));
            guest.setGender(rs.getString("gender"));
            guest.setHouseNo(rs.getString("house_no"));
            guest.setLastName(rs.getString("last_name"));
            guest.setPassword(rs.getString("password"));
            guest.setPinCode(rs.getString("pin_code"));
            guest.setState(rs.getString("state"));
            return guest;
        }
    };

    public List<Guest> getAllGuests() {
        String query = "SELECT * FROM Guest";
        List<Guest> guests = jdbcTemplate.query(query, guestRowMapper);
        for (Guest guest : guests) {
            List<GuestEmail> emails = guestEmailRepository.findEmailsByUsername(guest.getUsername());
            guest.setEmail(emails.stream().map(GuestEmail::getEmail).collect(Collectors.toList()));

            List<GuestPhone> phones = guestPhoneRepository.findPhonesByUsername(guest.getUsername());
            guest.setPhoneNo(phones.stream().map(GuestPhone::getPhoneNo).collect(Collectors.toList()));
        }
        return guests;
    }

    public Guest findByUsername(String username) {
        try {
            String query = "SELECT * FROM Guest WHERE username = ?";
            Guest guest = jdbcTemplate.queryForObject(query, guestRowMapper, username);

            List<GuestEmail> emails = guestEmailRepository.findEmailsByUsername(username);
            guest.setEmail(emails.stream().map(GuestEmail::getEmail).collect(Collectors.toList()));

            List<GuestPhone> phones = guestPhoneRepository.findPhonesByUsername(username);
            guest.setPhoneNo(phones.stream().map(GuestPhone::getPhoneNo).collect(Collectors.toList()));

            return guest;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void save(Guest guest) {
        String sql = "INSERT INTO Guest (username, aadhar_no, city, country, first_name, gender, house_no, last_name, password, pin_code, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, guest.getUsername(), guest.getAadharNo(), guest.getCity(), guest.getCountry(), guest.getFirstName(), guest.getGender(), guest.getHouseNo(), guest.getLastName(), guest.getPassword(), guest.getPinCode(), guest.getState());

        if (guest.getEmail() != null) {
            String emailSql = "INSERT INTO GuestEmail (username, email) VALUES (?, ?)";
            for (String email : guest.getEmail()) {
                jdbcTemplate.update(emailSql, guest.getUsername(), email);
            }
        }

        if (guest.getPhoneNo() != null) {
            String phoneSql = "INSERT INTO GuestPhone (username, phone_no) VALUES (?, ?)";
            for (String phone : guest.getPhoneNo()) {
                jdbcTemplate.update(phoneSql, guest.getUsername(), phone);
            }
        }
    }

    public void update(Guest guest) {
        if (findByUsername(guest.getUsername()) == null) {
            throw new RuntimeException("User not found.");
        }
        String query = "UPDATE Guest SET aadhar_no = ?, city = ?, country = ?, first_name = ?, gender = ?, house_no = ?, last_name = ?, password = ?, pin_code = ?, state = ? WHERE username = ?";
        jdbcTemplate.update(query, guest.getAadharNo(), guest.getCity(), guest.getCountry(), guest.getFirstName(), guest.getGender(), guest.getHouseNo(), guest.getLastName(), guest.getPassword(), guest.getPinCode(), guest.getState(), guest.getUsername());
    }

    public void updateUsername(String oldUsername, String newUsername) {
        if (findByUsername(newUsername) != null) {
            throw new RuntimeException("Username: " + oldUsername + " already taken.");
        }
        if (findByUsername(oldUsername) == null) {
            throw new RuntimeException("User not found.");
        }
        String sql = "UPDATE Employee SET username = ? WHERE username = ?";
        jdbcTemplate.update(sql, newUsername, oldUsername);
    }

}
