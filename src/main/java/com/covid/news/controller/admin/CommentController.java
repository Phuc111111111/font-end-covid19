package com.covid.news.controller.admin;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/comments")
public class CommentController {

    @GetMapping("/{id}")
    public String getComment(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("idDocument", id);
        return "templates/admin/view/document/list-comment.html";
    }

}
