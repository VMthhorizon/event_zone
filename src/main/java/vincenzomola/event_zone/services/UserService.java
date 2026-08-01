package vincenzomola.event_zone.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.exceptions.NotFoundException;
import vincenzomola.event_zone.exceptions.UnauthorizedException;
import vincenzomola.event_zone.payloads.UserLoginRequestDTO;
import vincenzomola.event_zone.payloads.UserRegisterDTO;
import vincenzomola.event_zone.repositories.UserRepository;
import vincenzomola.event_zone.security.JWTTools;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JWTTools jwtTools;
    private final PasswordEncoder bcrypt;

    public UserService(UserRepository userRepository, JWTTools jwtTools, PasswordEncoder bcrypt) {
        this.userRepository = userRepository;
        this.jwtTools = jwtTools;
        this.bcrypt = bcrypt;
    }

    public User createAccount(UserRegisterDTO body) {
        return userRepository.save(new User(body.username(), body.name(), body.surname(), body.email(),
                this.bcrypt.encode(body.password())));
    }

    public User findUserbyEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente con email : " + email + " non trovato"));
    }

    public String checkEmailPassUser(UserLoginRequestDTO body) {
        String token;

        User userFromDb = findUserbyEmail(body.email());
        if (bcrypt.matches(body.password(), userFromDb.getPassword())) {
            token = jwtTools.GenerateToken(userFromDb.getEmail());
        } else {
            throw new UnauthorizedException("Password o email errata");

        }
        return token;
    }
}
