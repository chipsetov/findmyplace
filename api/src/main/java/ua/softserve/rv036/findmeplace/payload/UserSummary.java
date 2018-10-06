package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;

@Data
public class UserSummary {
    private Long id;
    private String username;
    private String role;

    public UserSummary(Long id, String username, String role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }
}



