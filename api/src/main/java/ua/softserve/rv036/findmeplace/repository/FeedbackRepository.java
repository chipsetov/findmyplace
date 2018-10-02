package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.softserve.rv036.findmeplace.model.Feedback;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query("select new ua.softserve.rv036.findmeplace.model.Feedback(f.id, f.comment, f.mark, f.ownerId, u.nickName, f.placeId)" +
    "from Feedback f, User u where f.ownerId = u.id and f.placeId = :id")
    List<Feedback> findAllByPlaceId(@Param("id") Long id);

}
