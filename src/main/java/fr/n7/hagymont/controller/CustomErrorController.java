package fr.n7.hagymont.controller;

import java.io.IOException;
import java.io.StringWriter;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public void handleError(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        int statusCode = response.getStatus();
        Throwable throwable = (Throwable) request.getAttribute("jakarta.servlet.error.exception");

        if (throwable != null) {
            StringWriter sw = new StringWriter();
            throwable.printStackTrace(new java.io.PrintWriter(sw));
            response.getWriter().write("Error: " + statusCode + ", " + sw.toString());
            return;
        } else {
            response.getWriter().write("Error: " + statusCode);
            return;
        }
    }

}
