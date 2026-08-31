package vincenzomola.event_zone.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vincenzomola.event_zone.payloads.UserProfileDTO;
import vincenzomola.event_zone.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint accesibile SOLO dall'ADMIN, per ricevere la lista di tutti gli utenti registrati
    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UserProfileDTO> getAllUsers() {
        return userService.getAllUsers();
    }
}
