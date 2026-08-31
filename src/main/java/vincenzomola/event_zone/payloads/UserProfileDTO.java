package vincenzomola.event_zone.payloads;


import vincenzomola.event_zone.enums.UserRole;

import java.util.UUID;

public record UserProfileDTO(
        UUID id,
        String username,
        String email,
        UserRole role
) {
}
