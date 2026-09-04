package vincenzomola.event_zone.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vincenzomola.event_zone.entities.User;
import vincenzomola.event_zone.entities.Wallet;
import vincenzomola.event_zone.payloads.ChargeWalletDTO;
import vincenzomola.event_zone.services.WalletService;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public Wallet getMyWallet(@AuthenticationPrincipal User user) {
        return walletService.findWalletByUser(user);
    }

    @PatchMapping("/me/charge")
    @ResponseStatus(HttpStatus.OK)
    public Wallet chargeWalletBalance(@AuthenticationPrincipal User user, @RequestBody @Valid ChargeWalletDTO body) {
        return walletService.topUp(user, body);
    }

}
