package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.RoleType;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<User> users;

}
