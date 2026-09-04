package vincenzomola.event_zone.payloads;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record OrderDTO(
        @NotEmpty(message = "Il campo non può essere vuoto")
        List<@Valid TicketRequestDTO> tickets
) {
}
