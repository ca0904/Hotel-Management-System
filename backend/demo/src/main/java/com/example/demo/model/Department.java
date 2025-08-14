package com.example.demo.model;

public class Department {
    private String departmentName;
    private String description;

    public String getDepartmentName() {
        return departmentName;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return "Department{" +
                "departmentName='" + departmentName + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

}
