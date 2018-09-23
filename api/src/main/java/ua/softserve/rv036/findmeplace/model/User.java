package ua.softserve.rv036.findmeplace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import ua.softserve.rv036.findmeplace.model.audit.DateAudit;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User extends DateAudit {

    public User(@NotBlank @Email String email, @NotBlank String nickName, @NotBlank String password) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @NotBlank
    @Column(name = "nick_name")
    private String nickName;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "ban_status")
    @Enumerated(EnumType.STRING)
    private BanStatus banStatus;

    @JsonIgnore
    @OneToMany(mappedBy = "ownerId", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Place> places;

    @JsonIgnore
    @OneToMany(mappedBy = "feedbackOwner", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Feedback> feedbacks;

}
