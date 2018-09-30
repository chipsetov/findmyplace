package ua.softserve.rv036.findmeplace.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import ua.softserve.rv036.findmeplace.model.Place;
import ua.softserve.rv036.findmeplace.model.enums.PlaceType;
import ua.softserve.rv036.findmeplace.utils.TestUtil;

import java.sql.Time;
import java.time.LocalTime;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc(secure = false)
@WebMvcTest(PlaceController.class)
public class PlaceControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PlaceController placeController;

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void registerPlace() throws Exception {
        //ObjectMapper objectMapper = new ObjectMapper();
        String placeQuery = "{\"name\":\"Test\"," +
                "\"address\":\"LA\"," +
                "\"open\":\"08:00:00\"," +
                "\"close\":\"18:00:00\"," +
                "\"placeType\":\"CAFE\"," +
                "\"description\":\"errtert\"," +
                "\"longitude\":26.2493254," +
                "\"latitude\":50.6219427," +
                "\"ownerId\":\"3\"}";

        mvc.perform(post("/places/register")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(placeQuery))
                .andExpect(status().isOk());
    }
}