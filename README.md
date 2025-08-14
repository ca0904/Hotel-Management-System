# Hotel Management System

A comprehensive full-stack web application for hotel management operations built with Spring Boot backend and React frontend.

## 🏨 Project Overview

This Hotel Management System provides a complete solution for managing hotel operations including guest registration, room booking, employee management, and administrative functions. The system features role-based access control with separate interfaces for guests and administrators.

## 🚀 Features

### Guest Features

- **User Registration & Authentication**: Secure guest registration with JWT token-based authentication
- **Room Booking**: Interactive booking system with date selection and guest count
- **Booking Confirmation**: Real-time booking confirmation and status updates
- **Profile Management**: Guest profile and contact information management

### Administrative Features

- **Employee Management**: Add, edit, delete, and manage hotel staff
- **Room Management**: Complete CRUD operations for hotel rooms and room types
- **Booking Management**: View all bookings and cancel reservations
- **Department Management**: Organize staff by departments
- **Secure Admin Access**: JWT-based admin authentication and authorization

### System Features

- **Intelligent Room Allocation**: Automatic room assignment based on capacity and availability
- **Real-time Availability**: Dynamic room availability checking
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Data Persistence**: MySQL database with comprehensive schema

## 🛠️ Technology Stack

### Backend

- **Framework**: Spring Boot 3.3.4
- **Language**: Java 23
- **Database**: MySQL 8.0
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven
- **Additional Libraries**:
  - JJWT (JWT handling)
  - Spring Data JDBC
  - MySQL Connector

### Frontend

- **Framework**: React 18.3.1
- **Routing**: React Router DOM 6.27.0
- **Styling**: Tailwind CSS 3.4.14
- **Build Tool**: Vite 5.4.8
- **Development**: ESLint for code quality

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java 23** or higher
- **Node.js 18** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **npm** or **yarn**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HMproject
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create and populate database
source HMProject.sql
```

### 3. Backend Configuration

```bash
cd backend/demo

# Update database credentials in src/main/resources/application.properties
# spring.datasource.username=your_username
# spring.datasource.password=your_password

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run
```

The backend server will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

## 📊 Database Schema

The system uses a comprehensive MySQL database with the following key entities:

- **Guest**: User information and authentication
- **Employee**: Staff management with roles and departments
- **Room**: Hotel room inventory with types and pricing
- **Booking**: Reservation management with date tracking
- **Bill**: Payment and transaction records

## 🔐 Authentication & Authorization

### User Roles

- **Guest**: Can register, login, and make bookings
- **Admin**: Full system access including employee and room management
- **Super Admin**: Complete administrative privileges

### Security Features

- JWT token-based authentication
- Role-based access control
- Secure password handling
- Protected API endpoints

## 📡 API Endpoints

### Guest APIs

- `POST /api/register` - Guest registration
- `POST /api/login` - Guest authentication
- `POST /api/booking/guest/request` - Create booking

### Admin APIs

- `POST /api/admin/register` - Employee registration
- `POST /api/admin/all/login` - Admin authentication
- `GET /api/admin/all/employees` - List all employees
- `PUT /api/admin/employee/{username}` - Update employee
- `DELETE /api/admin/employee/{username}` - Delete employee

### Room Management APIs

- `GET /api/room/all` - List all rooms
- `POST /api/room/add` - Add new room
- `DELETE /api/room/{roomNo}` - Delete room
- `GET /api/room/available` - Check room availability

### Booking Management APIs

- `GET /api/booking/admin/all` - View all bookings
- `DELETE /api/booking/{bookingId}` - Cancel booking

## 🎯 Key Features Implementation

### Smart Room Allocation

The system implements an intelligent room allocation algorithm that:

- Prioritizes larger capacity rooms for better space utilization
- Automatically selects optimal room combinations
- Ensures guest count requirements are met
- Calculates pricing based on room types and duration

### Real-time Availability

- Dynamic room availability checking based on booking dates
- Prevents double bookings
- Real-time updates across the system

## 🎨 User Interface

The application features a modern, responsive design with:

- Clean and intuitive navigation
- Mobile-responsive layout
- Professional color scheme
- User-friendly forms and data tables
- Real-time feedback and error handling

## 🚦 Getting Started

1. **For Guests**:
   - Register a new account or login
   - Browse available rooms
   - Select dates and guest count
   - Complete booking process

2. **For Administrators**:
   - Login with admin credentials
   - Access admin dashboard
   - Manage employees, rooms, and bookings
   - View system analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

## 🔮 Future Enhancements

- Payment gateway integration
- Email notification system
- Advanced reporting and analytics
- Mobile application
- Multi-language support
- Advanced booking management features
