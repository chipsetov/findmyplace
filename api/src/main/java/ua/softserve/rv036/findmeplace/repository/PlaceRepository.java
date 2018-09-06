package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.repository.CrudRepository;
import ua.softserve.rv036.findmeplace.model.Place;

public interface PlaceRepository extends CrudRepository<Place, Long> {
    Iterable<Place> findByPlaceTypeId(Integer id);
}
