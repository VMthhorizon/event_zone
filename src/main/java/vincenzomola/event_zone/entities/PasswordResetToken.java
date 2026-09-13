package vincenzomola.event_zone.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "password_reset_token")
public class PasswordResetToken {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String token;

    @OneToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    protected PasswordResetToken() {
    }

    public PasswordResetToken(String token, User user, int durationInMinutes) {
        this.token = token;
        this.user = user;
        this.expiryDate = LocalDateTime.now()
                .plusMinutes(durationInMinutes);
    }

    public boolean isExpired() {
        return LocalDateTime.now()
                .isAfter(this.expiryDate);
    }
}
