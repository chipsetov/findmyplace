package ua.softserve.rv036.findmeplace.service;

import com.sun.jndi.toolkit.url.Uri;
import liquibase.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.Place_Manager;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.model.enums.BanStatus;
import ua.softserve.rv036.findmeplace.model.enums.Role;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;
import ua.softserve.rv036.findmeplace.repository.Place_ManagerRepository;
import ua.softserve.rv036.findmeplace.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Value("${basicBackendURL}")
    private String backendURL;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private Place_ManagerRepository placeManagerRepository;

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

    @Override
    public List<User> getAllManagersByOwnerRole(Long ownerId) {
        List<Long> idPlacesList = placeRepository.findAllByOwnerId(ownerId)
                .stream()
                .map(Place::getId)
                .collect(Collectors.toList());

        List<Long> idUsersList = placeManagerRepository.findAllByPlaceIdIn(idPlacesList)
                .stream()
                .map(Place_Manager::getUserId)
                .collect(Collectors.toList());

        return userRepository.findAllByIdIn(idUsersList);
    }

    public void sendEmailConfirmation(User user) throws IOException {

        if (!StringUtils.isEmpty(user.getEmail())) {
            String URL = backendURL + "auth/activate/" + user.getActivationCode()+"/";

            String context  = new String(Files.readAllBytes(Paths.get("api/src/main/resources/email.html")));


            String message = String.format(
                                      context,
                                       user.getNickName(), URL);
            mailSender.send(user.getEmail(), "Activate your email!", message);

        }
    }
}