package vincenzomola.event_zone.services;

import org.springframework.stereotype.Service;
import vincenzomola.event_zone.repositories.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
}
