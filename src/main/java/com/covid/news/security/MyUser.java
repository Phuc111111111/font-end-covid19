package com.covid.news.security;


import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
@Setter @Getter
public class MyUser extends User {

    private Long id;
    private String fullName;
    private String phone;
    private String address;
    private String email;
    private String description;
    private String image;
    private String status;

    public MyUser(String username, String password, boolean enabled,
                  boolean accountNonExpired, boolean credentialsNonExpired,
                  boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);

    }

}
