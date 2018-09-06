package ua.softserve.rv036.findmeplace.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;

@Entity
@Table(name = "Places")
public class Place {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private Integer countFreePlaces;

    @NotNull
    private String name;
    @NotNull
    private String address;
    @NotNull
    private String description;
    @NotNull
    private Time open;
    @NotNull
    private Time close;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private PlaceType placeType;

    //@NotNull
    //@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    //private User owner;

    public Place() {}

    public Place(String name,
                 PlaceType placeType,
                 String address,
                 String description,
                 Integer countFreePlaces,
                 Time open,
                 Time close) {

        this.name = name;
        this.placeType = placeType;
        this.address = address;
        this.description = description;
        this.countFreePlaces = countFreePlaces;
        this.open = open;
        this.close = close;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PlaceType getPlaceType() {
        return placeType;
    }

    public void setPlaceType(PlaceType placeType) {
        this.placeType = placeType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCountFreePlaces() {
        return countFreePlaces;
    }

    public void setCountFreePlaces(Integer countFreePlaces) {
        this.countFreePlaces = countFreePlaces;
    }

    public Time getOpen() {
        return open;
    }

    public void setOpen(Time open) {
        this.open = open;
    }

    public Time getClose() {
        return close;
    }

    public void setClose(Time close) {
        this.close = close;
    }
}
