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
  usdAmount!: number;
  selectedCrypto!: string;
  cryptocurrencies!: mainCryptoData[];
  userData!: UserData;
  buttonClicked!: boolean;
  myCurrencies!: ownedCryptoes[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cryptoDataService: CryptoDataService,
    private exchangeService: ExchangeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUserId = this.authService.getCurrentUserId();

    this.userService.getLoggedInUser().subscribe((users) => {
      const user = users.find((user) => user.id === currentUserId);
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
    // Update the server balance
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      this.exchangeService
        .updateUserBalance(currentUserId, newBalance)
        .subscribe((updatedUser) => {
          // Update the local balance with the response from the server
          this.accountBalance = updatedUser.balance!;
          // Clear the USD amount input field
          this.usdAmount = 0;
          this.cdr.detectChanges();
        });
    }
  }

  //Update the bought/sold record
  updateCryptosRecord(usdAmount: number, selectedCrypto: string) {
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      let updatedList;
      if (this.buttonClicked === true) {
        updatedList = {
          symbol: selectedCrypto,
          usdAmount: usdAmount,
        };
      }

      if (this.buttonClicked === false) {
        updatedList = {
          symbol: selectedCrypto,
          usdAmount: -usdAmount,
        };
      }

      // Push the updated cryptocurrency to the user's ownedCryptoes array
      this.userData.cryptocurrencies.push(updatedList!);

      // Send the updated list to the server
      this.exchangeService
        .updateCryptocurrenciesRecord(
          currentUserId,
          this.userData.cryptocurrencies
        )
        .subscribe(() => {
          // Fetch the user's cryptocurrencies again after the update
          this.userService.getLoggedInUser().subscribe((users) => {
            const user = users.find((user) => user.id === currentUserId);
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

    this.userService.getLoggedInUser().subscribe((users) => {
      const user = users.find((user) => user.id === currentUserId);
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

  // Buy / Sell methods
  buyCryptocurrency() {
    if (this.usdAmount <= 0) return;
    this.buttonClicked = true;
    // Calculate the new balance
    const newBalance = this.accountBalance - this.usdAmount;
    this.updateCryptosRecord(this.usdAmount, this.selectedCrypto);
    this.updateBalanceChange(newBalance);
    this.updateMycurrencies();
    this.cdr.detectChanges();
  }

  sellCryptocurrency() {
    if (this.usdAmount <= 0) return;
    this.buttonClicked = false;
    // Calculate the new balance
    const newBalance = this.accountBalance + this.usdAmount;
    this.updateCryptosRecord(this.usdAmount, this.selectedCrypto);
    this.updateBalanceChange(newBalance);
    this.updateMycurrencies();
    this.cdr.detectChanges();
  }
}
