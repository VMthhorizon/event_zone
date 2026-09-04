package vincenzomola.event_zone.enums;

import com.fasterxml.jackson.annotation.JsonAlias;

public enum EventType {
    @JsonAlias({"CONCERTO", "concerto"})
    CONCERTO,
    @JsonAlias({"CINEMA", "cinema"})
    CINEMA,
    @JsonAlias({"FESTIVAL", "festival"})
    FESTIVAL,
    @JsonAlias({"TEATRO", "teatro"})
    TEATRO
}
