package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Feedback;
import ua.softserve.rv036.findmeplace.payload.ApiResponse;
import ua.softserve.rv036.findmeplace.payload.FeedbackRequest;
import ua.softserve.rv036.findmeplace.repository.FeedbackRepository;
import ua.softserve.rv036.findmeplace.service.FeedbackService;

import javax.validation.Valid;
import java.util.List;

@RestController
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private FeedbackService feedbackService;


    @GetMapping("/places/{id}/feedbacks")
    List<Feedback> feedbacksByPlaceId(@PathVariable Long id) {
        return feedbackRepository.findAllByPlaceId(id);
    }

    @PostMapping("/places/feedback")
    @Valid
    public ResponseEntity<?> saveFeedback(@RequestBody FeedbackRequest feedbackRequest) {
        feedbackService.saveFeedback(feedbackRequest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Feedback added successfully"));
    }
}
