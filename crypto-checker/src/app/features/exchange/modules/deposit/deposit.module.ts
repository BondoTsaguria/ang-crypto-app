import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from '../../components/deposit/deposit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DepositComponent],
  imports: [CommonModule, DepositRoutingModule, FormsModule, HttpClientModule],
})
export class DepositModule {}
