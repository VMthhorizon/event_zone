package vincenzomola.event_zone.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import vincenzomola.event_zone.entities.PasswordResetToken;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.exceptions.NotFoundException;
import vincenzomola.event_zone.repositories.PasswordResetTokenRepository;
import vincenzomola.event_zone.repositories.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class PasswordResetTokenService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder bcrypt;
    private final String senderEmail;
    private final String brevoApiKey;
    private final String brevoApiUrl;
    private final RestClient restClient;

    public PasswordResetTokenService(UserRepository userRepository,
                                     PasswordResetTokenRepository passwordResetTokenRepository,
                                     JavaMailSender mailSender, PasswordEncoder bcrypt,
                                     @Value("${app.mail.sender}") String senderEmail,
                                     @Value("${brevo.api.key}") String brevoApiKey,
                                     @Value("${brevo.api.url}") String brevoApiUrl, RestClient restClient) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.bcrypt = bcrypt;
        this.senderEmail = senderEmail;
        this.brevoApiKey = brevoApiKey;
        this.brevoApiUrl = brevoApiUrl;
        this.restClient = restClient;
    }


    @Transactional
    public void createAndSendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Nessun utente trovato con email: " + email));

        passwordResetTokenRepository.deleteByUser(user);
        passwordResetTokenRepository.flush();

        String otp = String.format("%06d", new Random().nextInt(900000) + 100000);

        PasswordResetToken resetToken = new PasswordResetToken(otp, user, 10);
        passwordResetTokenRepository.save(resetToken);


        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(user.getEmail());
        message.setSubject("Codice OTP per il reset della password");
        message.setText("Inserisci questo codice OTP per modificare la password " + otp + " con scadenza di 10 minuti");

        this.sendBrevoEmailOtpAsync(user.getEmail(), otp);
    }

    @Async
    public void sendBrevoEmailOtpAsync(String otpRequestedEmail, String otp) {
        try {
            Map<String, Object> body = Map.of(
                    "sender", Map.of("email", senderEmail, "name", "EventZone"),
                    "to", List.of(Map.of("email", otpRequestedEmail)),
                    "subject", "Codice OTP per il reset della password",
                    "htmlContent",
                    "<p>Inserisci il codice OTP per modificare la password: <strong>" + otp + "</strong> (scadenza: " +
                            "10 minuti)</p>"
            );

            String response = restClient.post()
                    .uri(brevoApiUrl)
                    .header("api-key", brevoApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(String.class);

            System.out.println("Mail OTP inviata con successo");
        } catch (Exception e) {
            System.err.println("Errore nell'invio dell' email" + e.getMessage());
            e.printStackTrace();
        }

    }

    @Transactional
    public void resetPassword(String email, String otp, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        PasswordResetToken resetToken = passwordResetTokenRepository.findByTokenAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Codice OTP non valido"));

        if (resetToken.isExpired()) {
            throw new RuntimeException("il codice OTP è scafuto. Richiedine uno nuovo");
        }

        user.setPassword(this.bcrypt.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
    }

}
