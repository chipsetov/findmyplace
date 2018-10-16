package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.Place_Manager;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.payload.ApiResponse;
import ua.softserve.rv036.findmeplace.payload.UpdateProfileRequest;
import ua.softserve.rv036.findmeplace.payload.UserSummary;
import ua.softserve.rv036.findmeplace.repository.FeedbackRepository;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;
import ua.softserve.rv036.findmeplace.repository.Place_ManagerRepository;
import ua.softserve.rv036.findmeplace.repository.UserRepository;
import ua.softserve.rv036.findmeplace.security.CurrentUser;
import ua.softserve.rv036.findmeplace.security.UserPrincipal;
import ua.softserve.rv036.findmeplace.service.FileStorageService;
import ua.softserve.rv036.findmeplace.service.UserService;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private Place_ManagerRepository placeManagerRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/user/me")
    @RolesAllowed({"ROLE_USER", "ROLE_MANAGER", "ROLE_OWNER", "ROLE_ADMIN"})
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getAuthority().getAuthority());
        userSummary.setFirstName(currentUser.getFirstName());
        userSummary.setLastName(currentUser.getLastName());
        userSummary.setEmail(currentUser.getEmail());
        userSummary.setPhone(currentUser.getPhone());
        return userSummary;
    }

//    @GetMapping("/user/me")
//    @RolesAllowed({"ROLE_USER", "ROLE_MANAGER", "ROLE_OWNER", "ROLE_ADMIN"})
//    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
//        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getAuthority().getAuthority());
//        return userSummary;
//    }

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

    @GetMapping("/manager/{id}/places")
    public List<Place_Manager> getManagerPlaces(@PathVariable("id") Long id) {
        return placeManagerRepository.findAllByUserId(id);
    }

    @GetMapping("/user/{id}/managers")
    public List<User> getUserManagers(@PathVariable Long id) {
        return userService.getAllManagersByOwnerRole(id);
    }

    @PostMapping("/user/{ownerId}/delete-manager/{managerId}")
    ResponseEntity deleteManagers(@PathVariable Long ownerId, @PathVariable Long managerId){

        List<Place_Manager> allByUserId = placeManagerRepository.findAllByUserId(managerId);

        placeManagerRepository.deleteAll(allByUserId);

        List<User> result = userService.getAllManagersByOwnerRole(ownerId);

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/users/nick/{nickname}")
    Optional<User> getUserByNickName(@PathVariable String nickname) {
        return userRepository.findByNickName(nickname);
    }

    @PostMapping("/set-avatar")
    @RolesAllowed({"ROLE_USER", "ROLE_OWNER", "ROLE_MANAGER", "ROLE_ADMIN"})
    public ResponseEntity uploadAvatar(@RequestParam("file") MultipartFile file) {

        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<User> optional = userRepository.findById(userPrincipal.getId());
        User user = optional.get();

        if(FileStorageService.isImage(file)) {
            String link = fileStorageService.storeFile(file, "users/" + user.getId());
            user.setAvatarUrl(link);
            userRepository.save(user);
            return new ResponseEntity(new ApiResponse(true, "Avatar changed"), HttpStatus.OK);
        }

        return new ResponseEntity(new ApiResponse(false, "Avatar not changed"), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("get-avatar")
    @RolesAllowed({"ROLE_USER", "ROLE_OWNER", "ROLE_MANAGER", "ROLE_ADMIN"})
    public Optional<String> getAvatar() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<User> optional = userRepository.findById(userPrincipal.getId());
        User user = optional.get();

        return Optional.ofNullable(user.getAvatarUrl());
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
    public ResponseEntity deleteUserPlaceById(@PathVariable("id") Long id) {
        placeRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/user/delete-feedback/{id}")
    public ResponseEntity deleteUserFeedbackById(@PathVariable("id") Long id) {
        feedbackRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/user/update-profile")
    ResponseEntity updateUserProfile(@RequestBody UpdateProfileRequest updateProfileRequest) {
        return userService.updateUserProfile(updateProfileRequest);
    }

    @PostMapping("/user/update-password")
    ResponseEntity updateUserPassword(@RequestBody UpdateProfileRequest updateProfileRequest) {
       return userService.updateUserPassword(updateProfileRequest);
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity deleteUser(@PathVariable("id") Long id) {
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
