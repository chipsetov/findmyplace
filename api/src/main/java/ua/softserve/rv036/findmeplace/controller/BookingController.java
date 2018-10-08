package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Booking;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.payload.ApiResponse;
import ua.softserve.rv036.findmeplace.payload.BookingRequest;
import ua.softserve.rv036.findmeplace.repository.BookingRepository;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/{userId}")
    public List<Booking> getBookings(@PathVariable Long userId) {
        return bookingRepository.findAllByUserId(userId);
    }

    @DeleteMapping("/{bookingId}/delete")
    public ResponseEntity deleteBooking(@PathVariable Long bookingId) {
        System.out.println("Delete by id: " + bookingId);
        Optional<Booking> opt = bookingRepository.findById(bookingId);
        Booking booking = opt.orElse(null);

        if (booking == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Booking doesn't exist"));
        }

        if (booking.isClosed()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Booking already closed"));
        }

        bookingRepository.deleteById(bookingId);

        return ResponseEntity.ok().body(new ApiResponse(true, "You have deleted this booking"));
    }

    @PostMapping("/place")
    public ResponseEntity bookPlace(@RequestBody BookingRequest bookingRequest) {
        final Long placeId = bookingRequest.getPlaceId();
        final Optional<Place> opt = placeRepository.findById(placeId);
        final Place place = opt.orElse(null);

        if (place == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Place does't exist"));
        }

        final int countFreePlaces = place.getCountFreePlaces();

        if (countFreePlaces == 0) {
            return ResponseEntity.ok().body(new ApiResponse(true, "It hasn't free places"));
        }

        final Long userId = bookingRequest.getUserId();
        final Booking booking = new Booking(userId, placeId);

        bookingRepository.save(booking);

        return ResponseEntity.ok().body(new ApiResponse(true, "You have booked this place"));
    }
}
