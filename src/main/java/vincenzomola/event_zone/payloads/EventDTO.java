package vincenzomola.event_zone.payloads;

import jakarta.validation.constraints.*;
import vincenzomola.event_zone.enums.EventType;

import java.time.LocalDateTime;

public record EventDTO(
        @NotNull(message = "Il campo delle categorie non può essere vuoto")
        EventType eventType,
        @NotBlank(message = "Il titolo non può essere vuoto")
        @Size(min = 4, max = 80, message = "Il titolo non può avere meno di 4 e piu di 80 caratteri")
        String title,
        @NotBlank(message = "La descrizione non può essere vuota")
        @Size(min = 4, max = 600, message = "La descrizione non può avere meno di 4 e piu di 600 caratteri")
        String description,
        @NotBlank(message = "Il luogo non può essere vuoto")
        @Size(min = 4, max = 30, message = "Il luogo non può avere meno di 4 e piu di 30 caratteri")
        @Pattern(regexp = "^[a-zA-ZàèéìòùÁÉÍÓÚàèéìòù \\\\'-]+$", message = "Il luogo non può contenere caratteri " +
                "speciali o numeri")
        String place,
        @NotNull(message = "La data dell'evento è obbligatoria")
        @Future(message = "La data dell'evento deve essere nel futuro")
        LocalDateTime eventDate,
        @NotNull(message = "Il numero totale di posti è obbligatorio")
        @Min(value = 1, message = "Deve esserci almeno 1 posto disponibile")
        Integer totalSeats,
        @NotNull(message = "Il prezzo è obbligatorio")
        @Min(value = 0, message = "Il prezzo non può essere negativo")
        Double price,
        @NotNull(message = "La longitudine è obbligatoria per la geolocalizzazione")
        Double longitude,
        @NotNull(message = "La latitudine è obbligatoria per la geolocalizzazione")
        Double latitude,
        @NotBlank(message = "Il campo dell'img non può essere vuoto")
        String img
) {
}
