package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.PlaceType;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;

import java.sql.Time;

@RestController
public class PlaceController {
    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping("/")
    public String hello() {
        return "Hello world";
    }

    @GetMapping("/get")
    public Iterable<Place> getPlace() {
        return placeRepository.findAll();
    }

    @GetMapping("/insert")
    public void insert() {
        Place place = new Place("TestName",
                new PlaceType("TestType", "Test"),
                "Address",
                "description",
                1,
                new Time(8, 0, 0),
                new Time(17, 0, 0));

        placeRepository.save(place);
    }

}
