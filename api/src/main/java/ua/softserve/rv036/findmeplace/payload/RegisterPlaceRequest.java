package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.PlaceType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Time;

@Data
public class RegisterPlaceRequest {

    @Size(min = 2, max = 255)
    String placeName;

    @Size(min = 2, max = 255)
    String address;

    @Size(min = 2, max = 255)
    String description;


    Time openTime;
    Time closeTime;

    PlaceType placeType;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;
}
