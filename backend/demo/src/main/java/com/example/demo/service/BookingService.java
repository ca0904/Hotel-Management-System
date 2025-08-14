package com.example.demo.service;

import com.example.demo.model.Booking;
import com.example.demo.model.BookingView;
import com.example.demo.model.Room;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {
    @Autowired private RoomRepository roomRepo;
    @Autowired private BookingRepository bookRepo;

    @Transactional
    public String makeBooking(Booking bk) {
        LocalDate today = LocalDate.now();
        LocalDate ci    = bk.getCheckInDate().toLocalDate();
        LocalDate co    = bk.getCheckOutDate().toLocalDate();

        // 1) enforce check‑in not in the past
        if (ci.isBefore(today)) {
            return "Booking failed: check‑in date cannot be in the past.";
        }
        // 2) enforce check‑out on or after check‑in
        if (co.isBefore(ci)) {
            return "Booking failed: check‑out date must be on or after check‑in date.";
        }

        long days = ChronoUnit.DAYS.between(
                bk.getCheckInDate().toLocalDate(),
                bk.getCheckOutDate().toLocalDate()
        );
        long nights = days > 0 ? days : 1;

        List<Room> availableRooms = roomRepo.findAvailableRoomsDetailed(bk.getCheckInDate(), bk.getCheckOutDate());

        // Greedy allocation: fill rooms until guest count is satisfied
        List<String> assignedRooms = new ArrayList<>();
        int remainingGuests = bk.getNoOfGuests();

        availableRooms.sort((a, b) -> b.getCapacity() - a.getCapacity()); // prioritize bigger rooms

        for (Room room : availableRooms) {
            if (remainingGuests <= 0) break;
            assignedRooms.add(room.getRoomNo());
            remainingGuests -= room.getCapacity();
        }

        if (remainingGuests > 0) {
            return "Booking failed: not enough available rooms for " + bk.getNoOfGuests() + " guests.";
        }

        // Calculate total cost based on nights and assigned rooms
        double totalCost = assignedRooms.stream().mapToDouble(roomRepo::getRoomCost).sum() * nights;

        bk.setAmount(totalCost);

        int bookingId = bookRepo.createBooking(bk);
        assignedRooms.forEach(roomNo -> bookRepo.saveRoomBooked(bookingId, roomNo));
        bookRepo.saveReservation(bookingId, bk.getUsername());

        return "Booking successful. ID: " + bookingId;
    }
    public List<BookingView> getAllBookings(){return bookRepo.findAllBookings();}

    @Transactional
    public boolean cancelBooking(int bookingId) {
        if (!bookRepo.existsById(bookingId)) {
            return false;
        }
        // delete children first
        bookRepo.deleteRoomBookedByBookingId(bookingId);
        bookRepo.deleteReservationByBookingId(bookingId);
        // then delete booking
        bookRepo.deleteBookingById(bookingId);
        return true;
    }
}