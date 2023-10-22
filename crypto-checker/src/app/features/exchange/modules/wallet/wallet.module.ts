import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from '../../components/wallet/wallet.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WalletComponent],
  imports: [CommonModule, WalletRoutingModule, FormsModule],
})
export class WalletModule {}
