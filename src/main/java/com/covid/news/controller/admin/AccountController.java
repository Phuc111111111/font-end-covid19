package com.covid.news.controller.admin;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/accounts")
public class AccountController {

    @GetMapping
    public String get() {
        return "templates/admin/view/account/list.html";
    }

    @GetMapping("/edit/{id}")
    public String edit(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("id_account", id);
        return "templates/admin/view/account/edit.html";
    }

}
