package vincenzomola.event_zone.entities;

import jakarta.persistence.*;
import vincenzomola.event_zone.enums.EventType;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Events")
public class Event {

    @Id
    @GeneratedValue
    @Column(name = "id_event")
    private UUID id;
    @Enumerated(EnumType.STRING)
    private EventType eventType;
    private String title;
    private String description;
    private String place;
    @Column(name = "event_date")
    private LocalDateTime eventDate;
    @Column(name = "total_seats")
    private int totalSeats;
    @Column(name = "available_seats")
    private int availableSeats;
    private double price;
    private double longitude;
    private double latitude;
    private String img;
    @ManyToOne
    @JoinColumn(name = "id_organizer")
    private User organizer;

    protected Event() {
    }

    public Event(EventType eventType, User organizer, String img, double latitude, double longitude, String title,
                 String description, String place, LocalDateTime eventDate, int totalSeats, int availableSeats,
                 double price) {
        this.eventType = eventType;
        this.organizer = organizer;
        this.img = img;
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
        this.description = description;
        this.place = place;
        this.eventDate = eventDate;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getImg() {
        return img;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventType=" + eventType +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", place='" + place + '\'' +
                ", eventDate=" + eventDate +
                ", totalSeats=" + totalSeats +
                ", availableSeats=" + availableSeats +
                ", price=" + price +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", img='" + img + '\'' +
                '}';
    }
}
