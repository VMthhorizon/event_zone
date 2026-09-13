package vincenzomola.event_zone.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ResetPasswordDTO(
        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Inserisci un indirizzo email valido")
        String email,
        @NotBlank(message = "Il codice OTP è obbligatorio")
        @Size(min = 6, max = 6, message = "Il codice OTP deve essere di 6 cifre")
        String otp,
        @NotBlank(message = "Il campo della password non può essere vuoto")
        @Size(min = 8, message = "La password deve contenere almeno 8 caratteri")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&_\\-#])[A-Za-z\\d@$!%*?&_\\-#]+$",
                message = "La password deve contenere almeno una lettera, un numero e un carattere speciale " +
                        "(@$!%*?&_-#)"
        )
        String password
) {
}
