package ua.softserve.rv036.findmeplace.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.payload.UpdateProfileRequest;

import java.util.List;

@Service
public interface UserService {

   public boolean createUser(User user);

   List<User> getAllManagersByOwnerRole(Long ownerId);

   public ResponseEntity updateUserProfile(UpdateProfileRequest updateProfileRequest);

   public ResponseEntity updateUserPassword(UpdateProfileRequest updateProfileRequest);

}
