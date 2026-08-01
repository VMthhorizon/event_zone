package vincenzomola.event_zone.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vincenzomola.event_zone.payloads.ErrorsDTO;

import java.time.LocalDateTime;

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

    // Gestione errori di Validazione
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsDTO handleValidation(ValidationException ex) {
        return new ErrorsDTO(ex.getMessage(), ex.getErrorsList(), LocalDateTime.now());
    }

}
