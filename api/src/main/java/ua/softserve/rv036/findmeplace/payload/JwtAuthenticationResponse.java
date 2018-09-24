package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;
import ua.softserve.rv036.findmeplace.model.enums.RoleType;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private RoleType roles;

    public JwtAuthenticationResponse(String accessToken, RoleType roles) {
        this.accessToken = accessToken;
        this.roles = roles;
    }
}