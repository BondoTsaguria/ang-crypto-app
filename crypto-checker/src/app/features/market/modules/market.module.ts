import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from '../components/market.component';

import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [MarketComponent],
  imports: [CommonModule, MarketRoutingModule, MatTableModule],
})
export class MarketModule {}
