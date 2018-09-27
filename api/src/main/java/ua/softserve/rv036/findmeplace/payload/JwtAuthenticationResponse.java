package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.Role;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Role roles;
    private Long userId;

    public JwtAuthenticationResponse(String accessToken, Role roles, Long userId) {
        this.accessToken = accessToken;
        this.roles = roles;
        this.userId = userId;
    }
}