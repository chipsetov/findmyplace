package ua.softserve.rv036.findmeplace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.repository.UserRepository;

import java.util.List;

@Service
public interface UserService {

   public boolean createUser(User user);

   List<User> getAllManagersByOwnerRole(Long ownerId);
}
