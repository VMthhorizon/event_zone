package vincenzomola.event_zone.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.exceptions.UnauthorizedException;

import java.util.Date;

@Component
public class JWTTools {

    // Tramite dependency injection ottengo il segreto
    private final String secret;

    public JWTTools(@Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }

    // Creo il metodo verify token per controllare l'integrità di esso tramite il secret
    public void VerifyToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build()
                    .parse(token);

        } catch (Exception e) {
            throw new UnauthorizedException("Token non valido");
        }
    }

    // Creo il token
    public String GenerateToken(User user) {

        return Jwts.builder()
                .subject(user.getId()
                        .toString())
                .claim("email", user.getEmail())
                .claim("role", user.getUserRole()
                        .name())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }

    // Metodo per ottenere il subject (in questo caso la email dell'utente) per autenticare lo user
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
