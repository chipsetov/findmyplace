package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class FeedbackRequest {

    @NotBlank
    private String comment;

    @NotBlank
    private Long userId;

    @NotBlank
    private Long placeId;

    private Integer mark;
}
