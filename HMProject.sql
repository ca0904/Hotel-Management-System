drop database if exists demo;
create database demo;
use demo;

CREATE TABLE Guest (
    username VARCHAR(50) PRIMARY KEY,
    aadhar_no VARCHAR(12),
    city VARCHAR(50),
    country VARCHAR(50),
    first_name VARCHAR(50),
    gender CHAR(10),
    house_no VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(255),
    pin_code VARCHAR(10),
    state VARCHAR(50)
);

CREATE TABLE GuestPhone (
    username VARCHAR(50),
    phone_no VARCHAR(15),
    PRIMARY KEY (username, phone_no),
    FOREIGN KEY (username) REFERENCES Guest(username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE GuestEmail (
    username VARCHAR(50),
    email VARCHAR(255),
    PRIMARY KEY (username, email),
    FOREIGN KEY (username) REFERENCES Guest(username) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Non-editable
CREATE TABLE Department (
    department_name VARCHAR(100) PRIMARY KEY,
    description TEXT
);

-- Non-editable
CREATE TABLE Role (
	role_name VARCHAR(20) PRIMARY KEY
);

INSERT INTO Role
VALUES
('ROLE_SUPER_ADMIN'),
('ROLE_ADMIN');

CREATE TABLE Employee (
    username VARCHAR(50) PRIMARY KEY,
    aadhar_no VARCHAR(12),
    city VARCHAR(50),
    country VARCHAR(50),
    department_name VARCHAR(100),
    first_name VARCHAR(50),
    gender CHAR(10),
    house_no VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(255),
    pin_code VARCHAR(10),
    salary DECIMAL(10, 2),
    state VARCHAR(50),
    FOREIGN KEY (department_name) REFERENCES Department(department_name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE EmployeePhone (
    username VARCHAR(50),
    phone_no VARCHAR(15),
    PRIMARY KEY (username, phone_no),
    FOREIGN KEY (username) REFERENCES Employee(username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE EmployeeEmail (
    username VARCHAR(50),
    email VARCHAR(255),
    PRIMARY KEY (username, email),
    FOREIGN KEY (username) REFERENCES Employee(username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE EmployeeRole (
	username VARCHAR(50),
    role_name VARCHAR(20),
    PRIMARY KEY (username, role_name),
    FOREIGN KEY (username) REFERENCES Employee(username) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_name) REFERENCES Role(role_name)
);

CREATE TABLE Review (
    review_id INT AUTO_INCREMENT,
    username VARCHAR(50),
    description TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    PRIMARY KEY(review_id, username),
    FOREIGN KEY (username) REFERENCES Guest(username)
);

-- Non-editable
CREATE TABLE Room_Type (
    type_name VARCHAR(100) PRIMARY KEY,
    type_description TEXT,
    total_room INT
);

-- Non-editable
CREATE TABLE Room (
    room_no VARCHAR(20) PRIMARY KEY,
    cost DECIMAL(10, 2),
    capacity INT,
    type_name VARCHAR(100),
    FOREIGN KEY (type_name) REFERENCES Room_Type(type_name)
);

CREATE TABLE ServiceProvider (
    username VARCHAR(50),
    room_no VARCHAR(20),
    PRIMARY KEY (username, room_no),
    FOREIGN KEY (username) REFERENCES Employee(username),
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
);

CREATE TABLE Booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATE,
    check_out_date DATE,
    no_of_guests INT,
    amount DECIMAL(10, 2)
);

CREATE TABLE RoomBooked (
    booking_id INT,
    room_no VARCHAR(20),
    PRIMARY KEY (booking_id, room_no),
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id),
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
);

CREATE TABLE Reservation (
    booking_id INT,
    username VARCHAR(50),
    PRIMARY KEY (booking_id, username),
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id),
    FOREIGN KEY (username) REFERENCES Guest(username)
);

CREATE TABLE Bill (
    receipt_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    transaction_id VARCHAR(50),
    payment_date DATE,
    payment_time TIME,
    payment_method VARCHAR(50),
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id)
);



INSERT INTO Department (department_name, description)
VALUES ('AdminDept', 'Superadmin Department');



-- Populate Room_Type so you can add rooms
INSERT INTO Room_Type (type_name, type_description, total_room)
VALUES
  ('Standard', 'Standard room with basic amenities', 10),
  ('Deluxe',   'Deluxe room with extra space',       5),
  ('Suite',    'Premium suite with living area',      2)
AS new_values
ON DUPLICATE KEY UPDATE
  type_description = new_values.type_description,
  total_room       = new_values.total_room;


-- Optional: insert a few sample rooms
INSERT INTO Room (room_no, cost, capacity, type_name) VALUES
  ('101', 100.00, 2, 'Standard'),
  ('102', 100.00, 2, 'Standard'),
  ('201', 150.00, 3, 'Deluxe'),
  ('301', 250.00, 4, 'Suite');

