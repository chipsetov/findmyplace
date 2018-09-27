package ua.softserve.rv036.findmeplace.controller;

import com.sun.jndi.toolkit.url.Uri;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.model.enums.BanStatus;
import ua.softserve.rv036.findmeplace.model.enums.Role;
import ua.softserve.rv036.findmeplace.payload.*;
import ua.softserve.rv036.findmeplace.repository.UserRepository;
import ua.softserve.rv036.findmeplace.security.JwtTokenProvider;
import ua.softserve.rv036.findmeplace.service.UserServiceImpl;

import javax.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );


        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByNickNameOrEmail
                (loginRequest.getUsernameOrEmail(), loginRequest.getUsernameOrEmail()).get();
        user.setLastUpdateDate(Instant.now());
        userRepository.save(user);
        Role role = user.getRole();
        Long id = user.getId();

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, role, id));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByNickName(signUpRequest.getNickName())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getEmail(),
                signUpRequest.getNickName(), signUpRequest.getPassword());

        userService.createUser(user);


        URI location = URI.create(ServletUriComponentsBuilder
                .fromCurrentContextPath().toString());
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("/checkUserAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username, @RequestParam(value = "email") String email) {
        Boolean isNickNameAvailable = !userRepository.existsByNickName(username);
        Boolean isEmailAvailable = !userRepository.existsByEmail(email);

        return new UserIdentityAvailability(isNickNameAvailable, isEmailAvailable);
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<ApiResponse> activate(@PathVariable String code) {
        User user = userRepository.findByActivationCode(code).orElseThrow(() ->
                new UsernameNotFoundException("User not found")
        );
        user.setActive(true);
        user.setActivationCode(null);


        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(user.getNickName()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "User confirmed email"));
    }

    }
