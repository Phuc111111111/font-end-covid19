package com.covid.news.security;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

public class SecurityUtils {

    @SuppressWarnings("unchecked")
    public static List<String> getAuthorities() {
        List<String> results = new ArrayList<String>();
        List<GrantedAuthority> authorities = (List<GrantedAuthority>) (SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities());
        for (GrantedAuthority authority : authorities) {
            results.add(authority.getAuthority());
        }
        return results;
    }

    public static MyUser getPrincipal() {
        MyUser myUser = (MyUser) (SecurityContextHolder.getContext()).getAuthentication().getPrincipal();
        return myUser;
    }
}
