package vincenzomola.event_zone.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vincenzomola.event_zone.entities.Event;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.payloads.EventDTO;
import vincenzomola.event_zone.payloads.EventResponseDTO;
import vincenzomola.event_zone.services.EventService;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // Endpoint per la creazione dell'evento
    @PostMapping
    @PreAuthorize("hasAuthority('ORGANIZER')")
    @ResponseStatus(HttpStatus.CREATED)
    public EventResponseDTO createEvent(@RequestBody @Valid EventDTO body,
                                        @AuthenticationPrincipal User loggedOrganizer) {
        Event event = eventService.createEvent(body, loggedOrganizer);

        return new EventResponseDTO(event.getId(), LocalDateTime.now());
    }

}
