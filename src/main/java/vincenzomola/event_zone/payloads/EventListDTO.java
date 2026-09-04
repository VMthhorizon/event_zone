package vincenzomola.event_zone.payloads;

import org.springframework.cglib.core.Local;
import vincenzomola.event_zone.enums.EventType;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventListDTO(
        UUID eventId,
        EventType eventType,
        String title,
        String description,
        String place,
        LocalDateTime eventDate,
        Integer totalSeats,
        Double price,
        Double longitude,
        Double latitude,
        String img
) {
}
