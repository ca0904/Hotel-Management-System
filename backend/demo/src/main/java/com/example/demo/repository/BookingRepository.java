package com.example.demo.repository;

import com.example.demo.model.Booking;
import com.example.demo.model.BookingView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Date;
import java.util.List;

@Repository
public class BookingRepository {
    @Autowired private JdbcTemplate jdbc;

    public int createBooking(Booking bk) {
        String sql = "INSERT INTO Booking (check_in_date,check_out_date,no_of_guests,amount) VALUES(?,?,?,?)";
        KeyHolder kh = new GeneratedKeyHolder();
        jdbc.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setDate(1, bk.getCheckInDate()); ps.setDate(2, bk.getCheckOutDate());
            ps.setInt(3, bk.getNoOfGuests()); ps.setDouble(4, bk.getAmount()); return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public boolean existsById(int id) {
        Integer count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM Booking WHERE booking_id = ?",
                Integer.class, id);
        return count != null && count > 0;
    }

    public void deleteRoomBookedByBookingId(int bookingId) {
        jdbc.update("DELETE FROM RoomBooked WHERE booking_id = ?", bookingId);
    }

    public void deleteReservationByBookingId(int bookingId) {
        jdbc.update("DELETE FROM Reservation WHERE booking_id = ?", bookingId);
    }

    public void deleteBookingById(int bookingId) {
        jdbc.update("DELETE FROM Booking WHERE booking_id = ?", bookingId);
    }
    public void saveRoomBooked(int id, String rn) {
        jdbc.update("INSERT INTO RoomBooked (booking_id,room_no) VALUES (?,?)", id, rn);
    }
    public void saveReservation(int id, String user) {
        jdbc.update("INSERT INTO Reservation (booking_id,username) VALUES (?,?)", id, user);
    }
    public List<BookingView> findAllBookings() {
        String sql = """
        SELECT 
          b.booking_id,
          r.username,
          b.check_in_date,
          b.check_out_date,
          GROUP_CONCAT(rb.room_no) AS rooms,
          b.amount
        FROM Booking b
        JOIN Reservation r ON b.booking_id = r.booking_id
        LEFT JOIN RoomBooked rb ON b.booking_id = rb.booking_id
        GROUP BY b.booking_id, r.username, b.check_in_date, b.check_out_date, b.amount
        """;

        return jdbc.query(sql, (rs, rowNum) -> {
            BookingView bv = new BookingView();
            bv.setBookingId(rs.getInt("booking_id"));
            bv.setUsername(rs.getString("username"));
            bv.setCheckInDate(rs.getDate("check_in_date"));
            bv.setCheckOutDate(rs.getDate("check_out_date"));
            String rooms = rs.getString("rooms");         // e.g. "101,102"
            bv.setRoomNos(rooms == null
                    ? List.of()
                    : List.of(rooms.split(",")));
            bv.setAmount(rs.getDouble("amount"));
            return bv;
        });
    }

}