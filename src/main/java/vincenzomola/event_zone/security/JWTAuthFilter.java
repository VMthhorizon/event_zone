package vincenzomola.event_zone.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.exceptions.UnauthorizedException;
import vincenzomola.event_zone.services.UserService;

import java.io.IOException;

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

        // Estraggo la email dal token (in questo caso il subject) e tramite essa trovo l'utente associato
        String userEmail = tools.getSubjectFromToken(token);
        User authenticatedUser = this.userService.findUserbyEmail(userEmail);

        // Inserisco l'utente autenticato all'interno dell'authentication context
        Authentication auth = new UsernamePasswordAuthenticationToken(authenticatedUser, null,
                authenticatedUser.getAuthorities());
        SecurityContextHolder.getContext()
                .setAuthentication(auth);

        filterChain.doFilter(request, response);
    }

    // Specifico le path che non dovranno essere filtrate ad ogni richiesta
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/auth/*", request.getServletPath());
    }
}
