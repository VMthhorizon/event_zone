package vincenzomola.event_zone.entities;

import jakarta.persistence.*;
import vincenzomola.event_zone.enums.OrderState;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Orders")
public class Order {

    @Id
    @GeneratedValue
    private UUID id;
    @Column(name = "total_price")
    private double totalPrice;
    @Enumerated(EnumType.STRING)
    @Column(name = "order_state")
    private OrderState orderState;
    @Column(name = "creation_date")
    private LocalDateTime creationDate;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();

    protected Order() {
    }

    public Order(double totalPrice, OrderState orderState, User user) {
        this.totalPrice = totalPrice;
        this.orderState = orderState;
        this.creationDate = LocalDateTime.now();
        this.user = user;
    }

    public Order(UUID id, LocalDateTime creationDate, double totalPrice, OrderState orderState) {
        this.id = id;
        this.creationDate = creationDate;
        this.totalPrice = totalPrice;
        this.orderState = orderState;
    }
}
