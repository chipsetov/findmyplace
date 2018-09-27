package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.enums.PlaceType;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByPlaceType(PlaceType placeType);

    List<Place> findByPlaceTypeIn(List<PlaceType> placeTypes);

    List<Place> findByNameIn(String searchValue);

    List<Place> findAllByOwnerId(Long id);
    Boolean existsByName(String name);
}
