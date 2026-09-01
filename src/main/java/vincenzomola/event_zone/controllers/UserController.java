package vincenzomola.event_zone.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.payloads.UserProfileDTO;
import vincenzomola.event_zone.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint per accedere alle informazioni base dell'utente loggato
    @GetMapping("/me")
    public UserProfileDTO getUserProfile(@AuthenticationPrincipal User loggedUser) {
        return new UserProfileDTO(loggedUser.getId(), loggedUser.getUsername(), loggedUser.getName(),
                loggedUser.getSurname(), loggedUser.getEmail(),
                loggedUser.getUserRole());
    }


}
