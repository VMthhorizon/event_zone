package vincenzomola.event_zone.services;

import jakarta.transaction.Transactional;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import vincenzomola.event_zone.entities.*;
import vincenzomola.event_zone.enums.OrderState;
import vincenzomola.event_zone.exceptions.BadRequestException;
import vincenzomola.event_zone.exceptions.NotFoundException;
import vincenzomola.event_zone.payloads.EventTicketPair;
import vincenzomola.event_zone.payloads.OrderDTO;
import vincenzomola.event_zone.payloads.TicketRequestDTO;
import vincenzomola.event_zone.repositories.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final WalletService walletService;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, TicketRepository ticketRepository,
                        EventRepository eventRepository, WalletService walletService,
                        WalletRepository walletRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
        this.walletService = walletService;
        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order checkout(User userFromToken, OrderDTO body) {

        // 1. Recupera l'utente reale dal DB (Managed Entity)
        User user = userRepository.findById(userFromToken.getId())
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        // 2. Recupera il wallet dell'utente
        Wallet wallet = walletService.findWalletByUser(user);

        double totalOrderPrice = 0.0;
        List<EventTicketPair> itemsToProcess = new ArrayList<>();

        // 3. Prima fase: validazione posti e calcolo del totale
        for (TicketRequestDTO item : body.tickets()) {
            Event event = eventRepository.findById(item.eventId())
                    .orElseThrow(() -> new NotFoundException("Evento non trovato con ID: " + item.eventId()));

            if (event.getAvailableSeats() < item.quantity()) {
                throw new BadRequestException("Posti non disponibili per l'evento: " + event.getTitle());
            }

            totalOrderPrice += event.getPrice() * item.quantity();
            itemsToProcess.add(new EventTicketPair(event, item.quantity()));
        }

        // 4. Verifica saldo del Wallet
        if (wallet.getBalance() < totalOrderPrice) {
            throw new BadRequestException("Saldo insufficiente nel wallet per completare l'acquisto");
        }

        // 5. Scalo il saldo dal Wallet
        wallet.setBalance(wallet.getBalance() - totalOrderPrice);
        walletRepository.save(wallet);

        // 6. Crea l'ordine associando l'utente gestito dal DB
        Order order = new Order(totalOrderPrice, OrderState.CONFIRMED, user);
        Order savedOrder = orderRepository.save(order);

        // 7. Seconda fase: scalato posti e generazione biglietti
        for (EventTicketPair pair : itemsToProcess) {
            Event event = pair.event();
            int quantity = pair.quantity();

            // Riduci i posti disponibili sull'entità già recuperata
            event.setAvailableSeats(event.getAvailableSeats() - quantity);
            eventRepository.save(event);

            // Genera i singoli biglietti
            for (int i = 0; i < quantity; i++) {
                Ticket ticket = new Ticket(event.getPrice(), event, savedOrder);
                ticketRepository.save(ticket);
            }
        }

        return savedOrder;
    }

    public List<Order> getMyOrders(User user) {
        return orderRepository.findByUserIdOrderByCreationDateDesc(user.getId());
    }
}
