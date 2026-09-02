package vincenzomola.event_zone.services;

import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vincenzomola.event_zone.entities.Event;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.enums.UserRole;
import vincenzomola.event_zone.exceptions.BadRequestException;
import vincenzomola.event_zone.exceptions.NotFoundException;
import vincenzomola.event_zone.exceptions.UnauthorizedException;
import vincenzomola.event_zone.payloads.UserChangePassDTO;
import vincenzomola.event_zone.payloads.UserLoginRequestDTO;
import vincenzomola.event_zone.payloads.UserProfileDTO;
import vincenzomola.event_zone.payloads.UserRegisterDTO;
import vincenzomola.event_zone.repositories.UserRepository;
import vincenzomola.event_zone.security.JWTTools;

import java.util.List;
import java.util.UUID;

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

    @Transactional
    public User createAccount(UserRegisterDTO body) {
        return userRepository.save(new User(body.username(), body.nome(), body.cognome(), body.email(),
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

    public List<UserProfileDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserProfileDTO(user.getId(), user.getUsername(), user.getName(), user.getSurname(),
                        user.getEmail(), user.getUserRole()))
                .toList();
    }

    public User findUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utente con id : " + userId + " non trovato"));
    }

    @Transactional
    public UserProfileDTO changeUserRole(UUID userId, UserRole role) {
        // Cerco lo user tramite lo UUID nel database
        User userDb = findUserById(userId);

        // Cambio il ruolo dello user corrispondente all'UUID
        userDb.setUserRole(role);

        // Salvo l'utente con il ruolo modificato nel Database
        User updatedUser = userRepository.save(userDb);

        // Ritorno il DTO relativo allo User in modo da poterlo inviare come response al frontend
        return new UserProfileDTO(updatedUser.getId(), updatedUser.getUsername(), updatedUser.getName(),
                updatedUser.getSurname(),
                updatedUser.getEmail(), updatedUser.getUserRole());

    }

    @Transactional
    public void changeUserPass(User loggedUser, UserChangePassDTO body) {

        // Controllo se l'utente inserisce correttamente la password attuale per poterla cambiare
        if (!bcrypt.matches(body.oldPass(), loggedUser.getPassword())) {
            throw new BadRequestException("La password attuale non è corretta");
        }

        // Cripto la nuova password
        String newPass = bcrypt.encode(body.newPass());

        // Imposto la nuova password all'utente
        loggedUser.setPassword(newPass);

        // Salvo l'utente con la nuova password nel db
        userRepository.save(loggedUser);

    }

    // Hard delete dell'account
    @Transactional
    public void hardDeleteUserAccount(User currentUser) {
        userRepository.delete(currentUser);
    }
}
