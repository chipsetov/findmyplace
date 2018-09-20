package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ua.softserve.rv036.findmeplace.model.Feedback;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.repository.*;
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

    @GetMapping("/places/{id}")
    Optional<Place> getUserById(@PathVariable Long id) {
        return placeRepository.findById(id);
    }

    @GetMapping("places/{id}/feedbacks")
    List<Feedback> feedbacksByPlaceId(@PathVariable Long id) {
        return feedbackRepository.findByPlaceId(id);
    }

}
