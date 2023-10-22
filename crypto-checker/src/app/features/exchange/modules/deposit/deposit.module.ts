import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from '../../components/deposit/deposit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DepositComponent],
  imports: [CommonModule, DepositRoutingModule, FormsModule],
})
export class DepositModule {}
