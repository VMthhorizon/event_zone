package vincenzomola.event_zone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class EventZoneApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventZoneApplication.class, args);
    }

}
