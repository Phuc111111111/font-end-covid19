package com.covid.news.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class HomeUserController {

    @GetMapping("/home")
    public String home() {
        return "templates/user/view/index.html";
    }

    @GetMapping("/doctor/detail/{id}")
    public String getInfoDoctor(@PathVariable("id") Long id, Model model) {
        model.addAttribute("id", id);
        return "templates/user/view/account/infor-doctor.html";
    }

    @GetMapping("/detail-category/{id}")
    public String getDetailCategory(@PathVariable("id") Long id, Model model) {
        model.addAttribute("id", id);
        return "templates/user/view/document-category/list.html";
    }

    @GetMapping("/detail-document/{id}")
    public String getDetailDocument(@PathVariable("id") Long id, Model model) {
        model.addAttribute("id", id);
        return "templates/user/view/document/detail.html";
    }

}



