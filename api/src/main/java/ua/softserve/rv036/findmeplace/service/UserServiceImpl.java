package ua.softserve.rv036.findmeplace.service;

import liquibase.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.model.enums.BanStatus;
import ua.softserve.rv036.findmeplace.model.enums.Role;
import ua.softserve.rv036.findmeplace.repository.UserRepository;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Value("${basicBackendURL}")
    private String backendURL;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailSender mailSender;

    @Override
    public boolean createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ROLE_USER);
        user.setBanStatus(BanStatus.NOT_BAN);
        user.setActivationCode(UUID.randomUUID().toString());

        sendEmailConfirmation(user);
        userRepository.save(user);

        return true;
    }

    public void sendEmailConfirmation(User user) {

        if (!StringUtils.isEmpty(user.getEmail())) {

            String message = String.format(
                    "Hello, %s! \n" +
                            "Welcome to Find Me Place. Please, visit next link: " + backendURL + "auth/activate/%s",
                    user.getNickName(), user.getActivationCode());

            mailSender.send(user.getEmail(), "Activate your email!", message);
        }
    }

}