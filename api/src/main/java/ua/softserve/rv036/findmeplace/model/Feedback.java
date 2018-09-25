package ua.softserve.rv036.findmeplace.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "Feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User feedbackOwner;

    @Column(name = "place_id")
    private Long placeId;

    @NotNull
    private Integer mark;

    private String comment;
}
