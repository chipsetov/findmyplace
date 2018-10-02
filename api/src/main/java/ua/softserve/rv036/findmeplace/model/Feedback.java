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

    @Column(name = "owner_id")
    private Long ownerId;

    private String ownerNickName;

    @Column(name = "place_id")
    private Long placeId;

}
