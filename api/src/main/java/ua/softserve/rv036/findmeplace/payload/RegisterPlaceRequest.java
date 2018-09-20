package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.PlaceType;

import javax.validation.constraints.NotBlank;
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

    //@NotBlank
    Time openTime;

    //@NotBlank
    Time closeTime;

    //@NotBlank
    PlaceType placeType;
}
