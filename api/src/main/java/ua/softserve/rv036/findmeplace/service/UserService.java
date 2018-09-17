package ua.softserve.rv036.findmeplace.service;

import ua.softserve.rv036.findmeplace.model.User;

public interface UserService {
    public User findUserByEmail(String email);

    public void saveUser(User user);
}
