package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String oldNickName;
    private String nickName;
    private String email;
    private String password;
}
