package vincenzomola.event_zone.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "Wallets")
public class Wallet {

    @Id
    @GeneratedValue
    private UUID id;
    private double balance;
    @OneToOne
    @JoinColumn(name = "id_user")
    private User user;

    protected Wallet() {
    }

    public Wallet(double balance, User user) {
        this.balance = balance;
        this.user = user;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    @Override
    public String toString() {
        return "Wallet{" +
                "id=" + id +
                ", balance=" + balance +
                '}';
    }
}
