package vincenzomola.event_zone.payloads;

import jakarta.validation.constraints.*;
import vincenzomola.event_zone.enums.UserRole;

public record UserRegisterDTO(
        @NotBlank(message = "Il campo username non può essere vuoto")
        @Size(max = 20, message = "L'username non può avere piu di 20 caratteri")
        String username,
        @NotBlank(message = "Il nome non può essere vuoto")
        @Size(min = 4, max = 20, message = "Il nome non può avere meno di 4 e piu di 20 caratteri")
        @Pattern(regexp = "^[a-zA-ZàèéìòùÁÉÍÓÚàèéìòù \\\\'-]+$", message = "Il nome non può contenere caratteri " +
                "speciali o numeri")
        String nome,
        @NotBlank(message = "Il cognome non può essere vuoto")
        @Size(min = 4, max = 20, message = "Il cognome non può avere meno di 4 e piu di 20 caratteri")
        @Pattern(regexp = "^[a-zA-ZàèéìòùÁÉÍÓÚàèéìòù \\\\'-]+$", message = "Il cognome non può contenere caratteri " +
                "speciali o numeri")
        String cognome,
        @NotBlank(message = "Il campo email non può essere vuoto")
        @Email
        String email,
        @NotBlank(message = "Il campo della password non può essere vuoto")
        @Size(min = 8, message = "La password deve contenere almeno 8 caratteri")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&_\\-#])[A-Za-z\\d@$!%*?&_\\-#]+$",
                message = "La password deve contenere almeno una lettera, un numero e un carattere speciale " +
                        "(@$!%*?&_-#)"
        )
        String password,
        UserRole userRole
) {
}
