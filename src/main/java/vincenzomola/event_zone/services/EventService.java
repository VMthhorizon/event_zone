package vincenzomola.event_zone.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vincenzomola.event_zone.entities.Event;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.exceptions.BadRequestException;
import vincenzomola.event_zone.exceptions.NotFoundException;
import vincenzomola.event_zone.payloads.EventDTO;
import vincenzomola.event_zone.repositories.EventRepository;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final Cloudinary fileUploader;

    public EventService(EventRepository eventRepository, Cloudinary fileUploader) {
        this.eventRepository = eventRepository;
        this.fileUploader = fileUploader;
    }

    // Creazione dell'evento e salvataggio nel DB
    @Transactional
    public Event createEvent(EventDTO body, User loggedOrganizer) {
        Event event = new Event(body.eventType(), loggedOrganizer, body.img(), body.latitude(), body.longitude(),
                body.title(),
                body.description(), body.place(), body.eventDate(), body.totalSeats(), body.totalSeats(), body.price());
        return eventRepository.save(event);
    }

    // Find Event tramite il suo id
    public Event findEventById(UUID eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Evento con id: " + eventId + " non trovato"));
    }

    // Upload img pic per l'Event
    public String uploadEventImage(MultipartFile file) {
        if (file.getSize() >= 10485760) throw new BadRequestException("L'immagine non può superare i 10MB");
        if (!(Objects.equals(file.getContentType(), "image/jpeg") || Objects.equals(file.getContentType(),
                "image/gif") || Objects.equals(file.getContentType(), "image/png") || Objects.equals(
                file.getContentType(), "image/webp")))
            throw new BadRequestException("Il file deve essere un img");
        try {
            Map<?, ?> uploadResult = fileUploader.uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("secure_url")
                    .toString();
        } catch (IOException e) {
            throw new RuntimeException("Errore durante il caricamento dell'immagine", e);
        }
    }

    // Modifica dell'img per l'evento
    @Transactional
    public Event updateEventImg(UUID eventId, MultipartFile file) {
        Event eventFromDb = findEventById(eventId);
        String urlImg = uploadEventImage(file);

        eventFromDb.setImg(urlImg);
        return eventRepository.save(eventFromDb);
    }

    // Find per TUTTI gli eventi nel DB
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    // Trova gli Eventi creati in base all'id fornito associato all'ORGANIZER
    public List<Event> findOrganizerEvents(UUID idOrganizer) {
        return eventRepository.findByOrganizerId(idOrganizer);
    }
}
