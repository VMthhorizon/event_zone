package vincenzomola.event_zone.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vincenzomola.event_zone.entities.Event;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

    // Restituisce solo gli eventi con data maggiore o uguale a quella fornita
    Page<Event> findByEventDateGreaterThanEqual(LocalDateTime date, Pageable pageable);

    // Query per restituire la lista degli eventi in base all'organizer
    List<Event> findByOrganizerId(UUID userId);
}
