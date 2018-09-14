package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.PlaceType;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

@RestController
public class PlaceController {

    @Autowired
    private PlaceRepository placeRepository;

    @PreAuthorize("isAnonymous()")
    @GetMapping("/places")
    List<Place> getPlace() {
        return placeRepository.findAll();
    }

    @Secured("IS_AUTHENTICATED_ANONYMOUSLY")
    @GetMapping("/placeByType")
    List<Place> placesByType() {
        return placeRepository.findByPlaceType(PlaceType.CAFE);
    }

    @RolesAllowed("ROLE_USER")
    @GetMapping("/places/{id}")
    Optional<Place> getUserById(@PathVariable Long id) {
        return placeRepository.findById(id);
    }

}
