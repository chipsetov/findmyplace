package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.softserve.rv036.findmeplace.model.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {

}
