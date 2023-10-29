import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositComponent implements OnInit {
  depositAmount!: number | null;
  withdrawAmount!: number | null;
  accountBalance!: number;

  errorMessage: string = '';

  constructor(
    private exchangeService: ExchangeService,
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUserId = this.authService.getCurrentUserId();
    this.userService.getLoggedInUsers().subscribe((users) => {
      const user = users.find((user) => user.id === currentUserId);
      this.accountBalance = user?.balance!;
      this.cdr.detectChanges();
    });
    this.clearErrorMessages();
    this.cdr.detectChanges();
  }

  clearErrorMessages() {
    this.errorMessage = '';
  }

  deposit(depositAmount: number) {
    this.clearErrorMessages();
    if (depositAmount <= 0) {
      this.errorMessage = 'Please enter the amount';
      return;
    }
    if (!depositAmount) {
      this.errorMessage = 'Please choose the amount';
      return;
    }

    const currentUserId = this.authService.getCurrentUserId();

    if (currentUserId) {
      // Call the deposit method from the ExchangeService to update the balance
      this.exchangeService
        .deposit(currentUserId, depositAmount)
        .subscribe((res) => {
          this.accountBalance = res.balance!;
          this.depositAmount = null;
          this.cdr.detectChanges();
        });
    }
  }

  withdraw(withdrawAmount: number) {
    this.clearErrorMessages();
    if (withdrawAmount <= 0) {
      this.errorMessage = 'Invalid amount';
      return;
    }
    if (withdrawAmount > this.accountBalance) {
      this.errorMessage = 'You do not have such amount';
      return;
    }
    if (!withdrawAmount) {
      this.errorMessage = 'Please enter the amount';
      return;
    }
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      const newBalance = this.accountBalance - withdrawAmount;
      this.exchangeService
        .updateBalanceAfterWithdraw(currentUserId, newBalance)
        .subscribe((res) => {
          this.accountBalance = res.balance!;
          this.withdrawAmount = null;
          this.cdr.detectChanges();
        });
    }
  }
}
