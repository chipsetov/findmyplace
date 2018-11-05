package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.softserve.rv036.findmeplace.model.UserBan;

public interface UserBanRepository extends JpaRepository<UserBan, Long> {
}
