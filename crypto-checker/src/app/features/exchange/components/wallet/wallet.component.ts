import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { mainCryptoData } from 'src/app/shared/interfaces/crypto-data.interface';
import { SymbolMap } from 'src/app/shared/interfaces/currency-list.type';
import { ownedCryptoes } from 'src/app/shared/interfaces/owned-cryptoes.interface';
import { UserData } from 'src/app/shared/interfaces/user-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CryptoDataService } from 'src/app/shared/services/crypto-data.service';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  accountBalance!: number;
  usdAmount!: number | null;
  selectedCrypto!: string;
  cryptocurrencies!: mainCryptoData[];
  userData!: UserData;
  buttonClicked!: boolean;
  myCurrencies!: ownedCryptoes[];

  buyErrorMessage: string = '';
  sellErrorMessage: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cryptoDataService: CryptoDataService,
    private exchangeService: ExchangeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUserId = this.authService.getCurrentUserId();

    this.userService.getLoggedInUsers().subscribe((users) => {
      const user = users.find((user) => user.id?.toString() === currentUserId);
      this.accountBalance = user?.balance!;
      this.userData = user!;
      this.myCurrencies = user?.mycurrencies!;
      this.cdr.detectChanges();
    });

    this.cryptoDataService.getAllCurrency('USD').subscribe((res) => {
      this.cryptocurrencies = res;
      this.cdr.detectChanges();
    });
  }

  //Update the balance
  updateBalanceChange(newBalance: number) {
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      this.exchangeService
        .updateUserBalance(currentUserId, newBalance)
        .subscribe((updatedUser) => {
          this.accountBalance = updatedUser.balance!;
          this.usdAmount = null;
          this.cdr.detectChanges();
        });
    }
  }

  //Update the bought/sold record
  updateCryptosRecord(usdAmount: number, selectedCrypto: string) {
    const currentUserId = this.authService.getCurrentUserId();
    const currentDate = new Date();
    if (currentUserId) {
      let updatedList;
      if (this.buttonClicked === true) {
        updatedList = {
          symbol: selectedCrypto,
          usdAmount: usdAmount,
          date: currentDate,
        };
      }

      if (this.buttonClicked === false) {
        updatedList = {
          symbol: selectedCrypto,
          usdAmount: -usdAmount,
          date: currentDate,
        };
      }

      this.userData.cryptocurrencies.push(updatedList!);

      // Send the updated list to the server
      this.exchangeService
        .updateCryptocurrenciesRecord(
          currentUserId,
          this.userData.cryptocurrencies
        )
        .subscribe(() => {
          // Fetch the user's cryptocurrencies again after the update
          this.userService.getLoggedInUsers().subscribe((users) => {
            const user = users.find(
              (user) => user.id?.toString() === currentUserId
            );
            this.userData = user!;
            this.cdr.detectChanges();
          });
          this.cdr.detectChanges();
        });
    }
  }

  // Update the currently held coin list
  updateMycurrencies() {
    const currentUserId = this.authService.getCurrentUserId();

    this.userService.getLoggedInUsers().subscribe((users) => {
      const user = users.find((user) => user.id?.toString() === currentUserId);
      const inputData = user?.cryptocurrencies;
      const symbolMap: SymbolMap = {};

      inputData!.forEach((item) => {
        const { symbol, usdAmount } = item;
        if (symbolMap[symbol]) {
          symbolMap[symbol].usdAmount += usdAmount;
        } else {
          symbolMap[symbol] = { symbol, usdAmount };
        }
      });

      const resultArray: ownedCryptoes[] = Object.values(symbolMap);
      this.cdr.detectChanges();
      this.exchangeService
        .updateMycurrenciesList(resultArray, currentUserId!)
        .subscribe((data) => {
          this.myCurrencies = data.mycurrencies;
          this.cdr.detectChanges();
        });
    });
  }

  eligibleToSell(): boolean {
    const currency = this.myCurrencies.find(
      (crypto) => crypto.symbol === this.selectedCrypto
    );

    if (currency && this.usdAmount! <= currency.usdAmount) {
      return false;
    }

    return true;
  }

  clearErrorMessages() {
    this.buyErrorMessage = '';
    this.sellErrorMessage = '';
  }

  // Buy / Sell methods
  buyCryptocurrency() {
    this.clearErrorMessages();
    if (this.usdAmount! <= 0) {
      this.buyErrorMessage = 'Invalid amount';
      return;
    }
    if (this.usdAmount! > this.accountBalance) {
      this.buyErrorMessage = 'Invalid balance';
      return;
    }
    if (!this.selectedCrypto) {
      this.buyErrorMessage = 'Coin not chosen';
      return;
    }
    if (!this.usdAmount) {
      this.buyErrorMessage = 'Amount not chosen';
      return;
    }

    this.buttonClicked = true;
    // Calculate the new balance
    const newBalance = this.accountBalance - this.usdAmount!;
    this.updateCryptosRecord(this.usdAmount!, this.selectedCrypto);
    this.updateBalanceChange(newBalance);
    this.updateMycurrencies();
    this.cdr.detectChanges();
  }

  sellCryptocurrency() {
    this.clearErrorMessages();
    if (this.usdAmount! <= 0) {
      this.sellErrorMessage = 'Invalid amount';
      return;
    }
    if (!this.selectedCrypto) {
      this.sellErrorMessage = 'Coin not chosen';
      return;
    }
    if (this.eligibleToSell()) {
      this.sellErrorMessage = 'Invalid crypto amount';
      return;
    }
    if (!this.usdAmount) {
      this.sellErrorMessage = 'Amount not chosen';
      return;
    }
    this.buttonClicked = false;
    // Calculate the new balance
    const newBalance = this.accountBalance + this.usdAmount!;
    this.updateCryptosRecord(this.usdAmount!, this.selectedCrypto);
    this.updateBalanceChange(newBalance);
    this.updateMycurrencies();
    this.cdr.detectChanges();
  }
}
