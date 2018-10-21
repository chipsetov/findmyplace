package ua.softserve.rv036.findmeplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ua.softserve.rv036.findmeplace.model.Booking;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.Place_Manager;
import ua.softserve.rv036.findmeplace.model.User;
import ua.softserve.rv036.findmeplace.payload.ApiResponse;
import ua.softserve.rv036.findmeplace.payload.BookingRequest;
import ua.softserve.rv036.findmeplace.repository.BookingRepository;
import ua.softserve.rv036.findmeplace.repository.PlaceRepository;
import ua.softserve.rv036.findmeplace.repository.Place_ManagerRepository;
import ua.softserve.rv036.findmeplace.repository.UserRepository;
import ua.softserve.rv036.findmeplace.security.UserPrincipal;
import ua.softserve.rv036.findmeplace.service.UserService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private Place_ManagerRepository placeManagerRepository;

    @GetMapping("/me")
    public List<Booking> getBookings() {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        final Long userId = principal.getId();

        return bookingRepository.findAllByUserId(userId).stream().filter(booking -> !booking.isClosed()).collect(Collectors.toList());
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
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        final String userName = principal.getUsername();

        User user = userRepository.findByNickName(userName).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "User does't exist"));
        }

        final Long placeId = bookingRequest.getPlaceId();

        final Long userId = user.getId();
        final String bookingTime = bookingRequest.getBookingTime();
        final Booking booking = new Booking(userId, placeId, bookingTime);

        bookingRepository.save(booking);

        return ResponseEntity.ok().body(new ApiResponse(true, "You have booked this place"));
    }

    @GetMapping("/manager/{managerId}/bookings")
    public ResponseEntity getManagerBookings(@PathVariable Long managerId) {
        try {
            List<Place_Manager> placeManagers = placeManagerRepository.findAllByUserId(managerId);
            List<Long> placeIds = placeManagers.stream().map(Place_Manager::getPlaceId).collect(Collectors.toList());
            List<Booking> bookings = bookingRepository.findByPlaceIdIn(placeIds);

            bookings = bookings.stream().filter(booking -> booking.getStatus() == 0).collect(Collectors.toList());

            return ResponseEntity.ok().body(bookings);
        } catch (Error e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{bookingId}/approve")
    public ResponseEntity approveBooking(@PathVariable Long bookingId) {
        Booking booking = bookingRepository.findByIdWithPlaceNameAndUserName(bookingId).orElse(null);

        if (booking == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Booking doesn't exist"));
        }

        final Long placeId = booking.getPlaceId();

        Place place = placeRepository.findById(placeId).orElse(null);

        if (place == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Place does't exist"));
        }

        final int countFreePlaces = place.getCountFreePlaces();

        if (countFreePlaces == 0) {
            return ResponseEntity.ok().body(new ApiResponse(true, "It hasn't free places"));
        }

        place.decrementFreePlaces();
        placeRepository.save(place);

        booking.setStatus(1);
        bookingRepository.save(booking);

        User user = userRepository.findById(booking.getUserId()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "User doesn't exist"));
        }

        try {
            userService.sendBookingConfirmation(user, booking);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }

        return ResponseEntity.ok().body(new ApiResponse(false,
                "Booking has been approved successfully"));
    }

    @DeleteMapping("/{bookingId}/reject")
    public ResponseEntity rejectBooking(@PathVariable Long bookingId) {
        Booking booking = bookingRepository.findByIdWithPlaceNameAndUserName(bookingId).orElse(null);

        if (booking == null) {
            return new ResponseEntity(new ApiResponse(false, "Booking doesn't exist"),
                HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findById(booking.getUserId()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "User doesn't exist"));
        }

        try {
            userService.sendBookingReject(user, booking);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }

        bookingRepository.delete(booking);

        return ResponseEntity.ok().body(bookingId);
    }
}
