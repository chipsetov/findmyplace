package ua.softserve.rv036.findmeplace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.PlaceTypeName;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "place_types")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PlaceType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private PlaceTypeName placeTypeName;

    @JsonIgnore
    @OneToMany(mappedBy = "placeType", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Place> places;

}