package vincenzomola.event_zone.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserChangePassDTO(
        @NotBlank(message = "Il campo faffa non può essere vuoto")
        String oldPass,
        @NotBlank(message = "Il campo lollo non può essere vuoto")
        @Size(min = 8, message = "La password deve contenere almeno 8 caratteri")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&_\\-#])[A-Za-z\\d@$!%*?&_\\-#]+$",
                message = "La password deve contenere almeno una lettera, un numero e un carattere speciale " +
                        "(@$!%*?&_-#)"
        )
        String newPass) {
}
