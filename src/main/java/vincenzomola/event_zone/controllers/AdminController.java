package vincenzomola.event_zone.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vincenzomola.event_zone.payloads.UserProfileDTO;
import vincenzomola.event_zone.payloads.UserRoleDTO;
import vincenzomola.event_zone.services.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint accessibile SOLO dall'ADMIN, per ricevere la lista di tutti gli utenti registrati
    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UserProfileDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint accessibile SOLO all'Admin per poter modificare i ruoli il ruolo degli User
    @PatchMapping("/{userId}/role")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public UserProfileDTO changeUserRole(@PathVariable UUID userId, @RequestBody UserRoleDTO role) {
        return userService.changeUserRole(userId, role.role());
    }
}
