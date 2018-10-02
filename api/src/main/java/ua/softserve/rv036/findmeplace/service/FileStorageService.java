package ua.softserve.rv036.findmeplace.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private Path fileStorageLocation;// = Paths.get("./uploads");

    public FileStorageService() throws IOException {

        //To handle exception
        Files.createDirectories(this.fileStorageLocation);
    }

    public String storeFile(MultipartFile file, String pathFolder) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (file.isEmpty()) {
                //Throw exception
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.fileStorageLocation.resolve(pathFolder + fileName), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            // Catch exception /failed to store
        }


        return fileName;
    }

}
