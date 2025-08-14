package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.model.Guest;
import com.example.demo.model.UserDetail;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.startsWith("employee_")) {
            Employee employee = employeeRepository.findByUsername(username);
            if (employee != null) {
                return new UserDetail(employee.getUsername(), employee.getPassword(), employee.getAuthorities());
            }
        } else {
            Guest guest = guestRepository.findByUsername(username);
            if (guest != null) {
                return new UserDetail(guest.getUsername(), guest.getPassword(), guest.getAuthorities());
            }
        }

        throw new UsernameNotFoundException("User not found.");
    }

}
