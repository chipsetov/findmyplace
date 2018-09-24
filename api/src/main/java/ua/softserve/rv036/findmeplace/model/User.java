package ua.softserve.rv036.findmeplace.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.softserve.rv036.findmeplace.model.audit.DateAudit;
import ua.softserve.rv036.findmeplace.model.enums.BanStatusType;
import ua.softserve.rv036.findmeplace.model.enums.RoleType;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
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
    private RoleType role;

    @Column(name = "ban_status")
    @Enumerated(EnumType.STRING)
    private BanStatusType banStatus;

}
