package ua.softserve.rv036.findmeplace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.BanStatusType;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "ban_statuses")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BanStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private BanStatusType banStatusType;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "banStatus", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<User> users;

}
