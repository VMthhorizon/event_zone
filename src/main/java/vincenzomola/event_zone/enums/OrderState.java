package vincenzomola.event_zone.enums;

import com.fasterxml.jackson.annotation.JsonAlias;

public enum OrderState {
    @JsonAlias({"CONFIRMED", "confirmed"})
    CONFIRMED,
    @JsonAlias({"CANCELLED", "cancelled"})
    CANCELLED
}
