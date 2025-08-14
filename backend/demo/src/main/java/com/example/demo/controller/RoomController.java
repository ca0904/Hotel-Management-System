package com.example.demo.controller;

import com.example.demo.model.Room;
import com.example.demo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/room")
public class RoomController {
    @Autowired private RoomService svc;

    @PostMapping("/add") public ResponseEntity<String> add(@RequestBody Room r){svc.addRoom(r);return ResponseEntity.ok("Added");}
    @DeleteMapping("/{rn}") public ResponseEntity<String> del(@PathVariable("rn")String rn){svc.deleteRoom(rn);return ResponseEntity.ok("Deleted");}
    @GetMapping("/all") public List<Room> all(){return svc.getAllRooms();}
    @GetMapping("/available") public List<String> avail(@RequestParam Date ci,@RequestParam Date co){return svc.getAvailableRooms(ci,co);}
}