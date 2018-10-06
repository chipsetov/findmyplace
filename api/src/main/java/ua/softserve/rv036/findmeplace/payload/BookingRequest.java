package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;

@Data
public class BookingRequest {
    private Long userId;
    private Long placeId;
}
