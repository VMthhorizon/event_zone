package vincenzomola.event_zone.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.exceptions.ValidationException;
import vincenzomola.event_zone.payloads.UserLoginRequestDTO;
import vincenzomola.event_zone.payloads.UserLoginResponseDTO;
import vincenzomola.event_zone.payloads.UserRegisterDTO;
import vincenzomola.event_zone.payloads.UserRegisterResponseDTO;
import vincenzomola.event_zone.services.UserService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint per la registrazione degli user accessibile solo agli ADMIN. Ogni user creato sarà di default un
    // CUSTOMER
    @PostMapping("/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRegisterResponseDTO createAccount(@Valid @RequestBody UserRegisterDTO body) {

        User user = this.userService.createAccount(body);

        return new UserRegisterResponseDTO(user.getId(), LocalDateTime.now());
    }

    // endpoint di Login dello USER
    @PostMapping("/login")
    public UserLoginResponseDTO loginUser(@Valid @RequestBody UserLoginRequestDTO body,
                                          @AuthenticationPrincipal User currentUser, BindingResult validatedResult) {

        return new UserLoginResponseDTO(this.userService.checkEmailPassUser(body), LocalDateTime.now());
    }
}
