import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/interfaces/user-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  depositAmount!: number;
  accountBalance!: number;

  constructor(
    private exchangeService: ExchangeService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.authService.getCurrentUserId();
    this.userService.getLoggedInUser().subscribe((users) => {
      const user = users.find((user) => user.id === currentUserId);
      this.accountBalance = user?.balance!;
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
          });
      }
    }
  }
}
