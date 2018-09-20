package ua.softserve.rv036.findmeplace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import ua.softserve.rv036.findmeplace.model.audit.DateAudit;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "Users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"nick_name"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "f_name")
    private String firstName;


    @Column(name = "l_name")
    private String lastName;


    private String phone;

    @NaturalId
    @NotBlank
    private String email;

    @NotBlank
    @Column(name = "nick_name")
    private String nickName;

    @NotBlank
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "status")
    private BanStatus banStatus;


    public User(@NotBlank String firstName, @NotBlank String lastName, @NotBlank @Email String email, @NotBlank String nickName, @NotBlank String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.nickName = nickName;
        this.password = password;
    }
}
