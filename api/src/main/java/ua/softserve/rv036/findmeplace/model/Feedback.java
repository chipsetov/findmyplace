package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "mark")
    private Integer mark;

    @Column(name = "user_id")
    private Long feedbackOwnerId;

    @Column(name = "place_id")
    private Long placeId;

}
