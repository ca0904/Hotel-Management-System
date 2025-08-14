package com.example.demo.controller;

import com.example.demo.model.Booking;
import com.example.demo.model.BookingView;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    @Autowired private BookingService svc;

    @PostMapping("/guest/request")
    public ResponseEntity<String> guestBook(@RequestBody Booking bk) {
        String res = svc.makeBooking(bk);
        return res.startsWith("Booking successful") ? ResponseEntity.ok(res) : ResponseEntity.status(409).body(res);
    }

    @GetMapping("/admin/all")
    public List<BookingView> adminView() {
        return svc.getAllBookings();
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> cancelBooking(
            @PathVariable int bookingId) {

        boolean ok = svc.cancelBooking(bookingId);
        if (ok) {
            return ResponseEntity.ok("Booking " + bookingId + " cancelled.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Booking not found: " + bookingId);
        }
    }
}