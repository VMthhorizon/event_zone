package vincenzomola.event_zone.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.enums.UserRole;
import vincenzomola.event_zone.exceptions.UnauthorizedException;
import vincenzomola.event_zone.services.UserService;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    private final JWTTools tools;
    private final UserService userService;

    public JWTAuthFilter(JWTTools tools, UserService userService) {
        this.tools = tools;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Prendo il token dalla request
        String authToken = request.getHeader("Authorization");

        // Controllo se è presente e se inizia con Bearer
        if (authToken == null || !authToken.startsWith("Bearer ")) {
            throw new UnauthorizedException("Token non valido o assente");
        }

        // Estraggo il token eliminando la parte Bearer
        String token = authToken.replace("Bearer ", "");

        tools.VerifyToken(token);

        // Estraggo i claims dal token
        Claims claims = tools.getClaimsFromToken(token);
        String userId = claims.getSubject();
        String email = claims.get("email", String.class);
        String role = claims.get("role", String.class);

        if (userId == null || role == null) {
            throw new UnauthorizedException("Token malformato");
        }

        // Ricostruzione delle authorities
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

        User authenticatedUser = new User();
        authenticatedUser.setId(UUID.fromString(userId));
        authenticatedUser.setEmail(email);
        authenticatedUser.setUserRole(UserRole.valueOf(role));

        // Inserisco l'utente autenticato all'interno dell'authentication context
        Authentication auth = new UsernamePasswordAuthenticationToken(
                authenticatedUser,
                null,
                authorities
        );

        SecurityContextHolder.getContext()
                .setAuthentication(auth);

        filterChain.doFilter(request, response);
    }

    // Specifico le path che non dovranno essere filtrate ad ogni richiesta
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/auth/**", request.getServletPath());
    }
}
