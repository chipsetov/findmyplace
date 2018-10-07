package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.BookingStatus;

import javax.persistence.*;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "place_id")
    private Long placeId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "status")
    private BookingStatus status;

    public Booking(Long userId, Long placeId) {
        this.userId = userId;
        this.placeId = placeId;
        this.status = BookingStatus.OPEN;
    }

    public Booking(Long id, Long userId, Long placeId, BookingStatus status) {
        this.id = id;
        this.userId = userId;
        this.placeId = placeId;
        this.status = status;
    }
}
