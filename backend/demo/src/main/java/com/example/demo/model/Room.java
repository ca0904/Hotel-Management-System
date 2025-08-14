package com.example.demo.model;

public class Room {
    private String roomNo;
    private double cost;
    private int capacity;
    private String typeName;

    // Getters and Setters
    public String getRoomNo() { return roomNo; }
    public void setRoomNo(String roomNo) { this.roomNo = roomNo; }
    public double getCost() { return cost; }
    public void setCost(double cost) { this.cost = cost; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public String getTypeName() { return typeName; }
    public void setTypeName(String typeName) { this.typeName = typeName; }
}