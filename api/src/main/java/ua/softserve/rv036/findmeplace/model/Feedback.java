package ua.softserve.rv036.findmeplace.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "mark")
    private Integer mark;

    @Column(name = "user_id")
    private Long userId;

    private String userName;

    @Column(name = "place_id")
    private Long placeId;

}
