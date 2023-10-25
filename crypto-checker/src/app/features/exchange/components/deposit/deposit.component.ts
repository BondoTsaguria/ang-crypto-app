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
  depositAmount!: number;
  withdrawAmount!: number | null;
  accountBalance!: number;

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
  }

  deposit(depositAmount: number) {
    if (depositAmount > 0) {
      const currentUserId = this.authService.getCurrentUserId();

      if (currentUserId) {
        // Call the deposit method from the ExchangeService to update the balance
        this.exchangeService
          .deposit(currentUserId, depositAmount)
          .subscribe((res) => {
            this.accountBalance = res.balance!;
            this.depositAmount = 0;
            this.cdr.detectChanges();
          });
      }
    }
  }

  withdraw(withdrawAmount: number) {
    if (withdrawAmount > 0 && withdrawAmount <= this.accountBalance) {
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
}
