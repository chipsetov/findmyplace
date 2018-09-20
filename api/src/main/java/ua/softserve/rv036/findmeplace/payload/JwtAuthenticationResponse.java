package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.Role;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Role role;

    public JwtAuthenticationResponse(String accessToken, Role role) {
        this.accessToken = accessToken;
        this.role = role;
    }
}