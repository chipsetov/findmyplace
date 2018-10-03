package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Feedback;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.Place_Manager;
import ua.softserve.rv036.findmeplace.model.enums.PlaceType;
import ua.softserve.rv036.findmeplace.payload.ApiResponse;
import ua.softserve.rv036.findmeplace.repository.FeedbackRepository;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;
import ua.softserve.rv036.findmeplace.repository.Place_ManagerRepository;
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
    @Autowired
    private Place_ManagerRepository placeManagerRepository;

    @GetMapping("place/map")
    List<Place> getPlace() {
        return placeRepository.findAll();
    }

    @GetMapping("/placeByType")
    List<Place> placesByType() {
        return placeRepository.findByPlaceType(PlaceType.CAFE);
    }

    @GetMapping("/places/{id}")
    Optional<Place> getPlaceById(@PathVariable Long id) {
        return placeRepository.findById(id);
    }

    @GetMapping("/places/{id}/feedbacks")
    List<Feedback> feedbacksByPlaceId(@PathVariable Long id) {
        return feedbackRepository.findAllByPlaceId(id);
    }

    @GetMapping("/places/{id}/managers")
    List<Place_Manager> managersByPlaceId(@PathVariable Long id) {
        return placeManagerRepository.findAllByPlaceId(id);
    }

    @GetMapping("/places/types")
    List<PlaceType> getAllTypes() {
        return Arrays.asList(PlaceType.values());
    }

    @PostMapping("/places/register")
    @RolesAllowed("ROLE_OWNER")
    ResponseEntity registerPlace(@Valid @RequestBody Place place) {

        if(placeRepository.existsByName(place.getName())) {
            return new ResponseEntity(new ApiResponse(Boolean.FALSE, "Place is already exist"),
                    HttpStatus.BAD_REQUEST);
        } else {
            place.setCountFreePlaces(0);
            place.setRating(0.0);
            Place result = placeRepository.save(place);

            return new ResponseEntity(result, HttpStatus.CREATED);
        }
    }

}
