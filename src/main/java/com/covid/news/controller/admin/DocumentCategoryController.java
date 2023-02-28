package com.covid.news.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by LE THE HIEU
 * Date:March 12, 2022
 * Time: 1:35 AM
 */

@Controller
@RequestMapping("/admin")
public class DocumentCategoryController {

    @GetMapping("/document-category")
    public String get() {
        return "templates/admin/view/document-category/list.html";
    }
}
