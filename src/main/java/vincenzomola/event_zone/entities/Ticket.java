package vincenzomola.event_zone.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "Tickets")
public class Ticket {

    @Id
    @GeneratedValue
    private UUID id;
    @Column(name = "event_price")
    private double eventPrice;
    @ManyToOne
    @JoinColumn(name = "id_event")
    private Event event;
    @ManyToOne
    @JoinColumn(name = "id_order")
    private Order order;

    protected Ticket() {
    }

    public Ticket(double eventPrice, Event event, Order order) {
        this.eventPrice = eventPrice;
        this.event = event;
        this.order = order;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + id +
                ", eventPrice=" + eventPrice +
                ", event=" + event +
                ", order=" + order +
                '}';
    }
}
