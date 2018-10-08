package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.BookingStatus;

import javax.persistence.*;

@Data
@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "place_id")
    private Long placeId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "status")
    private int status;

    private String placeName;

    public Booking(Long userId, Long placeId) {
        this.userId = userId;
        this.placeId = placeId;
        this.status = 0;
    }

    public Booking(Long id, Long userId, Long placeId, int status, String placeName) {
        this.id = id;
        this.userId = userId;
        this.placeId = placeId;
        this.status = status;
        this.placeName = placeName;
    }

    public boolean isClosed() {
        return this.status == 2;
    }
}
