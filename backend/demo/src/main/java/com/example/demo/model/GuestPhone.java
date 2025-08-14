package com.example.demo.model;

public class GuestPhone {
    private String username;
    private String phoneNo;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    @Override
    public String toString() {
        return "GuestPhone{" +
                "username='" + username + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                '}';
    }

}
