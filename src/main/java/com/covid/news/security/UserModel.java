package com.covid.news.security;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class    UserModel {
    private Long id;
    private String username;
    private String password;
    private String fullName;
    private String phone;
    private String address;
    private String email;
    private String description;
    private String image;
    private String status;
    private String role;
}
