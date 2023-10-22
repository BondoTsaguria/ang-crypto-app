import { Component, OnInit } from '@angular/core';
import { mainCryptoData } from 'src/app/shared/interfaces/crypto-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CryptoDataService } from 'src/app/shared/services/crypto-data.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  accountBalance!: number;
  usdAmount!: number;
  selectedCrypto!: string;
  cryptocurrencies!: mainCryptoData[];
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cryptoDataService: CryptoDataService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.authService.getCurrentUserId();
    this.userService.getLoggedInUser().subscribe((users) => {
      const user = users.find((user) => user.id === currentUserId);
      this.accountBalance = user?.balance!;
    });

    this.cryptoDataService.getAllCurrency('USD').subscribe((res) => {
      this.cryptocurrencies = res;
    });
  }

  buyCryptocurrency() {
    console.log('works');
  }
}
