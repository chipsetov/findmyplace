package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ua.softserve.rv036.findmeplace.model.Booking;

import java.util.List;

public interface BookingRepository extends CrudRepository<Booking, Long> {
    @Query("select new Booking(b.id, b.userId, b.placeId, b.bookingTime, b.status, p.name) " +
            "from Booking b, Place p where b.placeId = p.id and b.userId = :userId")
    List<Booking> findAllByUserId(@Param("userId") Long userId);
}
