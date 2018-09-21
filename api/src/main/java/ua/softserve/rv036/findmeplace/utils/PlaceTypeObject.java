package ua.softserve.rv036.findmeplace.utils;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PlaceTypeObject {
    @NotBlank
    private Boolean hotel;

    @NotBlank
    private Boolean parking;

    @NotBlank
    private Boolean restaurant;
}
