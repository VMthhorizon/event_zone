package vincenzomola.event_zone.enums;

import com.fasterxml.jackson.annotation.JsonAlias;

public enum UserRole {
    @JsonAlias({"CUSTOMER", "customer"})
    CUSTOMER,
    @JsonAlias({"ORGANIZER", "organizer"})
    ORGANIZER,
    @JsonAlias({"ADMIN", "admin"})
    ADMIN
}
