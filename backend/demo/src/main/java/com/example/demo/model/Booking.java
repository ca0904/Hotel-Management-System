package com.example.demo.model;

import java.sql.Date;
import java.util.List;

public class Booking {
    private int bookingId;
    private Date checkInDate;
    private Date checkOutDate;
    private int noOfGuests;
    private double amount;
    private String username; // guest username

    // Getters and Setters
    public int getBookingId() { return bookingId; }
    public void setBookingId(int bookingId) { this.bookingId = bookingId; }
    public Date getCheckInDate() { return checkInDate; }
    public void setCheckInDate(Date checkInDate) { this.checkInDate = checkInDate; }
    public Date getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(Date checkOutDate) { this.checkOutDate = checkOutDate; }
    public int getNoOfGuests() { return noOfGuests; }
    public void setNoOfGuests(int noOfGuests) { this.noOfGuests = noOfGuests; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
