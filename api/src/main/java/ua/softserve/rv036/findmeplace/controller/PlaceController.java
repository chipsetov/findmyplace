package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Feedback;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.PlaceType;
import ua.softserve.rv036.findmeplace.payload.ApiResponse;
import ua.softserve.rv036.findmeplace.payload.RegisterPlaceRequest;
import ua.softserve.rv036.findmeplace.repository.FeedbackRepository;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;

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

    @GetMapping("/map")
    List<Place> getPlace() {
        return placeRepository.findAll();
    }

    @GetMapping("/placeByType")
    List<Place> placesByType() {
        return placeRepository.findByPlaceType(PlaceType.CAFE);
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
    ResponseEntity<RegisterPlaceRequest> registerPlace(@Valid @RequestBody RegisterPlaceRequest registerPlaceRequest) {

        if(placeRepository.existsByName(registerPlaceRequest.getPlaceName())) {
            return new ResponseEntity("Place already exists", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            Place place = new Place();
            place.setName(registerPlaceRequest.getPlaceName());
            place.setAddress(registerPlaceRequest.getAddress());
            place.setOpen(registerPlaceRequest.getOpenTime());
            place.setClose(registerPlaceRequest.getCloseTime());
            place.setDescription(registerPlaceRequest.getDescription());
            place.setPlaceType(registerPlaceRequest.getPlaceType());

            Place result = placeRepository.save(place);

            return new ResponseEntity(result, HttpStatus.CREATED);
        }
    }

}
