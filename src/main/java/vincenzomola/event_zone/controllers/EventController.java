package vincenzomola.event_zone.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vincenzomola.event_zone.entities.Event;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.payloads.EventDTO;
import vincenzomola.event_zone.payloads.EventImgDTO;
import vincenzomola.event_zone.payloads.EventListDTO;
import vincenzomola.event_zone.payloads.EventResponseDTO;
import vincenzomola.event_zone.services.EventService;

import java.time.LocalDateTime;
import java.util.List;

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

    // Endpoint per l'upload dell'immagine dell'evento
    @PostMapping("/img")
    @PreAuthorize("hasAuthority('ORGANIZER')")
    @ResponseStatus(HttpStatus.OK)
    public EventImgDTO uploadImg(@RequestParam("img") MultipartFile file) {
        return new EventImgDTO(eventService.uploadEventImage(file));
    }

    // Endpoint per ottenere la lista di TUTTI gli eventi
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<EventListDTO> allEventsList() {
        return eventService.findAllEvents();
    }

}
