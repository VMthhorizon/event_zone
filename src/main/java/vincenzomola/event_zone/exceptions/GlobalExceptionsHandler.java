package vincenzomola.event_zone.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vincenzomola.event_zone.payloads.ErrorsDTO;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionsHandler {


    // Gestione errore status 404 record non trovato
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorsDTO handleNotFound(NotFoundException ex) {
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }

    // Gestione errore 400 BadRequest
    @ExceptionHandler(BadRequesteException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsDTO handleBadRequest(BadRequesteException ex) {
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }

    // Gestione errore 401 Unauthorized
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorsDTO handleUnauthorized(UnauthorizedException ex) {
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }

    // Gestione errore 403 Forbidden
    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorsDTO handleAuthorizationDeniedException(AuthorizationDeniedException ex) {
        ex.printStackTrace();
        return new ErrorsDTO("Non hai i permessi per accedere a questa richiesta", LocalDateTime.now());
    }

    // Gestione errori di Validazione
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsDTO handleValidation(MethodArgumentNotValidException ex) {

        List<String> errorsList = ex.getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();
        return new ErrorsDTO("Errore di validazione", errorsList, LocalDateTime.now());
    }

    // Gestione errori 500 Internal Server Error, in modo che il FE venga notificato di un problema lato server,
    // mentre ne BE verrà mostrato lo stacktrace dell'errore
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorsDTO handleGenericException(Exception ex) {
        ex.printStackTrace();
        return new ErrorsDTO("ERRORE nel Server",
                LocalDateTime.now());
    }

}
