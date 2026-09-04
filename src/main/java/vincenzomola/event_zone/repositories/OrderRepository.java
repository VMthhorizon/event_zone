package vincenzomola.event_zone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vincenzomola.event_zone.entities.Order;
import vincenzomola.event_zone.entities.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUserOrderByCreationDateDesc(User customer);
}
