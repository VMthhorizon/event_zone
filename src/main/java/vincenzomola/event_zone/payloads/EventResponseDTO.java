package vincenzomola.event_zone.payloads;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventResponseDTO(UUID eventId, LocalDateTime timestamp) {
}
