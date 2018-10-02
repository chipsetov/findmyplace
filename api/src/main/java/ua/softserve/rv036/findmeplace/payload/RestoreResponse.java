package ua.softserve.rv036.findmeplace.payload;

import lombok.Data;

@Data
public class RestoreResponse {
    private boolean readyForRestore;
    private String restoreCode;

    public RestoreResponse(boolean readyForRestore, String restoreCode) {
        this.readyForRestore = readyForRestore;
        this.restoreCode = restoreCode;
    }
}
