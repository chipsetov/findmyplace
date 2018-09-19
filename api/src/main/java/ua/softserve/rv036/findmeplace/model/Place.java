package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import javax.persistence.*;
import java.sql.Time;

@Data
@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "open")
    private Time open;

    @Column(name = "close")
    private Time close;

    @Column(name = "count_free_places")
    private int countFreePlaces;

    @Column(name = "place_type_id")
    private Long placeTypeId;

    @Column(name = "owner_id")
    private Long ownerId;

}
