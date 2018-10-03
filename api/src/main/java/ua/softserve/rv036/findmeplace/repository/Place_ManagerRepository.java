package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.softserve.rv036.findmeplace.model.Feedback;
import ua.softserve.rv036.findmeplace.model.Place_Manager;

import java.util.List;

@Repository
public interface Place_ManagerRepository extends JpaRepository<Place_Manager, Long> {

    @Query("select f.id, f.userId, u.nickName, f.placeId, p.name from Place_Manager f join User u on u.id = f.userId join Place p on p.id = f.userId")
    List<Place_Manager> findAll();
}
