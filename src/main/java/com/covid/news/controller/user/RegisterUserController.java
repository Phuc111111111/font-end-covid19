package com.covid.news.controller.user;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/register")
public class RegisterUserController {

    @GetMapping
    public String register() {
        return "templates/user/view/register.html";
    }

}
