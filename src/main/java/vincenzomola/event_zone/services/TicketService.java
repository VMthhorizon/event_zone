package vincenzomola.event_zone.services;

import org.springframework.stereotype.Service;
import vincenzomola.event_zone.entities.Ticket;
import vincenzomola.event_zone.repositories.TicketRepository;

import java.util.List;
import java.util.UUID;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
}
