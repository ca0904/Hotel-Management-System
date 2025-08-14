package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.GuestEmailRepository;
import com.example.demo.repository.GuestPhoneRepository;
import com.example.demo.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class GuestService {

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private GuestEmailRepository guestEmailRepository;

    @Autowired
    private GuestPhoneRepository guestPhoneRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public List<Guest> getAllGuests() {
        return guestRepository.getAllGuests();
    }

    public Guest findByUsername(String username) {
        return guestRepository.findByUsername(username);
    }

    public List<GuestEmail> findEmailsByUsername(String username) {
        return guestEmailRepository.findEmailsByUsername(username);
    }

    public List<GuestPhone> findPhonesByUsername(String username) {
        return guestPhoneRepository.findPhonesByUsername(username);
    }

    public String save(Guest guest) {
        if (guestRepository.findByUsername(guest.getUsername()) != null) {
            throw new RuntimeException("Username already exists.");
        }
        guest.setPassword(encoder.encode(guest.getPassword()));
        guestRepository.save(guest);
        return "Added successfully.";
    }

    public String saveEmail(String username, String email) {
        try {
            guestEmailRepository.saveEmail(username, email);
            return "Email added.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String savePhone(String username, String phone) {
        try {
            guestPhoneRepository.savePhone(username, phone);
            return "Phone number added.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String update(Guest guest) {
        try {
            guestRepository.update(guest);
            return "Updated successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String updateUsername(String oldUsername, String newUsername) {
        try {
            guestRepository.updateUsername(oldUsername, newUsername);
            return "Updated successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String updateEmail(String username, String oldEmail, String newEmail) {
        try {
            guestEmailRepository.updateEmail(username, oldEmail, newEmail);
            return "Updated successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String updatePhone(String username, String oldPhoneNo, String newPhoneNo) {
        try {
            guestPhoneRepository.updatePhone(username, oldPhoneNo, newPhoneNo);
            return "Updated successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String deleteEmail(String username, String email) {
        try {
            guestEmailRepository.deleteEmail(username, email);
            return "Deleted email successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String deletePhone(String username, String phoneNo) {
        try {
            guestPhoneRepository.deletePhone(username, phoneNo);
            return "Deleted phone number successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public String verify(LoginRequest login) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
        if (authentication.isAuthenticated()) {
            Guest guest = findByUsername(login.getUsername());
            Set<Role> roles = guest.getAuthorities();
            return jwtService.generateToken(guest.getUsername(), roles);
        }
        return "Invalid Credentials.";
    }

}
