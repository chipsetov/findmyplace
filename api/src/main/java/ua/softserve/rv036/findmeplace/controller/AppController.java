package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.repository.UserRepository;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
public class AppController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
    public List<User> hello() {
        User user = new User("aaa@gmail.com", "hshsh", "ssss");
        userRepository.save(user);
        return userRepository.findAll();
    }

    @GetMapping("/test")
    @RolesAllowed("ROLE_USER")
    public String test() {
        return "TEST world";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String admin() {
        return "ADMIN world";
    }
}
