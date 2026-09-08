package vincenzomola.event_zone.payloads;

import vincenzomola.event_zone.entities.Event;

public record EventTicketDTO(
        Event event,
        int quantity
) {
}
