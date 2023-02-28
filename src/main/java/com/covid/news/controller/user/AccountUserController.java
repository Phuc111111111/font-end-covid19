package com.covid.news.controller.user;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/my-account")
public class AccountUserController {

    @GetMapping("/detail")
    public String chat() {
        return "templates/user/view/account/detail.html";
    }
}
