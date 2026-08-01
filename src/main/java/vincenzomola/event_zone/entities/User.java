package vincenzomola.event_zone.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import vincenzomola.event_zone.enums.UserRole;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Users")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private UUID id;
    @Column(unique = true)
    private String username;
    private String name;
    private String surname;
    @Column(unique = true)
    private String email;
    @JsonIgnore
    private String password;
    @Column(name = "creation_timestamp")
    private LocalDateTime creationTimestamp;
    @Column(name = "user_role")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    protected User() {
    }

    public User(String username, String name, String surname, String email, String password) {
        this.userRole = UserRole.CUSTOMER;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.creationTimestamp = LocalDateTime.now();
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }

    @Override
    public @Nullable String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", creationTimestamp=" + creationTimestamp +
                ", userRole=" + userRole +
                '}';
    }

}
