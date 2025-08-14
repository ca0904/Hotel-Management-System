package com.example.demo.model;

import java.sql.Date;
import java.util.List;

public class BookingView {
    private int bookingId;
    private String username;
    private Date checkInDate;
    private Date checkOutDate;
    private List<String> roomNos;
    private double amount;

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Date checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public List<String> getRoomNos() {
        return roomNos;
    }

    public void setRoomNos(List<String> roomNos) {
        this.roomNos = roomNos;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}