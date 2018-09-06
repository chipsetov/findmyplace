package ua.softserve.rv036.findmeplace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
//@RestController
public class Run {

   /* @RequestMapping("/")
    public String init(){
        return "HELLO JAVA WORLD!";
    }*/

	public static void main(String[] args) {
		SpringApplication.run(Run.class, args);
	}
}
