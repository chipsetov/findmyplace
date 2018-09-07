package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Collection;

@Data
@Entity
@Table(name = "Users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"nick_name"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "f_name")
    private String firstName;

    @NotBlank
    @Column(name = "l_name")
    private String lastName;

    @NotBlank
    private String phone;

    @NaturalId
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Column(name = "nick_name")
    private String nickName;

    @NotBlank
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private BanStatus banStatus;

    @CreationTimestamp
    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @UpdateTimestamp
    @Column(name = "last_update_date")
    private LocalDateTime lastUpdateDate;
}
