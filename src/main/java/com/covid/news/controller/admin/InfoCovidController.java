package com.covid.news.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class InfoCovidController {
    @GetMapping("/info-covid")
    public String get() {
        return "templates/admin/view/info-covid/list.html";
    }
}
