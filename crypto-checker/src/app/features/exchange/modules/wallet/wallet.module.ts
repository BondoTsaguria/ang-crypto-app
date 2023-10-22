import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from '../../components/wallet/wallet.component';

@NgModule({
  declarations: [WalletComponent],
  imports: [CommonModule, WalletRoutingModule],
})
export class WalletModule {}
