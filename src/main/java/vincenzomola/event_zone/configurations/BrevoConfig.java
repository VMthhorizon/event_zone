package vincenzomola.event_zone.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class BrevoConfig {

    @Bean
    public RestClient restClient() {
        return RestClient.builder()
                .build();
    }
}
