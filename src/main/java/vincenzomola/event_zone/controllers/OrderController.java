package vincenzomola.event_zone.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vincenzomola.event_zone.entities.Order;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.payloads.OrderDTO;
import vincenzomola.event_zone.services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Endpoint per effettuare il pagamento
    @PostMapping("/checkout")
    @ResponseStatus(HttpStatus.CREATED)
    public Order createOrder(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid OrderDTO body) {
        return orderService.checkout(user, body);
    }

    // Endpoint per recuperare la cronologia degli ordini
    @GetMapping("/me")
    public List<Order> getMyOrders(@AuthenticationPrincipal User user) {
        return orderService.getMyOrders(user);
    }

}
