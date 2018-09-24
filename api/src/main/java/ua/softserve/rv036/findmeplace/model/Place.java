package ua.softserve.rv036.findmeplace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.sql.Time;
import java.util.Set;

@Data
@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
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

    @Enumerated(EnumType.STRING)
    @Column(name = "place_type")
    private PlaceType placeType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id", nullable = false)
    private User ownerId;

    @JsonIgnore
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Feedback> feedbacks;

}
