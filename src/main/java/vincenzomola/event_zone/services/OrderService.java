package vincenzomola.event_zone.services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import vincenzomola.event_zone.entities.*;
import vincenzomola.event_zone.enums.OrderState;
import vincenzomola.event_zone.exceptions.BadRequestException;
import vincenzomola.event_zone.exceptions.NotFoundException;
import vincenzomola.event_zone.payloads.OrderDTO;
import vincenzomola.event_zone.payloads.TicketRequestDTO;
import vincenzomola.event_zone.repositories.EventRepository;
import vincenzomola.event_zone.repositories.OrderRepository;
import vincenzomola.event_zone.repositories.TicketRepository;
import vincenzomola.event_zone.repositories.WalletRepository;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final WalletService walletService;
    private final WalletRepository walletRepository;

    public OrderService(OrderRepository orderRepository, TicketRepository ticketRepository,
                        EventRepository eventRepository, WalletService walletService,
                        WalletRepository walletRepository) {
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
        this.walletService = walletService;
        this.walletRepository = walletRepository;
    }

    @Transactional
    public Order checkout(User user, OrderDTO body) {
        // Recupera il wallet dell'utente
        Wallet wallet = walletService.findWalletByUser(user);

        double totalOrderPrice = 0.0;

        // Calcola il totale e verifica disponibilità posti per ciascun evento
        for (TicketRequestDTO item : body.tickets()) {
            Event event = eventRepository.findById(item.eventId())
                    .orElseThrow(() -> new NotFoundException("Evento non trovato con ID: " + item.eventId()));

            if (event.getAvailableSeats() < item.quantity()) {
                throw new BadRequestException("Posti non disponibili per l'evento: " + event.getTitle());
            }

            totalOrderPrice += event.getPrice() * item.quantity();
        }

        // Verifica saldo del Wallet
        if (wallet.getBalance() < totalOrderPrice) {
            throw new BadRequestException("Saldo insufficiente");
        }

        // Detrae l'importo dal Wallet
        wallet.setBalance(wallet.getBalance() - totalOrderPrice);
        walletRepository.save(wallet);

        // Crea l'ordine
        Order order = new Order(totalOrderPrice, OrderState.CONFIRMED, user);
        Order savedOrder = orderRepository.save(order);

        // Genera i biglietti e aggiorna i posti disponibili negli eventi
        for (TicketRequestDTO item : body.tickets()) {
            Event event = eventRepository.findById(item.eventId())
                    .get();

            // Riduci posti disponibili
            event.setAvailableSeats(event.getAvailableSeats() - item.quantity());
            eventRepository.save(event);

            // Genera biglietti per la quantità richiesta
            for (int i = 0; i < item.quantity(); i++) {
                Ticket ticket = new Ticket(event.getPrice(), event, savedOrder);
                ticketRepository.save(ticket);
            }
        }

        return savedOrder;
    }

    public List<Order> getMyOrders(User user) {
        return orderRepository.findByUserOrderByCreationDateDesc(user);
    }
}
