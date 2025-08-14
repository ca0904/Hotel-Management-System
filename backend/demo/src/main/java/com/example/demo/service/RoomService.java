package com.example.demo.service;

import com.example.demo.model.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.util.List;

@Service
public class RoomService {
    @Autowired private RoomRepository repo;
    public void addRoom(Room r){repo.addRoom(r);}    public void deleteRoom(String rn){repo.deleteRoom(rn);}
    public List<Room> getAllRooms(){return repo.getAllRooms();}
    public List<String> getAvailableRooms(Date ci, Date co){return repo.findAvailableRooms(ci,co);}
}