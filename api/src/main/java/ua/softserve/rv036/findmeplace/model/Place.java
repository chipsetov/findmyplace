package ua.softserve.rv036.findmeplace.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Time;

@Data
@Entity
@Table(name = "Places")
public class Place {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private Integer countFreePlaces;

    @NotBlank
    private String name;
    @NotBlank
    private String address;
    @NotBlank
    private String description;
    @NotNull
    private Time open;
    @NotNull
    private Time close;

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;
//    @NotNull
//    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private PlaceType placeType;

    //@NotNull
    //@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    //private User owner;
}
