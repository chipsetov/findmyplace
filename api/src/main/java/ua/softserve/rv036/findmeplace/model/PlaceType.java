package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.PlaceTypeName;
import javax.persistence.*;

@Data
@Entity
@Table(name = "place_types")
public class PlaceType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private PlaceTypeName placeTypeName;

}