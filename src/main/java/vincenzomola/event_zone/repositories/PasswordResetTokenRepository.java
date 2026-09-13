package vincenzomola.event_zone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vincenzomola.event_zone.entities.PasswordResetToken;
import vincenzomola.event_zone.entities.User;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

    Optional<PasswordResetToken> findByTokenAndUser(String token, User user);

    void deleteByUser(User user);
}
