package ua.softserve.rv036.findmeplace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import ua.softserve.rv036.findmeplace.model.Feedback;
import ua.softserve.rv036.findmeplace.payload.FeedbackRequest;
import ua.softserve.rv036.findmeplace.repository.FeedbackRepository;

import javax.validation.Valid;

@Service
public class FeedbackService {

    @Autowired
    FeedbackRepository feedbackRepository;

    public boolean saveFeedback(@Valid @RequestBody FeedbackRequest request){

        Feedback feedback = new Feedback(
                request.getComment(), request.getMark(), request.getUserId(), request.getPlaceId());
        feedbackRepository.save(feedback);
        return true;

    }
}
