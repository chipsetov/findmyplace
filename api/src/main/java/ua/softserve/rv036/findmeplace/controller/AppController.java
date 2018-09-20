package ua.softserve.rv036.findmeplace.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
public class AppController {

    @GetMapping("/")
    public String hello() {
        return "Hello world";
    }

    @GetMapping("/test")
    @RolesAllowed("ROLE_USER")
    public String test() {
        return "TEST world";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String admin() {
        return "ADMIN world";
    }
}
