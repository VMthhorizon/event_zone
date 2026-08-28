package vincenzomola.event_zone.payloads;

import java.time.LocalDateTime;

public record UserLoginResponseDTO(String token, LocalDateTime timestamp) {
}
