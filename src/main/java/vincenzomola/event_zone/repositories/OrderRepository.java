package vincenzomola.event_zone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vincenzomola.event_zone.entities.Order;
import vincenzomola.event_zone.entities.User;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.creationDate DESC")
    List<Order> findByUserIdOrderByCreationDateDesc(@Param("userId") UUID userId);
}
