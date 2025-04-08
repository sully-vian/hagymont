package fr.n7.hagymont.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String showLoginPage() {
        return "/WEB-INF/jsp/login.jsp"; // Forward to the login.jsp file.
    }
}
