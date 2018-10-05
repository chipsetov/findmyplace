package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.softserve.rv036.findmeplace.model.Place;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.payload.ApiResponse;
import ua.softserve.rv036.findmeplace.payload.UpdateProfileRequest;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;
import ua.softserve.rv036.findmeplace.repository.UserRepository;
import ua.softserve.rv036.findmeplace.service.FileStorageService;

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

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/users")
    List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    @GetMapping("/user/{id}/places")
    public List<Place> getUserPlaces(@PathVariable Long id) {
        return placeRepository.findAllByOwnerId(id);
    }

    @GetMapping("/users/nick/{nickname}")
    Optional<User> getUserByNickName(@PathVariable String nickname) {
        return userRepository.findByNickName(nickname);
    }

    @PostMapping("/set-avatar")
    public String uploadAvatar(@RequestParam("file") MultipartFile file) {

        if(FileStorageService.isImage(file)) {
            String link = fileStorageService.storeFile(file, "images");
            return "Ok";
        }

        return "Not ok";
    }

    @PostMapping("/users/update")
    ResponseEntity updateUser(@Valid @RequestBody UpdateProfileRequest updateProfileRequest) {
        final Long userId = updateProfileRequest.getUserId();

        Optional<User> optional = userRepository.findById(userId);
        User user = optional.get();

        if (user == null) {
            ApiResponse response = new ApiResponse(false, "User by id " + userId + " doesn't exist!");
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }

        final String password = updateProfileRequest.getPassword();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            ApiResponse response = new ApiResponse(false, "You have entered invalid password");
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }

        final String firstName = updateProfileRequest.getFirstName();
        final String lastName = updateProfileRequest.getLastName();
        final String nickName = updateProfileRequest.getNickName();
        final String email = updateProfileRequest.getEmail();
        final String phone = updateProfileRequest.getPhone();

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setNickName(nickName);
        user.setEmail(email);
        user.setPhone(phone);

        final String newPassword = updateProfileRequest.getNewPassword();
        final String confirmPassword = updateProfileRequest.getConfirmPassword();

        if (newPassword.length() > 0) {
            if (!password.equals(newPassword)) {
                if (newPassword.equals(confirmPassword)) {
                    user.setPassword(passwordEncoder.encode(newPassword));
                }
            }
        }

        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse(true, "Your profile was changed successfully"));
    }

    @DeleteMapping("/user/delete-place/{id}")
    public ResponseEntity<Void> deleteUserPlaceById(@PathVariable("id") Long id) {
        placeRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
