package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.softserve.rv036.findmeplace.model.User;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAll();

    Optional<User> findByEmail(String email);

    Optional<User> findByNickName(String nickName);

    Optional<User> findByNickNameOrEmail(String nickName, String email);

    Boolean existsByNickName(String nickName);

    Boolean existsByEmail(String email);

    Boolean existsByNickNameOrEmail(String nickName, String email);


}