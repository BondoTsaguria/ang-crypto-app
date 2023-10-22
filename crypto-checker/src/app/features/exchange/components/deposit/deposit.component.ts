import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExchangeService } from 'src/app/shared/services/exchange.service';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.exchangeService.getBalance().subscribe((balance) => {
      this.accountBalance = balance;
    });
  }

  deposit(depositAmount: number) {
    if (this.depositAmount > 0) {
      // Add the deposit amount to the balance using the service
      this.exchangeService.deposit(depositAmount);
      // Update the balance on the server

      this.depositAmount = 0;
    }
  }
}
