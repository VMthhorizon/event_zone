package vincenzomola.event_zone.payloads;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorsDTO(String message, List<String> errorList, LocalDateTime timestamp) {

    // Costruttore secondario per le exception che non richiedono la error list
    public ErrorsDTO(String message, LocalDateTime timestamp) {
        this(message, null, timestamp);
    }
}
