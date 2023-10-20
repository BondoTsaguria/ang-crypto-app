import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from '../components/market-list/market.component';
import { CoinDetailsComponent } from '../components/coin-details/coin-details.component';

const routes: Routes = [
  { path: '', component: MarketComponent },
  { path: ':id', component: CoinDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}
