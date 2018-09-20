package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.PlaceType;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByPlaceType(PlaceType placeType);
    Boolean existsByName(String name);
}
