package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.enums.PlaceType;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    @Query("SELECT p FROM Place p WHERE p.approved = true")
    List<Place> findAll();

    @Query("SELECT p FROM Place p WHERE p.approved = true")
    List<Place> findByPlaceType(PlaceType placeType);

    @Query("select p from Place p where p.approved = true")
    List<Place> findByPlaceTypeIn(List<PlaceType> placeTypes);

    @Query("select p from Place p where p.approved = true")
    List<Place> findByNameIn(String searchValue);

    @Query("select p from Place p where p.approved = true")
    List<Place> findAllByOwnerId(Long id);

    @Query("select p from Place p where p.approved = false")
    List<Place> findAllNotApproved();

    @Query("select p from Place p where p.approved = false and p.id = :id")
    Optional<Place> findNotApprovedById(@Param("id") Long id);

    Boolean existsByName(String name);
}
