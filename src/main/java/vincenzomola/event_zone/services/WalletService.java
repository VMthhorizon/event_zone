package vincenzomola.event_zone.services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.entities.Wallet;
import vincenzomola.event_zone.exceptions.NotFoundException;
import vincenzomola.event_zone.payloads.ChargeWalletDTO;
import vincenzomola.event_zone.repositories.WalletRepository;

@Service
public class WalletService {

    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    // Creazione wallet
    @Transactional
    public Wallet createWallet(User user) {
        return walletRepository.save(new Wallet(0.0, user));
    }

    // Trovo il wallet associato all'utente loggato
    public Wallet findWalletByUser(User user) {
        return walletRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Wallet dell'utente: " + user.getId() + " non trovato"));
    }

    // Funzione per agigungere denaro e ricaricare il mio wallet
    @Transactional
    public Wallet topUp(User user, ChargeWalletDTO body) {
        Wallet wallet = findWalletByUser(user);

        wallet.setBalance(wallet.getBalance() + body.balance());

        return walletRepository.save(wallet);
    }


}
