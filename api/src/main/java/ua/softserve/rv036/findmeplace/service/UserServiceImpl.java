package ua.softserve.rv036.findmeplace.service;

import com.sun.jndi.toolkit.url.Uri;
import liquibase.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.model.enums.BanStatus;
import ua.softserve.rv036.findmeplace.model.enums.Role;
import ua.softserve.rv036.findmeplace.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Value("${basicBackendURL}")
    private String backendURL;

    @Value("${basicFrontendURL}")
    private String frontendURL;

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

        try {
            sendEmailConfirmation(user);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        userRepository.save(user);

        return true;
    }

    public void sendEmailConfirmation(User user) throws IOException {

        if (!StringUtils.isEmpty(user.getEmail())) {
            String URL = backendURL + "auth/activate/" + user.getActivationCode() + "/";

            String context = new String(Files.readAllBytes(Paths.get("api/src/main/resources/emailConfirmation.html")));

            String message = String.format(
                    context,
                    user.getNickName(), URL);
            mailSender.send(user.getEmail(), "Activate your email!", message);

        }
    }

    public boolean sendRestoreEmail(User user) {

        if (!StringUtils.isEmpty(user.getEmail())) {
            String URL =  frontendURL+ "restore/" + user.getActivationCode();

            String context = null;
            try {
                context = new String(Files.readAllBytes(Paths.get("api/src/main/resources/restorePassword.html")));
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }

            String message = String.format(
                    context,
                    user.getNickName(), URL);
            mailSender.send(user.getEmail(), "Restore your password!", message);
        }
        return true;
    }

    public void activateUser(User user) {
        user.setActive(true);
        user.setActivationCode(null);
        userRepository.save(user);
    }

    public void restoreUserPassword(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActivationCode(null);
        userRepository.save(user);
    }

}