package com.covid.news.security;

import com.covid.news.security.UserModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Value("${api.getuseruri}")
    private String uri;

    private UserModel loadUserByApi(String userName) {

      Map<String, String> data = new HashMap<>();
      data.put("username", userName);
      RestTemplate restTemplate = new RestTemplate();
      return restTemplate.postForObject(uri, data, UserModel.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      try {
        UserModel userEntity = loadUserByApi(username);

        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        authorities.add(new SimpleGrantedAuthority(userEntity.getRole()));
        System.out.println(userEntity.getPassword());
        MyUser myUser = new MyUser(userEntity.getUsername(), userEntity.getPassword(), true, true, true, true, authorities);

        myUser.setFullName(userEntity.getFullName());
        myUser.setEmail(userEntity.getEmail());
        myUser.setAddress(userEntity.getAddress());
        myUser.setImage(userEntity.getImage());
        myUser.setPhone(userEntity.getPhone());
        myUser.setId(userEntity.getId());

        return myUser;
      } catch (Exception e) { throw  new UsernameNotFoundException("User name not found");}
    }
}
