package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.repository.CrudRepository;
import ua.softserve.rv036.findmeplace.model.Booking;

public interface BookingRepository extends CrudRepository<Booking, Long> {

}
