package com.covid.news.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/user/chat")
public class ChatUserController {


    @GetMapping
    public String chat() {
        return "templates/user/view/chat.html";
    }


}
