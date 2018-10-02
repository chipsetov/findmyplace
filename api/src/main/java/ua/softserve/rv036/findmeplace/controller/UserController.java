package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ua.softserve.rv036.findmeplace.model.Place;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;
import ua.softserve.rv036.findmeplace.payload.UpdateProfileRequest;
import ua.softserve.rv036.findmeplace.repository.UserRepository;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{username}")
    Optional<User> getUserById(@PathVariable String username) {
        return userRepository.findByNickName(username);
    }

    @GetMapping("/user/{id}/places")
    public List<Place> getUserPlaces(@PathVariable Long id) {
        return placeRepository.findAllByOwnerId(id);
    }

    @GetMapping("/users/nick/{nickname}")
    Optional<User> getUserByNickName(@PathVariable String nickname) {
        return userRepository.findByNickName(nickname);
    }

    @PostMapping("/users/update")
    User updateUser(@Valid @RequestBody UpdateProfileRequest updateProfileRequest) {
        final String oldNickNameOrEmail = updateProfileRequest.getOldNickName();

        if (!userRepository.existsByNickNameOrEmail(oldNickNameOrEmail, oldNickNameOrEmail)) {
            // TODO: error
        }

        final String nickName = updateProfileRequest.getNickName();
        final String email = updateProfileRequest.getEmail();
        final String password = updateProfileRequest.getPassword();

        User user = userRepository.findByNickNameOrEmail(oldNickNameOrEmail, oldNickNameOrEmail).get();

        if (passwordEncoder.matches(password, user.getPassword())) {
            // TODO: error
        }

        user.setNickName(nickName);
        user.setEmail(email);

        userRepository.save(user);

        return user;
    }

    @DeleteMapping("/user/delete-place/{id}")
    public ResponseEntity<Void> deleteUserPlaceById(@PathVariable("id") Long id) {
        placeRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
