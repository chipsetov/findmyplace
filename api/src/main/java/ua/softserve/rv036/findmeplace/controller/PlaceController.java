package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Feedback;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.PlaceType;
import ua.softserve.rv036.findmeplace.repository.FeedbackRepository;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;
import ua.softserve.rv036.findmeplace.repository.UserRepository;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
public class PlaceController {

    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/map")
    List<Place> getPlace() {
        return placeRepository.findAll();
    }

    @GetMapping("/places/{id}")
    Optional<Place> getUserById(@PathVariable Long id) {
        return placeRepository.findById(id);
    }

    @GetMapping("/places/{id}/feedbacks")
    List<Feedback> feedbacksByPlaceId(@PathVariable Long id) {
        return feedbackRepository.findByPlaceId(id);
    }

    @GetMapping("/places/types")
    List<PlaceType> getAllTypes() {
        return Arrays.asList(PlaceType.values());
    }

    @PostMapping("/places/register")
    @RolesAllowed("ROLE_OWNER")
    ResponseEntity<Place> registerPlace(@Valid @RequestBody Place place) {

        if(placeRepository.existsByName(place.getName())) {
            return new ResponseEntity("Place already exists", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            place.setCountFreePlaces(0);
            Place result = placeRepository.save(place);

            return new ResponseEntity(result, HttpStatus.CREATED);
        }
    }

}
