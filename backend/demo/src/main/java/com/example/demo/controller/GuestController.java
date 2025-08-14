package com.example.demo.controller;

import com.example.demo.model.Guest;
import com.example.demo.model.LoginRequest;
import com.example.demo.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GuestController {

    @Autowired
    private GuestService guestService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Guest guest) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(guestService.save(guest));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest login) {
        return guestService.verify(login);
    }

    @GetMapping("/user/greet")
    public String greet() {
        return "Hello Guest";
    }

}
