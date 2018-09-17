package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;
import java.util.Set;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Set<String> roles;

    public JwtAuthenticationResponse(String accessToken, Set<String> roles) {
        this.accessToken = accessToken;
        this.roles = roles;
    }
}