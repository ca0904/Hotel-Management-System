package com.example.demo.model;

import java.util.List;
import java.util.Set;

public class Guest {
    private String username;
    private String aadharNo;
    private String city;
    private String country;
    private String firstName;
    private String gender;
    private String houseNo;
    private String lastName;
    private String password;
    private String pinCode;
    private String state;
    private List<String> email;
    private List<String> phoneNo;
    private final Set<Role> role = Set.of(new Role("ROLE_USER"));

    public Set<Role> getAuthorities() {
        return role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAadharNo() {
        return aadharNo;
    }

    public void setAadharNo(String aadharNo) {
        this.aadharNo = aadharNo;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<String> getEmail() {
        return email;
    }

    public void setEmail(List<String> email) {
        this.email = email;
    }

    public List<String> getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(List<String> phoneNo) {
        this.phoneNo = phoneNo;
    }

    @Override
    public String toString() {
        return "Guest{" +
                "username='" + username + '\'' +
                ", aadharNo='" + aadharNo + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", firstName='" + firstName + '\'' +
                ", gender='" + gender + '\'' +
                ", houseNo='" + houseNo + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", pinCode='" + pinCode + '\'' +
                ", state='" + state + '\'' +
                ", email=" + email +
                ", phoneNo=" + phoneNo +
                '}';
    }

}
