package com.example.demo.model;

public class EmployeeRole {
    private String username;
    private String roleName;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "EmployeeRole{" +
                "username='" + username + '\'' +
                ", roleName='" + roleName + '\'' +
                '}';
    }
}
