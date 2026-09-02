package vincenzomola.event_zone.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.payloads.UserChangePassDTO;
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

    // Endpoint per modificare la password dell'account dello User
    @PatchMapping("/me/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changeUserPassword(@AuthenticationPrincipal User loggedUser,
                                   @Valid @RequestBody UserChangePassDTO body) {
        userService.changeUserPass(loggedUser, body);
    }

    // Endpoint per l'hard delete dell'account dello user
    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAccount(@AuthenticationPrincipal User loggedUser) {
        userService.hardDeleteUserAccount(loggedUser);
    }
}
