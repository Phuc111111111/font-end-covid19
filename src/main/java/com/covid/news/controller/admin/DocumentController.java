package com.covid.news.controller.admin;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/documents")
public class DocumentController {

    @GetMapping
    public String get() {
        return "templates/admin/view/document/list.html";
    }

    @GetMapping("/edit/{id}")
    public String edit(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("id", id);
        return "templates/admin/view/document/edit.html";
    }

    @GetMapping("/add")
    public String add() {
        return "templates/admin/view/document/add.html";
    }

}
