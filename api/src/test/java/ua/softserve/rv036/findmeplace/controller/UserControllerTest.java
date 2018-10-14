package ua.softserve.rv036.findmeplace.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(secure = false)
public class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserController userController;

    @Test
    public void deleteUserById() throws Exception {
        mvc.perform(delete("/user/delete/{id}", 1L))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUserPlaceById() throws Exception {
        mvc.perform(delete("/user/delete-place/{id}", 1L))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUserFeedbackById() throws Exception {
        mvc.perform(delete("/user/delete-feedback/{id}", 1L))
                .andExpect(status().isOk());
    }

}
