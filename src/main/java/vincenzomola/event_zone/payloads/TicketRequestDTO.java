package vincenzomola.event_zone.payloads;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TicketRequestDTO(
        @NotNull(message = "Il campo non può essere vuoto")
        UUID eventId,
        @Min(1)
        int quantity
) {
}
