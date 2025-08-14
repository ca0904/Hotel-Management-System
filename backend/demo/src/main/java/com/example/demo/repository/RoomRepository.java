package com.example.demo.repository;

import com.example.demo.model.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public class RoomRepository {
    @Autowired private JdbcTemplate jdbc;

    public void addRoom(Room room) {
        jdbc.update("INSERT INTO Room (room_no, cost, capacity, type_name) VALUES (?, ?, ?, ?)",
                room.getRoomNo(), room.getCost(), room.getCapacity(), room.getTypeName());
    }
    public void deleteRoom(String roomNo) {
        jdbc.update("DELETE FROM Room WHERE room_no = ?", roomNo);
    }
    public List<Room> getAllRooms() {
        return jdbc.query("SELECT * FROM Room", (rs, rn) -> {
            Room r = new Room();
            r.setRoomNo(rs.getString("room_no"));
            r.setCost(rs.getDouble("cost"));
            r.setCapacity(rs.getInt("capacity"));
            r.setTypeName(rs.getString("type_name"));
            return r;
        });
    }
    public List<String> findAvailableRooms(Date ci, Date co) {
        String sql = "SELECT room_no FROM Room WHERE room_no NOT IN (" +
                "SELECT rb.room_no FROM RoomBooked rb JOIN Booking b ON rb.booking_id=b.booking_id " +
                "WHERE NOT (b.check_out_date<=? OR b.check_in_date>=?))";
        return jdbc.queryForList(sql, String.class, ci, co);
    }
    public double getRoomCost(String roomNo) {
        return jdbc.queryForObject("SELECT cost FROM Room WHERE room_no=?", Double.class, roomNo);
    }

    public List<Room> findAvailableRoomsDetailed(Date ci, Date co) {
        String sql = """
        SELECT * FROM Room
        WHERE room_no NOT IN (
            SELECT rb.room_no FROM RoomBooked rb JOIN Booking b ON rb.booking_id = b.booking_id
            WHERE NOT (b.check_out_date <= ? OR b.check_in_date >= ?)
        )
        """;

        return jdbc.query(sql, (rs, rn) -> {
            Room r = new Room();
            r.setRoomNo(rs.getString("room_no"));
            r.setCost(rs.getDouble("cost"));
            r.setCapacity(rs.getInt("capacity"));
            r.setTypeName(rs.getString("type_name"));
            return r;
        }, ci, co);
    }

}