package vincenzomola.event_zone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vincenzomola.event_zone.entities.Ticket;

import java.util.List;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    @Query("SELECT t FROM Ticket t LEFT JOIN FETCH t.event WHERE t.order.id = :orderId")
    List<Ticket> findByOrderId(@Param("orderId") UUID id);
}
